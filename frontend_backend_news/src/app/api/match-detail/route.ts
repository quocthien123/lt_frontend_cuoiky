import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const matchUrl = searchParams.get('url'); 

  if (!matchUrl) return NextResponse.json({ error: 'Thiếu URL' }, { status: 400 });

  try {

    const fullUrl = matchUrl.startsWith('http') ? matchUrl : `https://bongdaplus.vn${matchUrl}`;
    
    const res = await fetch(fullUrl, { cache: 'no-store' });
    const html = await res.text();
    const $ = cheerio.load(html);


    const events: any[] = [];
    $('.timeline .event-item').each((i, el) => {
        events.push({
            minute: $(el).find('.minute').text().trim(),
            player: $(el).find('.player').text().trim(),
            type: $(el).hasClass('goal') ? 'goal' : 'card', 
            team: $(el).hasClass('home-event') ? 'home' : 'away'
        });
    });


    const history: any[] = [];
    $('.head-to-head .row').each((i, el) => {
        history.push({
            home: $(el).find('.team-1').text(),
            score: $(el).find('.score').text(),
            away: $(el).find('.team-2').text(),
            date: $(el).find('.date').text()
        });
    });


    const lineups = { home: [], away: [] };


    return NextResponse.json({ 
        success: true, 
        data: { events, history, lineups } 
    });

  } catch (error) {
    return NextResponse.json({ error: 'Lỗi cào chi tiết' }, { status: 500 });
  }
}