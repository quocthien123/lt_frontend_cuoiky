// src/pages/Matches/MatchDetail/lineups.tsx
import type{ MatchData, Player } from './types';

const PlayerRow = ({ p }: { p: Player }) => (
    <div className="d-flex align-items-center py-2 border-bottom">
        <span className="badge bg-secondary rounded-circle me-3 d-flex justify-content-center align-items-center" style={{width: 30, height: 30}}>
            {p.number}
        </span>
        <span className="fw-medium text-dark flex-grow-1">{p.name}</span>
        {p.captain && <span className="badge bg-warning text-dark ms-2" title="Đội trưởng">C</span>}
        {p.position === 'G' && <span className="badge bg-info text-dark ms-1" title="Thủ môn">GK</span>}
    </div>
);

export default function LineupsTab({ data }: { data: MatchData }) {
    return (
        <div className="row g-4 justify-content-center">
            {/* Đội nhà */}
            <div className="col-md-6">
                <div className="card h-100 shadow-sm border-0">
                    <div className="card-header bg-white pt-3 border-bottom-0 text-center">
                        <h5 className="text-primary fw-bold border-bottom pb-2 d-inline-block">
                            Đội nhà <small className="text-muted fw-normal">({data.home_lineup?.formation})</small>
                        </h5>
                    </div>
                    <div className="card-body pt-0">
                        {data.home_lineup?.lineups?.filter((p) => p.first).map((p) => <PlayerRow key={p.id} p={p} />)}
                    </div>
                </div>
            </div>

            {/* Đội khách */}
            <div className="col-md-6">
                <div className="card h-100 shadow-sm border-0">
                    <div className="card-header bg-white pt-3 border-bottom-0 text-center">
                        <h5 className="text-danger fw-bold border-bottom pb-2 d-inline-block">
                            Đội khách <small className="text-muted fw-normal">({data.away_lineup?.formation})</small>
                        </h5>
                    </div>
                    <div className="card-body pt-0">
                        {data.away_lineup?.lineups?.filter((p) => p.first).map((p) => <PlayerRow key={p.id} p={p} />)}
                    </div>
                </div>
            </div>
        </div>
    );
}