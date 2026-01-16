// LichThiDauPage.tsx

import { useState } from 'react';
import styles from './LichThiDauPage.module.css';

export interface Match {
  home_name: string;
  home_logo: string;
  away_name: string;
  away_logo: string;
  start_time: number;
  goals_home: string | null;
  goals_away: string | null;
  status: string;
}

export interface DateGroup {
  date: string;
  matches: Match[];
}

export interface RoundGroup {
  round_name: string;
  dates: DateGroup[];
}

export interface LeagueGroup {
  league_id: string;
  league_name: string;
  rounds: RoundGroup[];
}
function findCurrentRoundIndex(rounds: RoundGroup[] | undefined): number {
  if (!Array.isArray(rounds) || rounds.length == 0) {
    return 0;
  }
 
  // Tìm vòng đầu tiên có trận CHƯA KẾT THÚC (status !== '100')
  for (let i = 0; i < rounds.length; i++) {
    const hasUnfinished = rounds[i].dates?.some(dateGroup =>
      dateGroup.matches?.some(match => match.status != '100')
    );
    if (hasUnfinished) {

      return i;
    }
  }
  
  // Nếu tất cả các vòng đã đá xong → chọn vòng cuối cùng
  return rounds.length - 1;
}
function MatchRow({ match }: { match: Match }) {
  const isFinished = match.status == '100';
  return (
    <div className={styles.matchRow}>
      <div className={styles.teams}>
        <div className={styles.team}>
          {match.home_logo && (
            <img src={match.home_logo} alt={match.home_name} width="24" height="24" />
          )}
          <span>{match.home_name}</span>
        </div>
        <div className={styles.vs}>VS</div>
        <div className={styles.team}>
          <span>{match.away_name}</span>
          {match.away_logo && (
            <img src={match.away_logo} alt={match.away_name} width="24" height="24" />
          )}
        </div>
      </div>

      <div className={styles.score}>
        {isFinished ? (
          <>
            <span>{match.goals_home}</span> - <span>{match.goals_away}</span>
          </>
        ) : (
            <>
                <span></span> - <span></span>
            </>
        )
        }
      </div>
    </div>
  );
}
export  function LeagueSchedule({ league }: { league: LeagueGroup }) {
  // Đảm bảo rounds luôn là mảng
  const rounds = Array.isArray(league.rounds) ? league.rounds : [];

  const currentRoundIndex = findCurrentRoundIndex(rounds);
  const roundsToShow = rounds.slice(currentRoundIndex, currentRoundIndex + 4);

  return (
    <div className={styles.schedule}>
      {roundsToShow.length > 0 ? (
        roundsToShow.map((round) => (
          <div key={round.round_name} className={styles.round}>
            <h3 className={styles.roundTitle}>Vòng {round.round_name}</h3>
            {round.dates?.map((dateGroup) => (
              <div key={dateGroup.date} className={styles.dateSection}>
                <h4 className={styles.dateHeader}>
                  {new Date(dateGroup.date).toLocaleDateString('vi-VN', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                  })}
                </h4>
                <div className={styles.matches}>
                  {dateGroup.matches?.map((match, idx) => (
                    <MatchRow key={idx} match={match} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div className={styles.noData}>Không có dữ liệu lịch thi đấu.</div>
      )}
    </div>
  );
}
export default function Schedule({ leagues }: { leagues: LeagueGroup[] }) {
  const [selectedLeagueIndex, setSelectedLeagueIndex] = useState(0);

  if (!leagues || leagues.length === 0) {
    return <div>Đang tải lịch thi đấu...</div>;
  }

  const selectedLeague = leagues[selectedLeagueIndex];
  if (!selectedLeague) return null;

  return (
    <div className={styles.container}>
      <div className={styles.leagueTabs}>
        {leagues.map((league, i) => (
          <button
            key={league.league_id}
            onClick={() => setSelectedLeagueIndex(i)}
            className={i === selectedLeagueIndex ? styles.activeTab : styles.tab}
          >
            {league.league_name}
          </button>
        ))}
      </div>

      {/* Hiển thị lịch của giải đã chọn */}
      <LeagueSchedule league={selectedLeague} />
    </div>
  );
}