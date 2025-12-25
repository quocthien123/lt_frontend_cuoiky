import styles from './NoImageNews.module.css'

interface NoImageCardProps {
    title: string;
    category: string;
    time?: string;
    link: string;
}
export default function NoImageNewsCard({title, category, time, link}: NoImageCardProps) {

    return (
        <a className={styles.no_image_card} href={link}>
            <span>{category}</span>
            <h3 >{title}</h3>
            {time && <p>{time}</p>}
        </a>
    );
}
