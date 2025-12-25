import * as cheerio from 'cheerio';
import { News } from '../types';
// import { Article } from '../types';


export function scrapeNews($: cheerio.CheerioAPI): News[] {
      const newsList: News[] = [];
      $('ul.lst li.news').each((i, el) => {
          const $item = $(el);
          
          const $titleAnchor = $item.find('a.title');
          
          // 2. Lấy link và tiêu đề
          const title = $titleAnchor.text().trim();
          const href = $titleAnchor.attr('href') ? $titleAnchor.attr('href').trim() : '';
          
          // 3. Lấy ảnh (nếu có) từ thẻ .thumb
          const imageUrl = $item.find('.thumb img').attr('src') || '';


          // Kiểm tra nếu có tiêu đề và link thì mới đẩy vào kết quả
          if (title && href) {
              const parts = href.split('/').filter(Boolean);
              const category = parts[0] || '';
              const root = '/' + (parts[0] || '');

              newsList.push({
                  title: title,
                  link: href, // Có thể cộng thêm domain nếu cần
                  imageUrl: imageUrl,
                  category: category,
                  root: root
              });
          }
      });
  return newsList;
}