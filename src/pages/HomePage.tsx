import NewCard from "../components/news/NewCard";
import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import NoImageNewsCard from "../components/news/NoImageNews";
import Standings, { type RankingGroup } from "./Standing/StandingPage";
import UpcomingMatchesLayout from "./Matches/UpcomingMatches";
import type { LeagueGroup } from "./Matches/LichThiDauPage";
import Schedule from "./Matches/LichThiDauPage";
interface NewsItem {
  id: string;
  imageUrl?: string;
  title?: string;
  category?: string;
  link?: string;
  time?: string;
  [key: string]: unknown;
}

interface UpcomingMatchItem {
  id: string | number;
  starttime: string | number;
  homeTeam: {
    id: string | number;
    name: string;
    logo?: string;
  };
  awayTeam: {
    id: string | number;
    name: string;
    logo?: string;
  };
}

export default function HomePage() {
  const [theme, setTheme] = useState("light");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [standings, setStandings] = useState<RankingGroup[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<UpcomingMatchItem[]>(
    []
  );
  const [leagues, setLeagues] = useState<LeagueGroup[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/bongdaplus`)
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          queueMicrotask(() => {
            setNews(result.data.news);
            setStandings(result.data.standing);
            setUpcomingMatches(result.data.upcomingMatches);
          });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // 3. Hàm chuyển đổi theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/lichthidau`)
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          queueMicrotask(() => {
            setLeagues(result.data.matches);
          });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const firstNewsWithImage = news.find(
    (item) =>
      item.imageUrl &&
      item.imageUrl !== "" &&
      item.title &&
      item.category &&
      item.link
  );

  return (
    <div className={styles.mainColor}>
      {/* 4. Nút bấm chuyển chế độ Sáng/Tối */}
      <button onClick={toggleTheme} className={styles.themeToggleBtn}>
        {theme === "light" ? "🌙 Chế độ tối" : "☀️ Chế độ sáng"}
      </button>
      <div>
        <UpcomingMatchesLayout matches={upcomingMatches} />
      </div>
      <div style={{ height: "50px" }}> </div>
      <div className={styles.newsContainer}>
        <div className={styles.newsLeft}>
          <h2> Tin mới </h2>
          {firstNewsWithImage &&
            firstNewsWithImage.title &&
            firstNewsWithImage.category &&
            firstNewsWithImage.link && (
              <NewCard
                title={firstNewsWithImage.title}
                category={firstNewsWithImage.category}
                imageUrl={firstNewsWithImage.imageUrl || ""}
                link={firstNewsWithImage.link}
                time={firstNewsWithImage.time}
              />
            )}
        </div>

        <ul className={styles.listNewsNoImage}>
          <h2>Tin vắn</h2>
          {news
            .filter(
              (item) =>
                item.imageUrl === "" && item.title && item.category && item.link
            )
            .slice(1, 7)
            .map((newsItem) => (
              <NoImageNewsCard
                key={newsItem.id}
                title={newsItem.title!}
                category={newsItem.category!}
                link={newsItem.link!}
                time={newsItem.time}
              />
            ))}
        </ul>

        <div className={styles.standingsdiv}>
          <h2> Bảng xếp hạng </h2>
          {standings.length > 0 ? (
            <Standings rankings={standings} />
          ) : (
            <div>Đang tải bảng xếp hạng...</div>
          )}
        </div>
      </div>
      <div>
        <h2>Lịch thi đấu </h2>
        <div>
          <Schedule leagues={leagues} />
        </div>
      </div>
      <div>
        <h2> Tin bóng đá </h2>
        <div className={styles.gridNews}>
          {news
            .filter(
              (item) =>
                item.imageUrl &&
                item.imageUrl !== "" &&
                item.title &&
                item.category &&
                item.link
            )
            .slice(1, 17)
            .map((newsItem) => (
              <NewCard
                key={newsItem.id}
                title={newsItem.title!}
                category={newsItem.category!}
                imageUrl={newsItem.imageUrl!}
                link={newsItem.link!}
                time={newsItem.time}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
