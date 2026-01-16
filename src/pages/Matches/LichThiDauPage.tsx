// LichThiDauPage.tsx
import { useState } from 'react';
import styles from './LichThiDauPage.module.css';
import { Link } from 'react-router-dom'; // Import Link để chuyển trang

export interface Match {
  id: string; // Đây là slug từ API (ví dụ: folder/name-id)
  home_name: string;
  home_logo: string;
  away_name: string;
  away_logo: string;
  start_time: number;
  goals_home: string | null;
  goals_away: string | null;
  status: string;
}

// ... các interface khác giữ nguyên ...
export interface DateGroup { date: string; matches: Match[]; }
export interface RoundGroup { round_name: string; dates: DateGroup[]; }
export interface LeagueGroup { league_id: string; league_name: string; rounds: RoundGroup[]; }

function findCurrentRoundIndex(rounds: RoundGroup[] | undefined): number {
  if (!Array.isArray(rounds) || rounds.length == 0) return 0;
  for (let i = 0; i < rounds.length; i++) {
    const hasUnfinished = rounds[i].dates?.some(dateGroup =>
      dateGroup.matches?.some(match => match.status != '100')
    );
    if (hasUnfinished) return i;
  }
  return rounds.length - 1;
}

function MatchRow({ match }: { match: Match }) {
  const isFinished = match.status == '100';

  // --- LOGIC XỬ LÝ ID SẠCH ---
  // Tách slug: "mfiws1aoh0uztg4/liverpool-vs-abc-ykcv4illo87xw5u"
  const slugParts = match.id ? match.id.split('/') : [];
  const tournamentId = slugParts[0] || "unknown";
  
  // Lấy matchId thực sự (phần mã 15 ký tự ở cuối cùng sau dấu gạch ngang)
  const matchSlug = slugParts[1] || "";
  const matchParts = matchSlug.split('-');
  const realMatchId = matchParts[matchParts.length - 1] || "";

  // Tạo ID sạch để Backend đọc được: "tournament_id/match_id"
  const cleanId = `${tournamentId}/${realMatchId}`;
  const detailLink = `/match/${encodeURIComponent(cleanId)}`;

  return (
    <Link to={detailLink} className={styles.matchLink} style={{ textDecoration: 'none', color: 'inherit' }}>
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
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

export function LeagueSchedule({ league }: { league: LeagueGroup }) {
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
                    weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric',
                  })}
                </h4>
                <div className={styles.matches}>
                  {dateGroup.matches?.map((match, idx) => (
                    <MatchRow key={match.id || idx} match={match} />
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
  if (!leagues || leagues.length === 0) return <div>Đang tải lịch thi đấu...</div>;
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
      <LeagueSchedule league={selectedLeague} />
    </div>
  );
}