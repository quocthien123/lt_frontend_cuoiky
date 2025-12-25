import axios from 'axios';
// import { json } from 'stream/consumers';
// import { UpcomingMatch } from '../types'
// Giả định bạn đã có URL đầy đủ từ bước 1
const JSON_URL = `https://data.bongdaplus.vn/data/top-list-matches.json?_=${Date.now()}`; 
//console.log(JSON_URL)
export async function fetchUpcomingMatches() {
  try {
    const response = await axios.get(JSON_URL);
    const rawData = response.data; 
   // console.log('rawdata:', JSON.stringify(rawData, null, 2));
    
     const matches = rawData.map(item => ({
      
      link: `https://bongdaplus.vn${item.href || ''}`,
      starttime: item.start_time || '',
      homeTeam: {
        name: item.home_name || 'Unknown',
        logo: `https://bongdaplus.vn${item.home_logo}` || '',
      },
      awayTeam: {
        name: item.away_name || 'Unknown',
        logo: `https://bongdaplus.vn${item.away_logo}` || '',
      },
    }));
    return matches
  } catch (error) {
  //  console.error('Lỗi khi tải file JSON:', error);
  }
}
fetchUpcomingMatches();
