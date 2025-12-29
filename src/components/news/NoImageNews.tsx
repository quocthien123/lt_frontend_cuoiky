import { Link } from 'react-router-dom';
import styles from './NoImageNews.module.css'

interface NoImageCardProps {
    title: string;
    category: string;
    time?: string;
    link: string;
}
export default function NoImageNewsCard({title, category, time, link}: NoImageCardProps) {
    return (
        <Link className={styles.no_image_card} to={link.slice(1)}>
            <span>{category}</span>
            <h3 >{title}</h3>
            {time && <p>{time}</p>}
        </Link>
    );
}
