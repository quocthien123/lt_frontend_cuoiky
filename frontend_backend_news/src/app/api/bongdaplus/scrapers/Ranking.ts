import axios from 'axios';

const LEAGUES = [
   { id: 'premier-league', name: 'Ngoại Hạng Anh', url: `https://data.bongdaplus.vn/data/bong-da-anh-rankings.json?_=${Date.now()}` },
  { id: 'la-liga', name: 'Tây Ban Nha', url: `https://data.bongdaplus.vn/data/bong-da-tay-ban-nha-rankings.json?_=${Date.now()}` },
{ id: 'v-league', name: 'V-League', url: `https://data.bongdaplus.vn/data/bong-da-viet-nam-rankings.json?_=${Date.now()}` },
  {id: 'bundesliga', name: 'Đức', url: `https://data.bongdaplus.vn/data/bong-da-duc-rankings.json?_=${Date.now()}`},
 {id: 'league-1', name: 'Pháp', url: `https://data.bongdaplus.vn/data/bong-da-phap-rankings.json?_=${Date.now()}`},
 {id: 'serie-A', name: 'Ý', url: `https://data.bongdaplus.vn/data/bong-da-y-rankings.json?_=${Date.now()}`}

];

export async function fetchLeagueRanking() {
  let leagueName = ''
  try {
    // 2. Tạo danh sách các lời hứa (Promises)
    const requests = LEAGUES.map(async league => {

        const response = await axios.get(league.url);
        leagueName = league.name
        const rawData = response.data;
        const dataMap = rawData.ranks
//        console.log(dataMap)
        const standings = dataMap.map(item => ({
          nameTeam: item.team_name ,
          teamLogo : `https://data.bongdaplus.vn/logo/${item.team_logo}` || '',
          rank : item.position ,
          matches : item.matches ,
          win: item.wins ,
          losses : item.losses ,
          draws: item.draws ,
          ghiban : item.scores_for ,
          thung_luoi : item.scores_against ,
          hieu_so : item.scores_diff ,
          point : item.points ,

    }));
    return {
        league_name: league.id,
        league_nation: league.name,
        standings: standings
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
