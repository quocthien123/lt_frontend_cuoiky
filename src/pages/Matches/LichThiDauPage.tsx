// LichThiDauPage.tsx

import { useState } from 'react';
import styles from './LichThiDauPage.module.css';

// === Interfaces ===
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
function findCurrentRoundIndex(rounds: RoundGroup[]): number {
  for (let i = 0; i < rounds.length; i++) {
    const round = rounds[i];
    // Kiểm tra xem vòng này có trận nào CHƯA KẾT THÚC không
    const hasUpcomingOrLiveMatch = round.dates.some(dateGroup =>
      dateGroup.matches.some(match => {
        return  match.status != '100';
      })
    );

    if (hasUpcomingOrLiveMatch) {
      return i; // Đây là vòng hiện tại
    }
  }

  // Nếu tất cả trận đã đá → trả về vòng cuối cùng (hoặc 0 nếu không có)
  return Math.max(0, rounds.length - 1);
}


// === Hiển thị 1 trận đấu ===
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

// === Hiển thị lịch thi đấu theo giải ===
export default function Schedule({ leagues }: { leagues: LeagueGroup[] }) {
  const [selectedLeagueIndex, setSelectedLeagueIndex] = useState(0);

  if (!leagues || leagues.length === 0) {
    return <div>Đang tải lịch thi đấu...</div>;
  }

  const selectedLeague = leagues[selectedLeagueIndex];
  if (!selectedLeague) return null;

  // 👇 Lọc 4 vòng từ vòng hiện tại
  const currentRoundIndex = findCurrentRoundIndex(selectedLeague.rounds);
  const roundsToShow = selectedLeague.rounds.slice(currentRoundIndex, currentRoundIndex + 4);

  return (
    <div className={styles.container}>
      {/* Chọn giải */}
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

      {/* Hiển thị 4 vòng gần nhất */}
      <div className={styles.schedule}>
        {roundsToShow.map((round) => (
          <div key={round.round_name} className={styles.round}>
            <h3 className={styles.roundTitle}>Vòng {round.round_name}</h3>
            {round.dates.map((dateGroup) => (
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
                  {dateGroup.matches.map((match, idx) => (
                    <MatchRow key={idx} match={match} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
