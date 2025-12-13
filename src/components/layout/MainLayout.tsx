import Header from "./Header";
import Sidebar from "./Sidebar";
import styles from "./MainLayout.module.css";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.mainLayout}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}