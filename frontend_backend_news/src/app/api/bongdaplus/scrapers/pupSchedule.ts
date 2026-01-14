// import axios from 'axios';
// import { json } from 'stream/consumers';
// import { UpcomingMatch } from '../types'
// // Giả định bạn đã có URL đầy đủ từ bước 1
// const JSON_URL = `https://data.bongdaplus.vn/data/top-list-matches.json?_=${Date.now()}`; 
// //console.log(JSON_URL)
// export async function fetchUpcomingMatches() {
//   try {
//     const response = await axios.get(JSON_URL);
//     const rawData = response.data; 
//    // console.log('rawdata:', JSON.stringify(rawData, null, 2));
    
//      const matches = rawData.map(item => ({
//       leagueLogo : item.tournament.tournament_logo,
//       leagueId : item.tournament.tournament_id,
      
//       link: `https://bongdaplus.vn/truc-tiep-mfiws1aoh0uztg4/manchester-united-vs-newcastle-united-7kbz8ilusx8or9b.html`,
//       starttime: item.start_time,
//       homeTeam: {
//         name: item.home_name,
//         logo: `https://data.bongdaplus.vn/logo/${item.home_logo}`,
//       },
//       awayTeam: {
//         name: item.away_name,
//         logo: `https://data.bongdaplus.vn/logo/${item.away_logo}`,
//       },
//     }));
//     return matches
//   } catch (error) {
//   //  console.error('Lỗi khi tải file JSON:', error);
//   }
// }
// fetchUpcomingMatches();
import axios from 'axios';
import { UpcomingMatch } from '../types'

// URL lấy danh sách trận đấu nổi bật
const JSON_URL = `https://data.bongdaplus.vn/data/top-list-matches.json?_=${Date.now()}`; 

export async function fetchUpcomingMatches() {
  try {
    const response = await axios.get(JSON_URL);
    const rawData = response.data; 
    
    const matches = rawData.map((item: any) => ({

      id: `${item.tournament.tournament_id}/${item.match_id}`,

      leagueLogo: item.tournament.tournament_logo,
      leagueId: item.tournament.tournament_id,
      
      link: item.slug, 
      
      starttime: item.start_time,
      
      homeTeam: {
        id: item.home_id, 
        name: item.home_name,
        logo: `https://data.bongdaplus.vn/logo/${item.home_logo}`,
      },
      
      awayTeam: {
        id: item.away_id, 
        name: item.away_name,
        logo: `https://data.bongdaplus.vn/logo/${item.away_logo}`,
      },
    }));

    return matches;
  } catch (error) {
    console.error('Lỗi khi tải file JSON:', error);
    return [];
  }
}