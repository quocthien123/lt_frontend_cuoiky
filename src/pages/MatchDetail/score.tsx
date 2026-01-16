// src/pages/MatchDetail/score.tsx

import type { MatchData } from './types';

export default function HeaderScore({ data }: { data: MatchData }) {
    return (
        <div className="card text-white mb-4 border-0 shadow" style={{ background: 'linear-gradient(90deg, #0d47a1 0%, #00897b 100%)' }}>
            <div className="card-body py-4">
                <div className="row align-items-center text-center">
                    <div className="col-4">
                        <img 
                            src={`https://data.bongdaplus.vn/logo/${data.home_logo}`} 
                            className="img-fluid mb-2" 
                            style={{maxHeight: '80px', objectFit: 'contain'}} 
                            alt={data.home_name}
                        />
                        <h5 className="fw-bold d-none d-md-block">{data.home_name}</h5>
                    </div>
                    
                    <div className="col-4">
                        <h1 className="display-4 fw-bold mb-0">
                            {data.status === 100 || data.play_time === 'FT' ? `${data.goals_home} - ${data.goals_away}` : 'VS'}
                        </h1>
                        <span className="badge bg-light text-dark bg-opacity-75 mt-2 fs-6">
                            {data.start_time ? new Date(data.start_time).toLocaleString('vi-VN', {hour:'2-digit', minute:'2-digit'}) : data.play_time}
                        </span>
                    </div>

                    <div className="col-4">
                        <img 
                            src={`https://data.bongdaplus.vn/logo/${data.away_logo}`} 
                            className="img-fluid mb-2" 
                            style={{maxHeight: '80px', objectFit: 'contain'}} 
                            alt={data.away_name}
                        />
                        <h5 className="fw-bold d-none d-md-block">{data.away_name}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}