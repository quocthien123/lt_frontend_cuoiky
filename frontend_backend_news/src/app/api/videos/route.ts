import { NextRequest } from 'next/server';
import * as cheerio from 'cheerio';

interface VideoItem {
  title: string;
  img: string;
  url: string; // URL bài viết
  timeLabel?: string;
  videoUrl?: string; // ← chỉ gán nếu là YouTube
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const normalizeUrl = (url: string): string => {
  if (!url) return '';
  const base = 'https://bongdaplus.vn';
  const trimmed = url.trim();
  return trimmed.startsWith('http') ? trimmed : base + (trimmed.startsWith('/') ? trimmed : '/' + trimmed);
};

const fetchVideoUrlFromArticle = async (articleUrl: string): Promise<string | null> => {
  try {
    const res = await fetch(articleUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    });
    if (!res.ok) return null;

    const html = await res.text();
    const $ = cheerio.load(html);

    const youtubeIframe = $('iframe[src*="youtube.com/embed"]').first();
    if (youtubeIframe.length > 0) {
      const src = youtubeIframe.attr('src')?.trim();
      if (src) {
        const videoId = new URL(src).pathname.split('/').pop();
        if (videoId) {
          return `https://www.youtube.com/watch?v=${videoId}`;
        }
      }
    }
    return null;
  } catch (err) {
    console.warn(`Không thể lấy video từ ${articleUrl}:`, (err as Error).message);
    return null;
  }
};

export async function GET(request: NextRequest) {
  try {
    const urlToScrape = 'https://bongdaplus.vn/video';
    console.log(`Đang cào dữ liệu từ: ${urlToScrape}`);

    const res = await fetch(urlToScrape, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MyScraper)' },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

    const html = await res.text();
    const $ = cheerio.load(html);

    const result: {
      diemTin: VideoItem[];
      otherVideos: VideoItem[];
    } = {
      diemTin: [],
      otherVideos: [],
    };

    const extractVideosByCaption = (captionText: string): VideoItem[] => {
      const section = $(`section.cat-news`).filter((_, el) => {
        return $(el).find('.caption').text().trim() === captionText;
      });

      const items: VideoItem[] = [];
      section.find('.row.flex .col .media').each((_, el) => {
        const $el = $(el);
        const $thumb = $el.find('a.thumb');
        const title = $el.find('a.title').text().trim() || $thumb.find('img').attr('alt')?.trim() || '';
        const img = $thumb.find('img').attr('src')?.trim() || '';
        const url = $thumb.attr('href')?.trim() || '';
        const timeLabel = $el.find('.info').first().text().trim() || undefined;

        if (title && img && url) {
          items.push({
            title,
            img: normalizeUrl(img),
            url: normalizeUrl(url),
            timeLabel,
          });
        }
      });
      return items;
    };

    const diemTinRaw = extractVideosByCaption('Điểm tin');
    const otherVideosRaw = extractVideosByCaption('Video khác');

    const allItems = [...diemTinRaw, ...otherVideosRaw];
    const videoUrls = await Promise.all(
      allItems.map(item => fetchVideoUrlFromArticle(item.url))
    );

    const validItems = allItems.filter((_, index) => videoUrls[index] !== null);
    validItems.forEach((item, index) => {
      item.videoUrl = videoUrls[allItems.indexOf(item)]!;
    });

    const filteredDiemTin = validItems.filter(item =>
      diemTinRaw.some(raw => raw.url === item.url)
    );
    const filteredOtherVideos = validItems.filter(item =>
      otherVideosRaw.some(raw => raw.url === item.url)
    );

    result.diemTin = filteredDiemTin;
    result.otherVideos = filteredOtherVideos;

    return new Response(JSON.stringify(result, null, 2), {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8', ...corsHeaders },
    });
  } catch (error) {
    console.error('Lỗi khi cào dữ liệu:', error);
    return new Response(
      JSON.stringify({
        error: 'Lỗi khi cào dữ liệu',
        message: (error as Error).message,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json; charset=utf-8', ...corsHeaders } }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 200, headers: corsHeaders });
}