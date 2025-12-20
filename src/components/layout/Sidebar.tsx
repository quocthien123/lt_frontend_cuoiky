import { Link } from "react-router-dom";
import type { CSSProperties } from 'react'

const categories = [
  { id: 'premier-league', name: 'Ngoại hạng Anh', path: '/league/premier-league' },
  { id: 'la-liga', name: 'La Liga', path: '/league/la-liga' },
  { id: 'serie-a', name: 'Serie A', path: '/league/serie-a' },
  { id: 'bundesliga', name: 'Bundesliga', path: '/league/bundesliga' },
  { id: 'ligue-1', name: 'Ligue 1', path: '/league/ligue-1' },
  { id: 'vietnam', name: 'Đội tuyển Việt Nam', path: '/team/vietnam' },
  { id: 'u23-vietnam', name: 'U23 Việt Nam', path: '/team/u23-vietnam' },
  { id: 'transfers', name: 'Chuyển nhượng', path: '/transfers' },
  { id: 'world', name: 'Thế giới', path: '/world' },
];

export default function Sidebar() {
  return (
    <aside >
      <div>
        <h2>Danh mục</h2>

        <ul>
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link
                to={cat.path}
                
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#2563eb'
                  e.currentTarget.style.backgroundColor = '#eff6ff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#374151'
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>

        <div>
          <h3>Nhanh</h3>
          <div>
            <Link
              to="/results"
             
              onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#4b5563'}
            >
              KQ
            </Link>
            <Link
              to="/standings"
     
              onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#4b5563'}
            >
              BXH
            </Link>
            <Link
              to="/videos"
           
              onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#4b5563'}
            >
              Video
            </Link>
            <Link
              to="/premium"
     
              onMouseEnter={(e) => e.currentTarget.style.color = '#d97706'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#b45309'}
            >
              Premium
            </Link>
          </div>
        </div>
      </div>
    </aside>
  )
}