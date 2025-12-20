import { mockNews } from "../mocks/news";
import NewCard from "../components/news/NewCard";

export default function HomePage() {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {mockNews.map(news => (
                <NewCard key={news.id} {...news} />
            ))}
        </div>
    )
}