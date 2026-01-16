// src/app/api/bongdaplus/route.ts
import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { scrapeNews } from './scrapers/news';
import { fetchUpcomingMatches } from './scrapers/pupSchedule';
import { scrapeArticle } from './scrapers/Article';
import { fetchLeagueRanking } from './scrapers/Ranking';

//dinh nghia cors
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Cho phép tất cả các domain (localhost:5173, v.v...)
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Cache-Control': 's-maxage=600', // Giữ nguyên cache của bạn
};


export async function GET(request: NextRequest) {
  try {
    const res = await fetch('https://bongdaplus.vn', {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; BongDaPlus Scraper)' },
    });

    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

    const $ = cheerio.load(await res.text());

    // Lấy từng loại dữ liệu
    const news = scrapeNews($);
    const upcomingMatches = await fetchUpcomingMatches();
    const article = scrapeArticle($)
    const standing = await fetchLeagueRanking()
    return Response.json(
      {
        success: true,
        data: {
          article,
          news,
          upcomingMatches,
          standing,
          // Thêm các phần khác sau này: standings, results, videos...
        },
      },
      {status : 200,
        headers : corsHeaders
      }
    );
  } catch (error) {
    console.log("lỗi header : ", error)
    return Response.json(
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

export async function OPTIONS() {
  return Response.json(
    {},
    { status: 200, headers: corsHeaders }
  );
}