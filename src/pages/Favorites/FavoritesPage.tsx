import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getUserFavorites, toggleFavorite } from "@/services/favorite.service";
import { Link } from "react-router-dom";
import styles from "./FavoritesPage.module.css";
import toast from "react-hot-toast";

interface FavoriteArticle {
  slug: string;
  title: string;
  thumb: string;
  category: string;
}

export default function FavoritesPage() {
  const { user } = useAuth();
  // Initialize favorites from localStorage directly
  const [favorites, setFavorites] = useState<FavoriteArticle[]>(() => {
    if (user) {
      return getUserFavorites(user.email);
    }
    return [];
  });

  const handleRemove = (article: FavoriteArticle) => {
    if (user) {
      toggleFavorite(user.email, article);
      setFavorites((prev) => prev.filter((item) => item.slug !== article.slug));
      toast.success("Đã xóa khỏi danh sách yêu thích");
    }
  };

  if (!user) {
    return (
      <div className={styles.container}>
        <p>Vui lòng đăng nhập để xem tin đã lưu.</p>
        <Link to="/login" className={styles.loginBtn}>
          Đăng nhập
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Tin tức bạn đã lưu</h1>
      {favorites.length === 0 ? (
        <div className={styles.empty}>
          <p>Bạn chưa lưu bài viết nào.</p>
          <Link to="/" className={styles.browseBtn}>
            Khám phá tin tức
          </Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {favorites.map((item) => (
            <div key={item.slug} className={styles.card}>
              {item.thumb && (
                <img
                  src={item.thumb}
                  alt={item.title}
                  className={styles.thumbnail}
                />
              )}
              <div className={styles.info}>
                <Link to={`/${item.category}/${item.slug}`}>
                  <h3>{item.title}</h3>
                </Link>
                <button
                  onClick={() => handleRemove(item)}
                  className={styles.removeBtn}
                >
                  ✕ Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
