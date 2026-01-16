import * as cheerio from 'cheerio';
import { News } from '../types';
import { Article } from '../types';
import { ChildArticle } from '../types';

export function scrapeArticle($: cheerio.CheerioAPI): Article[] {
        const articleList: Article[] = [];
      
        $('div.menu-side > ul.bar-w > li').each((i, el) => {

            const $item = $(el);
      //    console.log(`Nội dung thô của li thứ ${i}:`, $(el).text().trim());
            const $titleAnchor = $item.find('> a')

            const category = $titleAnchor.text();
         //    console.log(`Đang quét Menu Cha: ${category}`);
            const href = $titleAnchor.attr('href') || '';
            const subArticleList: ChildArticle[] = [];
            const $dropDown = $item.find('div.drop-down');
        if ($dropDown.length > 0) {
            const $subItems = $item.find('ul.lst li a');
        //    console.log($subItems.text())
            $subItems.each((subIdx, subEl) => {
                const $subAnchor = $(subEl);
                const subTitle = $subAnchor.attr('title') || $subAnchor.text().trim();
                const subHref = $subAnchor.attr('href') || '';

                if (subTitle) {
                    subArticleList.push({
                        child_title: subTitle,
                        child_source_link: `https://bongdaplus.vn${subHref}`,
                    });
                }
            });
        }
        if (category) {
            articleList.push({
                source_Link: `https://bongdaplus.vn${href}`,
                title: category,
                child_Article: subArticleList
            });
        }
        });
        return articleList;
    }
