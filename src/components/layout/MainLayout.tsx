import Header from "./Header";
import styles from "./MainLayout.module.css";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.mainLayout}>
      <div className={styles.mainContent}>
        <Header />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}