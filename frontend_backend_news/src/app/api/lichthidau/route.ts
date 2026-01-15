// src/app/api/bongdaplus/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { fetchLeaguesMatches } from './lich-thi-dau';

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
    const matches = await fetchLeaguesMatches();
    return Response.json(
      {
        success: true,
        data: {
          matches
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