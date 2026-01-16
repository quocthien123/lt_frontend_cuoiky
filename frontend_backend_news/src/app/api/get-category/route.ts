import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { Article } from '../bongdaplus/types';
import axios from 'axios';

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
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get('slug');
  if (!slug) {
    return NextResponse.json(
      { success: false, message: 'Thiếu slug' },
      { status: 400, headers: corsHeaders }
    );
  }
        //https://bongdaplus.vn/bong-da-viet-nams
  const urlToScrape = `https://bongdaplus.vn/${slug}`;
  const rankingUrl = `https://data.bongdaplus.vn/data/${slug}-rankings.json?_=${Date.now()}`
  const ltdUrls = `https://data.bongdaplus.vn/data/${slug}-matches.json?_=${Date.now()}`
  console.log(`Đang cào dữ liệu từ: ${urlToScrape}`);
const res = await fetch(urlToScrape, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MyScraper)' },
    });

    if (!res.ok) throw new Error('Không thể truy cập trang đích');
  const html = await res.text();
    const $ = cheerio.load(html);

    const articles_news: Article_News[] = []
      const standing = await leagueRanking(rankingUrl)
      const rounds = await lichthidau(ltdUrls)
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
            articles_news,
            standing,
            rounds,
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

export async function leagueRanking(leagueUrl : string) {
        const response = await axios.get(leagueUrl);
        const rawData = response.data;
        const dataMap = rawData.ranks
        const standings = dataMap.map(item => ({
          nameTeam: item.team_name ,
          teamLogo : `https://data.bongdaplus.vn/logo/${item.team_logo}` ,
          rank : item.position,
          matches : item.matches ,
          win: item.wins ,
          losses : item.losses ,
          draws: item.draws,
          ghiban : item.scores_for ,
          thung_luoi : item.scores_against ,
          hieu_so : item.scores_diff ,
          point : item.points ,
    }));
    return {
        standings: standings
      };
};
interface MatchItem {
  round_name: string;
  home_name: string;
  home_logo: string;
  away_name: string;
  away_logo: string;
  start_time: number | string;
  goals_home: string | null;
  goals_away: string | null;
  status: string;
}

function getDateString(timestamp: any): string {
  try {
    return timestamp.split(' ')[0];
  } catch {
    return "unknown";
  }
}

function groupBy<T>(array: T[], keyFn: (item: T) => string): Record<string, T[]> {
  const result: Record<string, T[]> = {};
  for (const item of array) {
    const key = keyFn(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }
  return result;
}

export async function lichthidau(leagueUrl: string) {
  try {
    const response = await axios.get(leagueUrl);
    const rawData = response.data;
    if (!rawData?.matches || !Array.isArray(rawData.matches)) {
      console.warn("Dữ liệu không hợp lệ:", rawData);
      return { rounds: [] };
    }

    const matches = (rawData.matches as any[]).map((item) => ({
      round_name: item.round_name,
      home_name: item.home_name,
      home_logo: `https://data.bongdaplus.vn/logo/${item.home_logo?.trim() ?? ''}`,
      away_name: item.away_name,
      away_logo: `https://data.bongdaplus.vn/logo/${item.away_logo?.trim() ?? ''}`,
      start_time: item.start_time,
      goals_home: item.goals_home,
      goals_away: item.goals_away,
      status: item.status,
    })) as MatchItem[];

    const roundsMap = groupBy(matches, (m) => m.round_name);
    const rounds = Object.entries(roundsMap).map(([roundName, roundMatches]) => {
      const datesMap = groupBy(roundMatches, (m) => getDateString(m.start_time));
      const dates = Object.entries(datesMap).map(([date, matchesInDate]) => ({
        date,
        matches: matchesInDate,
      }));
      return {
        round_name: roundName,
        dates,
      };
    });

    return { rounds };

  } catch (error) {
    console.error("Lỗi khi lấy lịch thi đấu từ URL:", leagueUrl, error);
    return { rounds: [] };
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}