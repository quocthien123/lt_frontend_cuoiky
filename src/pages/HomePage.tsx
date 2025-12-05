import { mockNews } from "../mocks/news";
import NewCard from "../components/news/NewCard";

export default function HomePage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {mockNews.map(news => (
                <NewCard key = {news.id} {...news} />
            ))}
        </div>
    )
}