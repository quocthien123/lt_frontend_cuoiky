// src/pages/Matches/MatchDetail/EventsTab.tsx
import type { MatchData } from './types';

const getEventText = (type: number) => {
    switch (type) {
        case 1: return { text: "Bàn thắng", icon: <i className="fa-solid fa-futbol"></i>, bg: "list-group-item-success" };
        case 2: return { text: "Thẻ đỏ", icon: <i className="fa-solid fa-square text-danger"></i>, bg: "list-group-item-danger" };
        case 3: return { text: "Thẻ vàng", icon: <i className="fa-solid fa-square text-warning"></i>, bg: "list-group-item-warning" };
        case 9: return { text: "Thay người", icon: <i className="fa-solid fa-rotate"></i>, bg: "bg-light" };
        case 11: return { text: "Hết hiệp 1", icon: <i className="fa-regular fa-clock"></i>, bg: "list-group-item-secondary" };
        case 12: return { text: "Kết thúc", icon: <i className="fa-solid fa-flag-checkered"></i>, bg: "bg-dark text-white" };
        default: return { text: "Sự kiện", icon: <i className="fa-solid fa-circle-info"></i>, bg: "bg-light" };
    }
};

export default function EventsTab({ data }: { data: MatchData }) {
    const timelines = data.timelines || [];
    if (timelines.length === 0) return <div className="text-center text-muted py-5 card shadow-sm border-0">Chưa có diễn biến.</div>;

    return (
        <div className="card border-0 shadow-sm">
            <div className="card-header bg-white text-center fw-bold py-3">Diễn biến trận đấu</div>
            <ul className="list-group list-group-flush">
                {timelines.map((ev, idx) => {
                    const info = getEventText(ev.type);
                    return (
                        <li key={idx} className={`list-group-item d-flex align-items-center justify-content-center py-3 ${info.bg}`}>
                            <div className="d-flex align-items-center" style={{maxWidth: '600px', width: '100%'}}>
                                <div className="fw-bold text-secondary me-4 text-center" style={{minWidth: '40px'}}>{ev.time}'</div>
                                <div className="flex-grow-1">
                                    <span className="fw-bold me-2">{info.icon} {info.text}</span>
                                    {ev.player_name && <span className="fw-medium">: {ev.player_name}</span>}
                                    {ev.home_score !== undefined && (
                                        <span className="ms-2 badge bg-danger rounded-pill">{ev.home_score} - {ev.away_score}</span>
                                    )}
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}