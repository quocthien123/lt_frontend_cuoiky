//cập nhật trận đấu
import React from 'react';
import { Link } from 'react-router-dom';

// Import file SCSS cấu hình Bootstrap
import '../MatchDetail/bootstrap.scss'; 

interface Team {
  id: string | number;
  name: string;
  logo?: string;
}

export interface UpcomingMatch {
  id: string | number;
  starttime: string | number;
  homeTeam: Team;
  awayTeam: Team;
}

export function UpcomingMatchesCell({ match }: { match: UpcomingMatch }) {
  const timeDisplay = typeof match.starttime === 'number' 
    ? new Date(match.starttime * 1000).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    : match.starttime;

  const safeMatchId = encodeURIComponent(match.id.toString());
  const detailLink = `/match/${safeMatchId}`;

  return (
    <div className="card border-0 shadow-sm h-100" style={{ minWidth: '200px', maxWidth: '200px' }}>
      

      <Link to={detailLink} className="text-decoration-none">
        <div className="card-header bg-white py-2 border-bottom-0 text-center">
            <span className="fw-bold text-dark" style={{ fontSize: '0.9rem' }}>
                {timeDisplay}
            </span>
        </div>
      </Link>

      {/* 2. Body: Danh sách 2 đội */}
      <div className="card-body p-2 bg-white rounded-bottom pt-0">
        
        <div className="d-flex flex-column gap-2 border rounded p-2" style={{backgroundColor: '#f8f9fa'}}>
            
            {/* Đội Nhà */}
            <Link to={detailLink} className="d-flex justify-content-between align-items-center text-decoration-none text-dark p-1 rounded hover-bg-light">
                {/* Logo + Tên */}
                <div className="d-flex align-items-center overflow-hidden">
                    <div style={{width: '25px', textAlign: 'center', flexShrink: 0}}>
                        {match.homeTeam.logo ? (
                            <img 
                                src={match.homeTeam.logo} 
                                alt={match.homeTeam.name} 
                                className="img-fluid" 
                                style={{ maxHeight: '20px', maxWidth: '20px', objectFit: 'contain' }} 
                            />
                        ) : (
                            <div className="bg-secondary rounded-circle d-inline-block" style={{width: 20, height: 20}}></div>
                        )}
                    </div>
                    <span className="fw-medium text-truncate ms-2" title={match.homeTeam.name} style={{ fontSize: '0.85rem' }}>
                        {match.homeTeam.name}
                    </span>
                </div>
                {/* Bên phải: Dấu -*/}
                <span className="fw-bold text-dark ms-2" style={{ fontSize: '0.85rem' }}>-</span>
            </Link>


            {/* Đội Khách */}
            <Link to={detailLink} className="d-flex justify-content-between align-items-center text-decoration-none text-dark p-1 rounded hover-bg-light">
    
                <div className="d-flex align-items-center overflow-hidden">
                    <div style={{width: '25px', textAlign: 'center', flexShrink: 0}}>
                        {match.awayTeam.logo ? (
                            <img 
                                src={match.awayTeam.logo} 
                                alt={match.awayTeam.name} 
                                className="img-fluid" 
                                style={{ maxHeight: '20px', maxWidth: '20px', objectFit: 'contain' }} 
                            />
                        ) : (
                            <div className="bg-secondary rounded-circle d-inline-block" style={{width: 20, height: 20}}></div>
                        )}
                    </div>
                    <span className="fw-medium text-truncate ms-2" title={match.awayTeam.name} style={{ fontSize: '0.85rem' }}>
                        {match.awayTeam.name}
                    </span>
                </div>
              
                <span className="fw-bold text-dark ms-2" style={{ fontSize: '0.85rem' }}>-</span>
            </Link>

        </div>
      </div>
    </div>
  );
}

export default function UpcomingMatchesLayout({ matches }: { matches: UpcomingMatch[] }) {
  if (!matches || matches.length === 0) return null;

  return (
    <div className="bs-scope mt-4">
        <div className="container">
            <h5 className="fw-bold mb-3 ps-2 border-start border-4 border-danger text-uppercase text-secondary" style={{fontSize: '1rem'}}>
                Trận đấu sắp tới
            </h5>
            
            <div className="d-flex flex-nowrap overflow-auto pb-4 px-1 gap-3" style={{ scrollBehavior: 'smooth' }}>
                {matches.slice(0, 10).map((match, index) => (
                    <div key={match.id || index} className="flex-shrink-0">
                        <UpcomingMatchesCell match={match} />
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}