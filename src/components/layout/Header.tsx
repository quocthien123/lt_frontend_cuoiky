import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { useAuth } from "@/hooks/useAuth";

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
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/bongdaplus")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data) setMenus(data.data.article);
      })
      .catch((err) => console.log("API chưa chạy, menu sẽ tạm trống:", err));
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

