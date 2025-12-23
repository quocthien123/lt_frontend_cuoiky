import styles from './NewCard.module.css'

interface NewCardProps {

    title: string;
    category: string;
    imageUrl: string;
    time?: string;

    link: string
}

export default function NewCard({title, category, imageUrl, time,link}: NewCardProps) {

    return (
        <a className="card" href={link}>
            <img src={imageUrl} alt={title}  />

            <div>
                <span>{category}</span>
                <h3 >{title}</h3>
                {time && <p >{time}</p>}
            </div>
        </a>

    );
}
