import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NewCard from './Newcard';
import NoImageNewsCard from './NoImageNewcard';


interface NewsItem {
    title: string;
    link: string;
    imageUrl: string;
    description: string;
}

export default function CategoryPage() {
    const { '*': slug } = useParams();
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3000/api/scrape-category?url=${slug}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setNews(data.data);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [slug]);

    if (loading) return (
        <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-danger" role="status"></div>
        </div>
    );



const noImageNews = news.filter(item => !item.imageUrl || item.imageUrl === '');
const hasImageNews = news.filter(item => item.imageUrl && item.imageUrl !== '');

    return (
        <div className="container mt-4 pb-5">
            <h2 className="mb-4 border-start border-danger border-4 ps-3 text-uppercase fw-bold">
                {slug?.replace(/-/g, ' ')}
            </h2>

            {/* KHU VỰC 1: TIN KHÔNG ẢNH */}
            {noImageNews.length > 0 && (
                <div className="mb-5">
                    <div className="bg-light p-3 rounded shadow-sm">
                        <h5 className="mb-3 fw-bold text-danger small text-uppercase">
                            <span className="me-2">●</span> Tin tức
                        </h5>
                        <div className="row g-2">
                            {noImageNews.map((item, index) => (
                                <div key={index} className="col-12 col-md-6 col-lg-4">
                                    <NoImageNewsCard 
                                        title={item.title} 
                                        link={item.link.includes('.html') ? `/bai-viet/${item.link.replace('https://bongdaplus.vn/', '').replace(/\.html$/, '').replace(/^\//, '')}` : `/danh-muc/${item.link}`} 
                                        description={item.description} 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* KHU VỰC 2: TIN CÓ ẢNH */}
            <div className="row g-4">
                {hasImageNews.map((item, index) => {
                    const isArticle = item.link.includes('.html');
                    const cleanSlug = item.link.replace('https://bongdaplus.vn/', '').replace(/\.html$/, '').replace(/^\//, '');
                    const targetPath = isArticle ? `/bai-viet/${cleanSlug}` : `/danh-muc/${cleanSlug}`;
                    
                    return (
                        <div key={index} className="col-12 col-md-6 col-lg-4">
                            <NewCard 
                                title={item.title} 
                                imageUrl={item.imageUrl} 
                                link={targetPath} 
                                description={item.description} 
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
