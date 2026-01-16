import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) return NextResponse.json({ success: false, error: "Missing slug" });

  try {
    const targetUrl = `https://bongdaplus.vn/${slug}.html`;
    
    const res = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://bongdaplus.vn/'
      }
    });

    const html = await res.text();
    const $ = cheerio.load(html);

    const title = $('.lead-title h1').text().trim();
    const sapo = $('.summary.bdr').text().trim();
    
    let contentElement = $('#postContent.content');

    contentElement.find('script, style, .adweb, .admob').remove();

    contentElement.find('img').each((_, img) => {
      const $img = $(img);
      let src = $img.attr('src');
      if (src && !src.startsWith('http')) {
        $img.attr('src', `https://bongdaplus.vn${src}`);
      }
      $img.addClass('img-fluid rounded shadow-sm my-3 d-block mx-auto');
      $img.removeAttr('style'); 
    });

    const content = contentElement.html();

    return NextResponse.json({ 
      success: true, 
      data: { title, sapo, content } 
    }, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: "Server Error" });
  }
}