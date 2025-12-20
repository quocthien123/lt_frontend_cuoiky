import styles from './NewCard.module.css'

interface NewCardProps {

    title: string;
    category: string;
    image: string;
    time?: string;


}

export default function NewCard({title, category, image, time}: NewCardProps) {

    return (
        <div className="card">
            <img src={image} alt={title}  />

            <div>
                <span>{category}</span>
                <h3 >{title}</h3>
                {time && <p >{time}</p>}
            </div>
        </div>

    );
}
