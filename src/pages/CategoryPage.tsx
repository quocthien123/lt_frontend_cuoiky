import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Standings, { StandingsTable, type RankingItem } from './Standing/StandingPage';

function CategoryPage() {
    const { slug } = useParams();
    const [news, setNews] = useState<any[]>([]);
    const [rankings, setRankings] = useState<RankingItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetch(`http://localhost:3000/api/get-category?slug=${slug}`)
        .then(res => res.json())
        .then(result => {
            if (result.success) 
                setNews(result.data.articles_news)
                setRankings(result.data.standing.standings)
               // console.log("Dữ liệu nhận được:", result); 
        })
        
    .catch(err => console.log(err));
    }, [slug]);

    return (
        <div>
            <h1>Tin tức: {slug} </h1>
            <div >
                {news.map((item: any, idx) => (
                    <div key={idx}>
                        <a href = {item.url }>{item.title}</a>
                        <img src= {item.img_url} alt={item.title} />
                        <p>{item.dateTime}</p>

                    </div>
                ))}
            </div>
                <StandingsTable rankings={rankings} ></StandingsTable>
        </div>
    );
}

export default CategoryPage;