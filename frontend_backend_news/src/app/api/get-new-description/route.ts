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

export async function GET(request: NextRequest) {
    try {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get('slug');
  const category = searchParams.get('category');
  let title = '';
  //if (!slug) {
    //return NextResponse.json(
     // { success: false, message:'Thiếu slug'},
    //  { status: 400, headers: corsHeaders }
   // );
 // }
        //https://bongdaplus.vn/bong-da-viet-nams
        //https://bongdaplus.vn/${category}/${slug}

  const urlToScrape = `https://bongdaplus.vn/${category}/${slug}`;
  console.log(`Đang cào dữ liệu từ: ${urlToScrape}`);
const res = await fetch(urlToScrape, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MyScraper)' },
    });

    if (!res.ok) throw new Error('Không thể truy cập trang đích');
  const html = await res.text();
   const $ = cheerio.load(html);

// --- Lấy tóm tắt ---
const summaryEl = $('.summary.bdr').first();
const summary = summaryEl.find('b').text().trim(); // Vì tóm tắt nằm trong <b>


// --- Lấy nội dung chính theo thứ tự ---
const contentBlocks: { type: string; content: string }[] = [];
let relatedArticles = [];
$('#postContent').children().each((_, el) => {
  const $el = $(el);
  const tagName = $el[0].tagName;
  
  // Bỏ qua quảng cáo (dựa trên đặc điểm bạn cung cấp)
  if (
    $el.find('script, ins, .adsbyeclick, [data-type="_mgwidget"]').length > 0 ||
    $el.closest('[data-type="_mgwidget"]').length > 0 ||
    $el.attr('class')?.includes('gm') ||
    $el.html()?.includes('clck.mgid.com') // hoặc các pattern quảng cáo khác
  ) {
    return; // skip quảng cáo
  }
   title = $('.lead-title h1').text().trim();
  if (tagName === 'p') {
    // Trường hợp 1: <p> chỉ chứa text → block văn bản
    const imgInP = $el.find('img');
    if (imgInP.length > 0) {
      // Trường hợp 2: <p> chứa hình ảnh → xử lý ảnh + caption
      const imgSrc = imgInP.attr('src')?.trim() || '';
      const altText = $el.find('.alt').text().trim() || imgInP.attr('alt')?.trim() || '';

      if (imgSrc) {
        contentBlocks.push({ type: 'image', content: imgSrc });
        if (altText) {
          contentBlocks.push({ type: 'caption', content: altText });
        }
      }

      // Ngoài ảnh, nếu <p> còn có text ở ngoài img (hiếm, nhưng có thể), xử lý thêm:
      // Ta clone rồi xóa img đi để lấy text còn lại
      const $clone = $el.clone();
      $clone.find('img, .alt, script, ins').remove();
      const remainingText = $clone.text().trim();
      if (remainingText) {
        contentBlocks.push({ type: 'text', content: remainingText });
      }
    } else {
      // Chỉ có text
      const text = $el.text().trim();
      if (text) {
        contentBlocks.push({ type: 'text', content: text });
      }
    }
  } else if (tagName === 'div' || tagName === 'h4' || tagName === 'blockquote') {
    // Xử lý các thẻ khác nếu cần (vd: h4 quảng cáo sách)
    const text = $el.text().trim();
    if (text && !$el.hasClass('gm') && !$el.attr('data-type')) {
      contentBlocks.push({ type: 'text', content: text });
    }
  }

});
$('.relates .news a.title').each((_, el) => {
  const $a = $(el);
  const title = $a.text().trim();
  let url = $a.attr('href')?.trim();
  if (title && url) {
    if (!url.startsWith('http')) {
      url = `${url.startsWith('/') ? url : '/' + url}`;
    }
    relatedArticles.push({ title, url });
  }
});
      return NextResponse.json(
      {
        success: true,
        data: {
          title,
          summary,
            contentBlocks,
            relatedArticles,
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

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}