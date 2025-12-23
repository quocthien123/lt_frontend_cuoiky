
import NewCard from "../components/news/NewCard";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import  styles from './HomePage.module.css'
import NoImageNewsCard from "../components/news/NoImageNews";
export default function HomePage() {

    const [news, setNews] = useState<any[]>([]);
    const [standings, setStandings] = useState<any[]>([]);

    useEffect(() => {

        fetch(`http://localhost:3000/api/bongdaplus`)
        .then(res => res.json())
        .then(result => {
            if (result.success) 
                setNews(result.data.news)
                console.log("Dữ liệu nhận được:", result); 
        })
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