
import NewCard from "../components/news/NewCard";
import { useEffect, useState } from 'react';
import  styles from './HomePage.module.css'
import NoImageNewsCard from "../components/news/NoImageNews";
import Standings, { type RankingGroup } from "./Standing/StandingPage";
export default function HomePage() {

    const [news, setNews] = useState<any[]>([]);
    const [standings, setStandings] = useState<RankingGroup[]>([]);
     const [loading, setLoading] = useState(true); //loading de load Rankinggroup
    useEffect(() => {
        setLoading(true); 
        fetch(`http://localhost:3000/api/bongdaplus`)
        .then(res => res.json())
        .then(result => {
            if (result.success) 
                setNews(result.data.news)
                setStandings(result.data.standing)
                console.log("Dữ liệu nhận được:", result);
            setLoading(false);  
        }
    )
        
    .catch(err => console.log(err));
    } , []);
        const firstNewsWithImage = news.find(item => item.imageUrl && item.imageUrl !== "");
    
    return (
        <div>
            <div className={styles.newsContainer}>
                <div className={styles.newsLeft}>
                      {firstNewsWithImage && <NewCard {...firstNewsWithImage}/>}
                </div>
            
                <ul className={styles.listNewsNoImage}>
                    {news
                        .filter(item => item.imageUrl == "")
                        .slice(1, 7)
                        .map(news => (
                            <NoImageNewsCard  key={news.id} {...news} />
                        ))}

                </ul>
                    <div className={styles.standings}>
                    {standings.length > 0 ? (
                        <Standings rankings={standings} />
                    ) : (
                        <div>Đang tải bảng xếp hạng...</div> 
                    )}
                    </div>
            </div>
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
     
    )
}