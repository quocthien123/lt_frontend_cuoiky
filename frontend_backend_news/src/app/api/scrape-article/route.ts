import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const slug = searchParams.get('slug');

    const urlToScrape = `https://bongdaplus.vn/${category}/${slug}.html`;
    
    const res = await fetch(urlToScrape, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0' },
      cache: 'no-store'
    });

    const html = await res.text();
    const $ = cheerio.load(html);
    const contentBlocks: any[] = [];

const title = $('.lead-title h1').text().trim() || 
              $('h1.title').text().trim() || 
              $('.detail-title').text().trim() ||
              $('h1').first().text().trim();

    const videoIframe = $('.play-box iframe').attr('src');
    const videoDesc = $('.clip-info .desc').text().trim();

    if (videoIframe) {
      const fullVideoUrl = videoIframe.startsWith('http') ? videoIframe : `https://bongdaplus.vn${videoIframe}`;
      contentBlocks.push({ type: 'video', content: fullVideoUrl });
      
      if (videoDesc) {
        contentBlocks.push({ type: 'text', content: videoDesc });
      }
    } else {
      const mainContent = $('.fck_detail').length > 0 ? $('.fck_detail') : $('#postContent');
      
      mainContent.children().each((_, el) => {
        const $el = $(el);
        if ($el.hasClass('gm') || $el.find('ins').length > 0) return;

        const img = $el.find('img');
        if (img.length > 0) {
          const src = img.attr('data-src') || img.attr('src');
          if (src && !src.includes('google')) {
            contentBlocks.push({ type: 'image', content: src });
          }
          return;
        }

        const text = $el.text().trim();
        if (text.length > 20) {
          contentBlocks.push({ type: 'text', content: text });
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: { title, contentBlocks }
    });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}