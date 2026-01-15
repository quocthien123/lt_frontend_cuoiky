import { NextRequest } from 'next/server';
import * as cheerio from 'cheerio';

interface VideoItem {
  title: string;
  img: string;
  url: string;
  timeLabel?: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
      highlights: VideoItem[];
      diemTin: VideoItem[];
      otherVideos: VideoItem[];
    } = {
      highlights: [],
      diemTin: [],
      otherVideos: [],
    };

    // Hàm helper chuẩn hóa URL
    const normalizeUrl = (url: string): string => {
      if (!url) return '';
      const base = 'https://bongdaplus.vn';
      return url.startsWith('http') ? url : base + (url.startsWith('/') ? url : '/' + url);
    };

    // Hàm trích xuất danh sách video từ một section theo tiêu đề
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

    // Trích xuất từng phần
    result.highlights = extractVideosByCaption('Highlights');
    result.diemTin = extractVideosByCaption('Điểm tin');
    result.otherVideos = extractVideosByCaption('Video khác');

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
  return new Response(
    JSON.stringify({}),
    { status: 200, headers: corsHeaders }
  );
}