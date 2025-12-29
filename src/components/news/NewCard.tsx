import { Link } from 'react-router-dom';
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
          <Link className= "card" to={link.slice(1)}>
            <img src={imageUrl} alt={title}  />
            <div>
                <span>{category}</span>
                <h3 >{title}</h3>
                {time && <p >{time}</p>}
            </div>
        </Link>

    );
}
