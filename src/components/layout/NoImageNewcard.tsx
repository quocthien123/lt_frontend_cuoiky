import { Link } from 'react-router-dom';
import styles from './CategoryPage.module.css';
interface NoImageProps {
  title: string;
  link: string;
  description?: string;
}

export default function NoImageNewsCard({ title, link, description }: NoImageProps) {
  return (
  




    <div className="card h-100 shadow-sm border-0 bg-white news-card-no-img">
      <div className="card-body d-flex align-items-center p-3">
        <div className="flex-grow-1">
          <h6 className="mb-0 fw-bold">
            <Link 
              to={link} 
              className={`text-decoration-none text-dark ${styles.titleLink}`}
            >
              {title}
            </Link>
          </h6>
          {description && (
            <p className="text-muted small mb-0 mt-1 d-none d-md-block">
              {description}
            </p>
          )}
        </div>
      </div>
      
</div>
    
  );
}