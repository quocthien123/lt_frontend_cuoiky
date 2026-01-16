import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Standings, { StandingsTable, type RankingItem } from './Standing/StandingPage';
import type { UpcomingMatchItem } from './HomePage';
import Schedule, { LeagueSchedule, type LeagueGroup } from './Matches/LichThiDauPage';
import styles from './CategoryPage.module.css';

function CategoryPage() {
    const { slug } = useParams();
    const [news, setNews] = useState<any[]>([]);
    const [rankings, setRankings] = useState<RankingItem[]>([]);
    const [schedule, setSchedule] = useState<LeagueGroup>([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch(`http://localhost:3000/api/get-category?slug=${slug}`)
    .then(res => res.json())
    .then(result => {
      if (result.success) {
        setNews(result.data.articles_news);
        setRankings(result.data.standing.standings);

    
        const leagueData: LeagueGroup = {
          league_id: slug || 'unknown', // dùng slug làm id tạm
          league_name: slug ? slug.replace('-', ' ').toUpperCase() : 'Giải đấu', // tùy chỉnh tên
          rounds: result.data.rounds.rounds || [], // đảm bảo luôn là mảng
        };

        setSchedule(leagueData);
        console.log("Dữ liệu lịch thi đấu đã xử lý:", leagueData);
      }
      setLoading(false);
    })
    .catch(err => {
      console.log(err);
      setLoading(false);
    });
}, [slug]);

    return (
        <div className={styles.container}>
            <div className={styles.pageHeader}>
                <h1>Tin tức: {slug?.replace('-', ' ').toUpperCase()}</h1>
            </div>

          
            <div className={styles.newsSection}>
                <h2 className={styles.newsTitle}>Bài viết nổi bật</h2>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <div className={styles.loadingSpinner}></div>
                        <p style={{ marginTop: '20px', color: '#7f8c8d' }}>Đang tải dữ liệu...</p>
                    </div>
                ) : news.length > 0 ? (
                    <div className={styles.newsGrid}>
                        {news.map((item: any, idx) => (
                            <a href={item.url} key={idx} className={styles.newsCardLink}>
                                <div className={styles.newsCard}>
                                    <img 
                                        src={item.img_url} 
                                        alt={item.title}
                                        className={styles.newsCardImage}
                                    />
                                    <div className={styles.newsCardContent}>
                                        <h3 className={styles.newsCardTitle}>{item.title}</h3>
                                        <p className={styles.newsCardDate}>{item.dateTime}</p>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <p>Không có bài viết nào</p>
                    </div>
                )}
            </div>

            {/* Standings Section */}
            {rankings.length > 0 && (
                <div className={styles.standingsSection}>
                    <h2 className={styles.standingsTitle}>Bảng xếp hạng</h2>
                    <StandingsTable rankings={rankings} ></StandingsTable>
                </div>
            )}

            {/* Schedule Section */}
            {schedule.rounds && schedule.rounds.length > 0 && (
                <div className={styles.scheduleSection}>
                    <h2 className={styles.scheduleTitle}>Lịch thi đấu</h2>
                    <LeagueSchedule league={schedule} />
                </div>
            )}
        </div>
    );
}

export default CategoryPage;