import { useEffect, useState } from 'react';
import styles from './VideoPage.module.css';

export interface VideoItem {
  title: string;
  img: string;
  url: string;       
  videoUrl?: string;   
  timeLabel?: string;
}
export interface VideoData {
  highlights: VideoItem[];
  diemTin: VideoItem[];
  otherVideos: VideoItem[];
}

const VideoCategory = ({ title, items }: { title: string; items: VideoItem[] }) => {
  const [modalVideoUrl, setModalVideoUrl] = useState<string | null>(null);

  if (!items || items.length === 0) return null;

  const handleOpenModal = (url: string | undefined) => {
    if (url && url.includes('youtube.com/watch?v=')) {
      setModalVideoUrl(url);
    }
  };

  const closeModal = () => setModalVideoUrl(null);

  return (
    <section className={styles.category}>
      <h2 className={styles.categoryTitle}>{title}</h2>
      <div className={styles.videoGrid}>
        {items.map((item, index) => (
          <div key={index} className="card">
            <div
              className={styles.thumbnailContainer}
              onClick={() => handleOpenModal(item.videoUrl)}
            >
              <img
                src={item.img}
                alt={item.title}
                className={styles.thumbnail}
                loading="lazy"
              />
              {item.videoUrl?.includes('youtube') && (
                <div className={styles.playOverlay}>
                  <div className={styles.playButton}>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              {item.timeLabel && <p className={styles.timeLabel}>{item.timeLabel}</p>}
            </div>
          </div>
        ))}
      </div>
      {modalVideoUrl && <YouTubeModal videoUrl={modalVideoUrl} onClose={closeModal} />}
    </section>
  );
};
const VideoPage = () => {
  const [data, setData] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi API từ backend (Next.js hoặc bất kỳ server nào)
        const res = await fetch('http://localhost:3000/api/videos'); 

        if (!res.ok) throw new Error('Không thể tải dữ liệu video');

        const result: VideoData = await res.json();
        setData(result);
      } catch (err) {
        setError('Không thể tải video. Vui lòng thử lại sau.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div>
          <div className={styles.spinner}></div>
          <p>Đang tải video...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p className={styles.errorMessage}>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Video Bóng Đá Mới Nhất</h1>      </header>

      {data && (
        <>
          <VideoCategory title="Điểm tin" items={data.diemTin} />
          <VideoCategory title="Video khác" items={data.otherVideos} />
        </>
      )}
    </div>
  );
};
const YouTubeModal = ({ videoUrl, onClose }: { videoUrl: string; onClose: () => void }) => {
  const videoId = new URL(videoUrl).searchParams.get('v');
  if (!videoId) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};
export default VideoPage;