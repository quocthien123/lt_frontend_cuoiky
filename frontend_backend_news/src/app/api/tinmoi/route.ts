import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';


export interface NewsItem {
  title: string;
  link: string;
  thumb: string;
  summary: string;
  subCategory: string;
  scrapedAt: string;
}


export async function GET(): Promise<NextResponse> {
  try {
    const response = await fetch('https://bongdaplus.vn/tin-moi', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      cache: 'no-store'
    });

    const html: string = await response.text();
    const $: cheerio.CheerioAPI = cheerio.load(html);
    const news: NewsItem[] = [];

    const now = new Date();
    const scrapedAt = `${now.toLocaleTimeString('vi-VN')} ${now.toLocaleDateString('vi-VN')}`;

    $('.time-lines ul.lst li.news').each((_, el) => {
      const $el = $(el);
      const title = $el.find('a.title').text().trim();
      let link = $el.find('a.title').attr('href') || '';
      
      const subCategory = $el.find('.cat').text().trim();
      const thumb = $el.find('.thumb img').attr('data-src') || $el.find('.thumb img').attr('src') || '';
      const summary = $el.find('p.summ').text().trim();

      if (link && !link.startsWith('http')) {
        link = `https://bongdaplus.vn${link}`;
      }

      if (title && link) {
        news.push({
          title,
          link,
          thumb,
          summary,
          subCategory,
          scrapedAt
        });
      }
    });

    return NextResponse.json(news);
  } catch (error) {
    console.error('Scraping error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}