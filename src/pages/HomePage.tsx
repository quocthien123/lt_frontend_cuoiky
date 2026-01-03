
import NewCard from "../components/news/NewCard";
import { useEffect, useState } from 'react';
import  styles from './HomePage.module.css'
import NoImageNewsCard from "../components/news/NoImageNews";
import Standings, { type RankingGroup } from "./Standing/StandingPage";
import UpcomingMatchesLayout from "./Matches/UpcomingMatches";
import { useParams } from "react-router-dom";
import type { LeagueGroup } from "./Matches/LichThiDauPage";
import Schedule from "./Matches/LichThiDauPage";
export default function HomePage() {
   
    const [news, setNews] = useState<any[]>([]);
    const [standings, setStandings] = useState<RankingGroup[]>([]);
     const [loading, setLoading] = useState(true); //loading de load Rankinggroup
     const [upcomingMatches, setUpcomingMatches] = useState<any[]>([]);

    const [leagues, setLeagues] = useState<LeagueGroup[]>([]);
    useEffect(() => {
        setLoading(true); 
        fetch(`http://localhost:3000/api/bongdaplus`)
        .then(res => res.json())
        .then(result => {
            if (result.success) 
                setNews(result.data.news)
                setStandings(result.data.standing)
                setUpcomingMatches(result.data.upcomingMatches)
                console.log("Dữ liệu nhận được:", result);
            setLoading(false);  
        }
    )
        
    .catch(err => console.log(err));
    } ,[]);

    
    useEffect(() => {
        setLoading(true); 
        fetch(`http://localhost:3000/api/lichthidau`)
        .then(res => res.json())
        .then(result => {
            if (result.success) 
                setLeagues(result.data.matches)
                
              console.log("Dữ liệu nhận được:", result);
            setLoading(false);  
        }
        
    )
        
    .catch(err => console.log(err));
    } ,[]);

        const firstNewsWithImage = news.find(item => item.imageUrl && item.imageUrl !== "");
    
    return (
        <div>
            <div>
                <UpcomingMatchesLayout matches = {upcomingMatches}/>
                 </div>
                 <div style={ {height: "50px" }}> </div>
            <div className={styles.newsContainer}>
                
                <div className={styles.newsLeft}>
                        <h2> Tin mới </h2>
                      {firstNewsWithImage && <NewCard {...firstNewsWithImage}/>}
                </div>
            
                <ul className={styles.listNewsNoImage}>
                    <h2>Tin vắn</h2>
                    {news
                        .filter(item => item.imageUrl == "")
                        .slice(1, 7)
                        .map(news => (
                            <NoImageNewsCard  key={news.id} {...news} />
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
            <div >

                    <h2>Lịch thi đấu </h2>
                    <div>
                        <Schedule leagues = {leagues} />
                    </div>
            </div>
            <div>
            <h2> Tin bóng đá </h2>
                        <div className={styles.gridNews}>
                    
                        {news
                        .filter(item => item.imageUrl && item.imageUrl !== "")
                        .slice(1, 17)
                        .map(news => (
                            <NewCard key={news.id} {...news} />
                        ))}
                    </div>

            </div>
          
        </div>
     
    )
}