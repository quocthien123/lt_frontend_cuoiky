import axios from 'axios';

// types.ts hoặc ngay trong file
interface MatchItem {
  round_name: string;
  home_name: string;
  home_logo: string;
  away_name: string;
  away_logo: string;
  start_time: number; // hoặc string, tuỳ API
  goals_home: string | null;
  goals_away: string | null;
  status: string;
}


const LEAGUES = [
  { id: 'premier-league', name: 'Ngoại Hạng Anh', url: `https://data.bongdaplus.vn/data/bong-da-anh-matches.json?_=${Date.now()}` },
  { id: 'la-liga', name: 'Tây Ban Nha', url: `https://data.bongdaplus.vn/data/bong-da-tay-ban-nha-matches.json?_=${Date.now()}` },
  { id: 'v-league', name: 'V-League', url: `https://data.bongdaplus.vn/data/bong-da-viet-nam-matches.json?_=${Date.now()}` },
  { id: 'bundesliga', name: 'Đức', url: `https://data.bongdaplus.vn/data/bong-da-duc-matches.json?_=${Date.now()}` },
  { id: 'league-1', name: 'Pháp', url: `https://data.bongdaplus.vn/data/bong-da-phap-matches.json?_=${Date.now()}` },
  { id: 'serie-A', name: 'Ý', url: `https://data.bongdaplus.vn/data/bong-da-y-matches.json?_=${Date.now()}` },
  { id: 'champion-league', name: "C1", url: `https://data.bongdaplus.vn/data/champions-league-cup-c1-matches.json?_=${Date.now()}` }
];

function getDateString(timestamp: any): string {
    try {
      return timestamp.split(' ')[0]
    }
    catch {
      return "unknown"
    }
}
function groupBy<T>(
  array: T[],
  keyFn: (item: T) => string
) {
  const result: Record<string, T[]> = {};

  for (const item of array) {
    const key = keyFn(item);

    if (!result[key]) {
      result[key] = [];
    }

    result[key].push(item);
  }

  return result;
}


export async function fetchLeaguesMatches() {
  try {
    const requests = LEAGUES.map(async (league) => {
      try {
        const response = await axios.get(league.url);
        const rawData = response.data;
       const matches = (rawData.matches as any[]).map(item => ({
            round_name: item.round_name,
            home_name: item.home_name,
            home_logo: `https://data.bongdaplus.vn/logo/${item.home_logo}`,
            away_name: item.away_name,
            away_logo: `https://data.bongdaplus.vn/logo/${item.away_logo}`,
            start_time: item.start_time,
            goals_home: item.goals_home,
            goals_away: item.goals_away,
            status: item.status,
          })) as MatchItem[];
          console.log(matches)
        // --- Bắt đầu nhóm dữ liệu ---
        // 1. Nhóm theo round_name
        const roundsMap = groupBy(matches, (m) => m.round_name);

        // 2. Với mỗi vòng, nhóm tiếp theo ngày
        const rounds = Object.entries(roundsMap).map(([roundName, roundMatches]) => {
          const datesMap = groupBy(roundMatches, (m) => getDateString(m.start_time));
          const dates = Object.entries(datesMap).map(([date, matchesInDate]) => ({
            date,
            matches: matchesInDate
          }));
          return {
            round_name: roundName,
            dates
          };
        });

        return {
          league_id: league.id,
          league_name: league.name,
          rounds
        };
      } catch (err) {
        console.warn(`Lỗi khi fetch giải: ${league.name}`, err);
        return {
          league_id: league.id,
          league_name: league.name,
          rounds: []
        };
      }
    });

    const finalData = await Promise.all(requests);
    return finalData;
  } catch (error) {
    console.error("Lỗi hệ thống tổng thể:", error);
    return [];
  }
}