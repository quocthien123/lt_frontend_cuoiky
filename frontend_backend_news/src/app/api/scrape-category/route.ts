import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('url');

  if (!slug) return NextResponse.json({ success: false, error: "No slug" });

  try {
    const targetUrl = `https://bongdaplus.vn/${slug}?t=${Date.now()}`;
    
    const res = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      next: { revalidate: 0 }
    });

    const html = await res.text();
const $ = cheerio.load(html);
const newsMap = new Map(); 


$('.news, .sld-itm, .news-lst li, .cat-news .col, article').each((_, el) => {
  const $item = $(el);
  const $link = $item.find('a.title, a.thumb, .title a, > a').first();
  
  const title = $link.attr('title') || $item.find('.title').text().trim();
  let href = $link.attr('href') || '';

  if (title && href && href !== '#') {
    const fullLink = href.startsWith('http') ? href : `https://bongdaplus.vn${href}`;
    
    if (!newsMap.has(fullLink)) {
      const imageUrl = $item.find('img').attr('data-src') || $item.find('img').attr('src') || '';
      const description = $item.find('.summ, .sapo, .info').text().trim();

      newsMap.set(fullLink, {
        title: title.substring(0, 100), 
        link: fullLink,
        imageUrl: imageUrl.startsWith('http') ? imageUrl : (imageUrl ? `https://bongdaplus.vn${imageUrl}` : ''),
        description: description
      });
    }
  }
});

const newsList = Array.from(newsMap.values());

return NextResponse.json({ success: true, data: newsList, total: newsList.length }, {
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store' 
      }
    });

  } catch (e) {
    return NextResponse.json({ success: false, error: "Cào lỗi" });
  }
}