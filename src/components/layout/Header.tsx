import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import styles from './Header.module.css'
import {useAuth} from "@/context/AuthContext.tsx";

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
    return url.replace('https://bongdaplus.vn/', '').replace(/\/$/, '');
};

export default function Header() {
    const [menu, setMenus] = useState<Article[]>([]);
    const { user, logout } = useAuth(); // 2. Lấy user và hàm logout ra

    useEffect(() => {
        fetch("http://localhost:3000/api/bongdaplus")
            .then(response => response.json())
            .then(data => setMenus(data.data.article))
    }, [])

    return (
        <header className={styles.header}>
            <Link className={styles.logo} to="/">Tinbong</Link>

            {/* Menu giữ nguyên */}
            <ul className={styles.nav_bar}>...</ul>

            <div className={styles.dropdown}>
                <img src="/user.svg" alt="Avatar" className={styles.avatarrounded} />
                <div className={styles.dropdownContent}>
                    {/* 3. Dùng toán tử 3 ngôi để check user */}
                    {user ? (
                        <>
                            <div className={styles.userInfo}>Chào, {user.fullName}</div>
                            <hr />
                            <a onClick={logout} style={{cursor: 'pointer'}}>Đăng xuất</a>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Đăng nhập</Link>
                            <Link to="/register">Đăng ký</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}