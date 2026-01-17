import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';

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


    const EMAILS_PATH = path.join(process.cwd(), 'emails.json');
    const HISTORY_PATH = path.join(process.cwd(), 'processed_new.json');

    const ensureFile = async (p: string, content: string) => {
      try { await fs.access(p); } catch { await fs.writeFile(p, content); }
    };
    await ensureFile(EMAILS_PATH, '[]');
    await ensureFile(HISTORY_PATH, '[]');


    const historyData: string[] = JSON.parse(await fs.readFile(HISTORY_PATH, 'utf8'));
    const newItems = news.filter(item => !historyData.includes(item.link));

    if (newItems.length > 0) {
      const subscribers: string[] = JSON.parse(await fs.readFile(EMAILS_PATH, 'utf8'));

      if (subscribers.length > 0) {


        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });


        const MY_LOCAL_WEB = "http://localhost:5173";
        const htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
            <h2 style="color: #2563eb;">Bản tin bóng đá từ Website của tôi</h2>
            <p>Chào bạn, đây là những tin tức mới nhất:</p>
            <hr>
            ${newItems.map(item => {
          const newsId = item.link.split('/').pop()?.replace('.html', '');
          const localLink = `${MY_LOCAL_WEB}/${item.subCategory}/${newsId}`;

          return `
                <div style="margin-bottom: 25px;">
                  <img src="${item.thumb}" style="width: 200px; border-radius: 8px;" />
                  <h3><a href="${localLink}" style="text-decoration: none; color: #1a1a1a;">${item.title}</a></h3>
                  <p style="font-size: 13px; color: #666;"><i>${item.subCategory}</i></p>
                  <p style="color: #444;">${item.summary}</p>
                  <a href="${localLink}" style="display: inline-block; padding: 8px 16px; background: #2563eb; color: white; border-radius: 4px; text-decoration: none;">Đọc chi tiết tại Web</a>
                </div>
              `;
        }).join('<hr>')}
          </div>
        `;



        for (const email of subscribers) {
          await transporter.sendMail({
            from: '"Bóng Đá Plus" <your-email@gmail.com>',
            to: email,
            subject: `Cập nhật: ${newItems.length} tin mới từ Bongdaplus`,
            html: htmlContent,
          });
        }
      }

      const updatedHistory = [...newItems.map(i => i.link), ...historyData].slice(0, 200);
      await fs.writeFile(HISTORY_PATH, JSON.stringify(updatedHistory, null, 2));
    }


    return NextResponse.json(news);
  } catch (error) {
    console.error('Scraping error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}