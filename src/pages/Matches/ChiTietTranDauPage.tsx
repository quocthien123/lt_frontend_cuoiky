"use client";
import { useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';

export default function MatchDetailPage() {
  const searchParams = useSearchParams();
  const matchUrl = searchParams.get('url'); 
  const [detail, setDetail] = useState<any>(null);

  useEffect(() => {
    if (!matchUrl) return;

    const fetchDetail = async () => {
       try {
         const res = await fetch(`/api/match-detail?url=${matchUrl}`);
         const data = await res.json();
         if (data.success) setDetail(data.data);
       } catch (e) {
         console.error(e);
       }
    };

    fetchDetail();
  }, [matchUrl]);

  if (!detail) return <div>Đang tải...</div>;

  return (
    <div>
       <div className="timeline">
          <h3>Diễn biến</h3>
         
          {detail.events?.map((e: any, i: number) => (
             <div key={i}>Phút {e.minute}: {e.player} ({e.type})</div>
          ))}
       </div>

       <div className="history">
          <h3>Lịch sử đối đầu</h3>
         
           {detail.history?.map((h: any, i: number) => (
              <div key={i}>{h.home} {h.score} {h.away} ({h.date})</div>
           ))}
       </div>
    </div>
  );
}