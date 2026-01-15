// src/pages/Matches/MatchDetail/index.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { MatchData } from './types';

// Import CSS
import './bootstrap.scss';

// Import các component con
import HeaderScore from './score';
import LineupsTab from './lineups';
import EventsTab from './event';
import H2HTab from './h2h';

export default function MatchDetailPage() {
    const { id } = useParams();
    const decodedId = decodeURIComponent(id || "");
    
    const [data, setData] = useState<MatchData | null>(null);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState<'lineups' | 'events' | 'h2h'>('lineups');

    useEffect(() => {
        fetch(`http://localhost:3000/api/match-detail?id=${decodedId}`)
            .then(res => res.json())
            .then(result => {
                if (result.success) setData(result.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, [decodedId]);

    if (loading) return (
        <div className="bs-scope d-flex justify-content-center align-items-center" style={{minHeight: '300px'}}>
            <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
        </div>
    );
    
    if (!data) return <div className="bs-scope text-center p-5 text-danger fw-bold">Không tìm thấy dữ liệu trận đấu.</div>;

    return (
        <div className="bs-scope" style={{backgroundColor: '#f8f9fa', minHeight: '100vh'}}>
            <div className="container py-4" style={{ maxWidth: 900 }}>
                
                <HeaderScore data={data} />

                {/* Thanh Tabs */}
                <ul className="nav nav-pills nav-fill mb-4 bg-white p-2 rounded shadow-sm">
                    {[
                        { id: 'lineups', label: 'Đội hình' },
                        { id: 'events', label: 'Diễn biến' },
                        { id: 'h2h', label: 'Đối đầu' }
                    ].map((item) => (
                        <li className="nav-item" key={item.id}>
                            <button 
                                className={`nav-link fw-bold ${tab === item.id ? 'active' : 'text-secondary'}`}
                                onClick={() => setTab(item.id as any)}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Nội dung Tab */}
                <div className="tab-content">
                    {tab === 'lineups' && <LineupsTab data={data} />}
                    {tab === 'events' && <EventsTab data={data} />}
                    {tab === 'h2h' && <H2HTab data={data} />}
                </div>
            </div>
        </div>
    );
}