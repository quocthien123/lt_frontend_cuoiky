import * as cheerio from 'cheerio';
import { News } from '../types';
// import { Article } from '../types';

export function scrapeNews($: cheerio.CheerioAPI): News[] {
  const newsList: News[] = [];

  $('ul.lst li.news').each((i, el) => {
    const $item = $(el);
    const $titleAnchor = $item.find('a.title');

    const title = $titleAnchor.text().trim();
    const href = $titleAnchor.attr('href') ? $titleAnchor.attr('href').trim() : '';
    const imageUrl = $item.find('.thumb img').attr('src') || '';

    if (title && href) {
      // 1. Tìm vị trí của tin tức có tiêu đề trùng lặp trong danh sách hiện tại
      const existingIndex = newsList.findIndex(news => news.title === title);

      if (existingIndex > -1) {
        // 2. Nếu ĐÃ TRÙNG: Kiểm tra nếu cái mới có ảnh, thì thay thế cái cũ
        if (imageUrl) {
          const parts = href.split('/').filter(Boolean);
          newsList[existingIndex] = {
            title: title,
            link: href,
            imageUrl: imageUrl,
            category: parts[0] || '',
            root: '/' + (parts[0] || '')
          };
        }
        // Nếu cái mới không có ảnh, ta giữ nguyên cái cũ (không làm gì cả)
      } else {
        // 3. Nếu CHƯA TRÙNG: Thêm mới bình thường
        const parts = href.split('/').filter(Boolean);
        newsList.push({
          title: title,
          link: href,
          imageUrl: imageUrl,
          category: parts[0] || '',
          root: '/' + (parts[0] || '')
        });
      }
    }
  });

  return newsList;
}
