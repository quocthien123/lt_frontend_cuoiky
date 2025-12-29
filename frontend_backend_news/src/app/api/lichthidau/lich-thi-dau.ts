import axios from 'axios';

const LEAGUES = [
   { id: 'premier-league', name: 'Ngoại Hạng Anh', url: `https://data.bongdaplus.vn/data/bong-da-anh-matches.json?_=${Date.now()}` },
  { id: 'la-liga', name: 'Tây Ban Nha', url: `https://data.bongdaplus.vn/data/bong-da-tay-ban-nha-matches.json?_=${Date.now()}` },
{ id: 'v-league', name: 'V-League', url: `https://data.bongdaplus.vn/data/bong-da-viet-nam-matches.json?_=${Date.now()}` },
  {id: 'bundesliga', name: 'Đức', url: `https://data.bongdaplus.vn/data/bong-da-duc-matches.json?_=${Date.now()}`},
 {id: 'league-1', name: 'Pháp', url: `https://data.bongdaplus.vn/data/bong-da-phap-matches.json?_=${Date.now()}`},
 {id: 'serie-A', name: 'Ý', url: `https://data.bongdaplus.vn/data/bong-da-y-matches.json?_=${Date.now()}`},
 {id: 'champion-league', name: "C1", url: `https://data.bongdaplus.vn/data/champions-league-cup-c1-matches.json?_=${Date.now()}`}

];

export async function fetchLeaguesMatches() {
  let leagueName = ''
  try {
    // 2. Tạo danh sách các lời hứa (Promises)
    const requests = LEAGUES.map(async league => {

        const response = await axios.get(league.url);
        leagueName = league.name
        const rawData = response.data;
        const dataMap = rawData.matches
//        console.log(dataMap)
        const matches = dataMap.map(item => ({
            round_name: item.round_name,
            home_name: item.home_name,
            //https://data.bongdaplus.vn/logo/team-o014smco78js6pk.png
            home_logo : `https://data.bongdaplus.vn/logo/${item.home_logo}`,
            away_name: item.away_name,
            away_logo : `https://data.bongdaplus.vn/logo/${item.away_logo}`,
            start_time: item.start_time,
            goals_home: item.goals_home,
            goals_away: item.goals_away,
            status: item.status,
    }));
    return {
        league_name: league.id,
        league_nation: league.name,
        matches: matches
      };
    });
    const finalData = await Promise.all(requests);
    return finalData;
  } catch (error) {
    console.error("Lỗi hệ thống:", error);
    console.log("lỗi nằm ở league: " , leagueName)
    return []
  }
}
