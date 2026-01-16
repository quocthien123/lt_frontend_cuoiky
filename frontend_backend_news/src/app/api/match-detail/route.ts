//match-detail 
//route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {

    const { searchParams } = new URL(request.url);
    const fullId = searchParams.get('id'); 

    if (!fullId) {
        return NextResponse.json({ success: false, message: "Thiếu ID trận đấu (Dạng folder/id)" }, { status: 400 });
    }

    const parts = fullId.split('/');
    const matchIdOnly = parts[parts.length - 1];

    try {
        const detailUrl = `https://data.bongdaplus.vn/data/${fullId}.json?_=${Date.now()}`;
        const h2hUrl = `https://data.bongdaplus.vn/data/${fullId.replace(matchIdOnly, matchIdOnly + '-h2h')}.json?_=${Date.now()}`;

        // console.log("Fetching:", detailUrl);

        const [detailRes, h2hRes] = await Promise.all([
            fetch(detailUrl),
            fetch(h2hUrl)
        ]);


        if (!detailRes.ok) throw new Error("Không tìm thấy dữ liệu trận đấu");

        const detailData = await detailRes.json();
        

        let h2hData = null;
        if (h2hRes.ok) {
            h2hData = await h2hRes.json();
        }

    
        const responseData = {
            ...detailData,
            h2h: h2hData  
        };

        return NextResponse.json({ success: true, data: responseData }, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
            }
        });

    } catch (error) {
        console.error("Lỗi Backend:", error);
        return NextResponse.json({ success: false, message: "Lỗi lấy dữ liệu" }, { status: 500 });
    }
}