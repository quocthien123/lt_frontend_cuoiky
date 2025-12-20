import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { Article } from '../bongdaplus/types';

// Headers để tránh lỗi CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export interface Article_News {
    title: string,
    img_url: string,
    dateTime : string,
    url : string,
}

export async function GET(request: NextRequest) {
    try {
 // const searchParams = request.nextUrl.searchParams;
 // const slug = searchParams.get('slug');
 // if (!slug) {
  //  return NextResponse.json(
   //   { success: false, message: 'Thiếu slug' },
   //   { status: 400, headers: corsHeaders }
  //  );
//  }
        //https://bongdaplus.vn/bong-da-viet-nam
  const urlToScrape = `https://bongdaplus.vn/bong-da-viet-nam`;

  console.log(`Đang cào dữ liệu từ: ${urlToScrape}`);
const res = await fetch(urlToScrape, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MyScraper)' },
    });

    if (!res.ok) throw new Error('Không thể truy cập trang đích');
  const html = await res.text();
    const $ = cheerio.load(html);

    const articles_news: Article_News[] = []

    $('.cat-news .news').each((i, el) => {
        
        const $el = $(el)

        const title = $el.find('a.title').text()

        const img_url = $el.find('.thumb img').attr('src') || ''

        const  dateTime = $el.find('.info span').text()

        const url = $el.find('a.title').attr('href') 


        articles_news.push({
            title,
            img_url,
            dateTime,
            url,
        })


    })
      return NextResponse.json(
      {
        success: true,
        data: {
            articles_news
        },
      },
      {status : 200,
        headers : corsHeaders
      }
    );
  } catch (error) {
    console.log("lỗi header : ", error)
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
      },
      { status: 500, 
        headers: corsHeaders
      }
    );
  }
}