import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET() {
  try {
    const response = await fetch('https://bongdaplus.vn', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const html = await response.text();
    const $ = cheerio.load(html);
    const menuData: any[] = [];

$('div.menu-side > ul.bar-w > li').each((_, el) => {
    const $item = $(el);
    const $parentLink = $item.find('> a');
    const title = $parentLink.text().trim();
    const href = $parentLink.attr('href') || '';

    const child_Article: any[] = []; 
    
    $item.find('div.drop-down a, div.sub-menu a').each((_, subEl) => {
        child_Article.push({
            child_title: $(subEl).text().trim(),
            child_source_link: $(subEl).attr('href')
        });
    });

    if (title) {
        menuData.push({ 
            title, 
            source_Link: href,
            child_Article     
        });
    }
});


    return NextResponse.json({ success: true, data: menuData }, {
  headers: {
    'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
});
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}