import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CategoryPage() {
    const { slug } = useParams();

    const [news, setNews] = useState<any[]>([]);
    const [rankings, setRankings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetch(`http://localhost:3000/api/get-category?slug=${slug}`)
        .then(res => res.json())
        .then(result => {
            if (result.success) 
                setNews(result.data.articles_news)
                setRankings(result.data.standing.standings)
                console.log("Dữ liệu nhận được:", result); 
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

    
                <table >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th >Đội</th>
                                        
                                    
                                        <th >Hiệu số</th>
                                        <th >Thắng</th>
                                        <th >Hòa</th>
                                            <th >Thua</th>
                                            <th >Điểm</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rankings.map((team: any, index) => (
                                        <tr key={index}>
                                            {/* Tùy vào tên trường dữ liệu Backend trả về mà bạn sửa lại ở dưới nhé */}
                                            {/* Ví dụ: team.rank, team.name, team.points */}
                                            <td >{index + 1}</td>
                                            <td>
                                                <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                                                    {<img src={team.teamLogo} width="20" />} 
                                                    {team.nameTeam}
                                                </div>

                                            </td>
                                            
                                            <td >{team.hieu_so}</td>
                                             <td >{team.win}</td>
                                              <td >{team.draws}</td>
                                               <td >{team.losses}</td>
                                               <td ><strong>{team.point}</strong></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
             
        </div>
    );
}

export default CategoryPage;