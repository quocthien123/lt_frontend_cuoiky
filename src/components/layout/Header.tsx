
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { useAuth } from "@/hooks/useAuth";
import type { NewsItem } from "@/types/news";

interface ChildArticle {
  child_title: string;
  child_source_link: string;
}

interface Article {
  source_Link: string;
  title: string;
  child_Article: ChildArticle[];
}

const getSlug = (url: string) => {
  if (!url) return "";
  return url.replace("https://bongdaplus.vn/", "").replace(/\/$/, "");
};

export default function Header() {
   const [theme, setTheme] = useState('light');
  const [menu, setMenus] = useState<Article[]>([]);
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]); // Lưu tin mới
  const { user, logout } = useAuth();
  const navigate = useNavigate();

useEffect(() => {
    // Gọi API 1: Lấy Danh mục
    fetch("http://localhost:3000/api/bongdaplus")
      .then(res => res.json())
      .then(data => {
        if (data?.data?.article) setMenus(data.data.article);
      });

    // Gọi API 2: Lấy Tin mới
    fetch("http://localhost:3000/api/news")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setLatestNews(data.slice(0, 10)); // Lấy 3 tin mới nhất thôi cho gọn
      });
  }, []);
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };
  return (
    <header className={styles.header}>
      <Link className={styles.logo} to="/">
        Tinbong
      </Link>

      <ul className={styles.nav_bar}>
        {menu &&
          menu.map((item) => (
            <li key={item.source_Link}>
              <Link to={`/danh-muc/${getSlug(item.source_Link)}`}>
                {item.title}
              </Link>
            </li>
          ))}



<li className={styles.news_item}>
  <Link to="/tin-moi" className={styles.hot_link}>
    <span className={styles.dot}></span> Tin mới
  </Link>
</li>

      </ul>






      <div className={styles.dropdown}>
        <img src="/user.svg" alt="Avatar" className={styles.avatarrounded} />
        <div className={styles.dropdownContent}>
          {user ? (
            <>
              <div style={{ padding: "10px", fontWeight: "bold" }}>
                Chào, {user.fullName}
              </div>
              <hr />
              <Link
                to="/favorites"
                style={{ display: "block", padding: "10px" }}
              >
                ❤️ Tin đã lưu
              </Link>
              <Link
                to="/recently-viewed"
                style={{ display: "block", padding: "10px" }}
              >
                🕒 Lịch sử đọc
              </Link>
              <a
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                style={{ cursor: "pointer", display: "block", padding: "10px" }}
              >
                Đăng xuất
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Đăng nhập</Link>
              <Link to="/register">Đăng ký</Link>
            </>
          )}
        </div>
      </div>
         
            <button onClick={toggleTheme} className={styles.themeToggleBtn}>
                {theme === 'light' ? '🌙' : '☀️'}
            </button>
    </header>
  );
}


