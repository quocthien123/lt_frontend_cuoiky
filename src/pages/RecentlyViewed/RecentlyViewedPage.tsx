import { useState } from "react";
import { Link } from "react-router-dom";
import {
  getReadingHistory,
  removeFromHistory,
  clearReadingHistory,
  type ViewedArticle,
} from "@/services/reading-history.service";
import styles from "./RecentlyViewedPage.module.css";
import toast from "react-hot-toast";

export default function RecentlyViewedPage() {
  const [history, setHistory] = useState<ViewedArticle[]>(() =>
    getReadingHistory()
  );

  const handleRemove = (slug: string) => {
    removeFromHistory(slug);
    setHistory((prev) => prev.filter((item) => item.slug !== slug));
    toast.success("Đã xóa khỏi lịch sử");
  };

  const handleClearAll = () => {
    if (window.confirm("Bạn có chắc muốn xóa toàn bộ lịch sử đọc?")) {
      clearReadingHistory();
      setHistory([]);
      toast.success("Đã xóa toàn bộ lịch sử");
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Vừa xong";
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    if (days < 7) return `${days} ngày trước`;

    return date.toLocaleDateString("vi-VN");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Bài viết đã xem gần đây</h1>
        {history.length > 0 && (
          <button onClick={handleClearAll} className={styles.clearBtn}>
            Xóa tất cả
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className={styles.empty}>
          <p>Bạn chưa xem bài viết nào.</p>
          <Link to="/" className={styles.browseBtn}>
            Khám phá tin tức
          </Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {history.map((item) => (
            <div key={item.slug} className={styles.card}>
              <Link to={`/${item.category}/${item.slug}`} className={styles.link}>
                {item.thumb && (
                  <img
                    src={item.thumb}
                    alt={item.title}
                    className={styles.thumb}
                  />
                )}
                <div className={styles.content}>
                  <h3 className={styles.title}>{item.title}</h3>
                  <span className={styles.time}>
                    {formatDate(item.viewedAt)}
                  </span>
                </div>
              </Link>
              <button
                onClick={() => handleRemove(item.slug)}
                className={styles.removeBtn}
                title="Xóa khỏi lịch sử"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
