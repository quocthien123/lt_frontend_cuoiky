// src/pages/Matches/MatchDetail/H2HTab.tsx
import type { MatchData } from './types';

export default function H2HTab({ data }: { data: MatchData }) {
    return (
        <div className="card border-0 shadow-sm">
             <div className="card-header bg-white text-center fw-bold py-3">Lịch sử đối đầu</div>
            <ul className="list-group list-group-flush">
                {(data.h2h?.vs || []).map((m, idx) => {
                    const isHomeWin = m.goals_home > m.goals_away;
                    const isAwayWin = m.goals_away > m.goals_home;
                    return (
                        <li key={idx} className="list-group-item py-3">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-12 col-md-2 text-center text-muted small mb-2 mb-md-0">
                                    {new Date(m.start_time).toLocaleDateString('vi-VN')}
                                </div>
                                <div className={`col-5 col-md-4 text-end ${isHomeWin ? 'fw-bold text-dark' : 'text-secondary'}`}>
                                    {m.home_name}
                                </div>
                                <div className="col-2 col-md-1 text-center">
                                    <span className="badge bg-light text-dark border border-secondary fw-bold px-2 py-2">
                                        {m.goals_home} - {m.goals_away}
                                    </span>
                                </div>
                                <div className={`col-5 col-md-4 text-start ${isAwayWin ? 'fw-bold text-dark' : 'text-secondary'}`}>
                                    {m.away_name}
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}