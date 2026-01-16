import { useEffect, useState } from "react";
import NewCard from "../news/NewCard";
import styles from "./tinmoi.module.css"; 
import type { NewsItem } from "@/types/news"; 

export default function News() {
  const [scrapedNews, setScrapedNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

const parseNewsLink = (fullUrl: string) => {
  try {
    const path = fullUrl.replace('https://bongdaplus.vn/', '').replace(/\/$/, "");
    const parts = path.split('/');

    const category = parts[0];
    const slug = parts[parts.length - 1].replace('.html', '');
    

    return `//${category}/${slug}`; 
  } catch (err) {
    return "/";
  }
};

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/api/tinmoi")
      .then((res) => res.json())
      .then((data) => {
        setScrapedNews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tin bóng đá mới nhất</h1>
      
      {loading ? (
        <div className={styles.loading}>Đang săn tin mới nhất...</div>
      ) : (
        <div className={styles.grid}>
          {scrapedNews.map((item, idx) => {
 
            const internalLink = parseNewsLink(item.link);

            return (
              <NewCard
        key={idx}
    title={item.title}
    category={item.subCategory} 
    imageUrl={item.thumb}       
    link={internalLink} 
    time={item.scrapedAt}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}