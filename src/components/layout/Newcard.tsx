import { Link } from 'react-router-dom';
import styles from './CategoryPage.module.css';
export default function NewCard({ title, imageUrl, link, description }: any) {
    return (
        
            <div className="card h-100 shadow-sm border-0">
                <Link to={link}>
                    <img src={imageUrl} className="card-img-top" alt={title} style={{ height: '200px', objectFit: 'cover' }} />
                </Link>
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">
                        <Link to={link} className={`text-decoration-none text-dark ${styles.titleLink}`}>
                            {title}
                        </Link>
                    </h5>
                    <p className="card-text text-muted small flex-grow-1">
                        {description}
                    </p>
                </div>
         
        </div>
    );
}