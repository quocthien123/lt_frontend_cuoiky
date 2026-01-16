import { useLocation } from "react-router-dom";
import Header from "./Header";
import styles from "./MainLayout.module.css";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Dùng để xác định vị trí trang hiện tại
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className={styles.mainLayout}>
      <div className={styles.mainContent}>
        {!isAuthPage && <Header />}
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
