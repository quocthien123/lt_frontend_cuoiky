import { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './NewPage.module.css';

interface ContentBlock {
  type: 'text' | 'image' | 'caption';
  content: string;
}

interface ArticleResponse {
  title: string;
  summary: string;
  contentBlocks: ContentBlock[];
  relatedArticles: Array<{ title: string; url: string }>;
}

function CategoryPage() {
  const { category, slug } = useParams<{ category?: string; slug?: string }>();
  const [article, setArticle] = useState<ArticleResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!category || !slug) return;

    setLoading(true);
    setError(null);
    stopSpeaking();

    fetch(`http://localhost:3000/api/get-new-description?category=${category}&slug=${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('Lỗi mạng hoặc server');
        return res.json();
      })
      .then((result) => {
        if (result.success && result.data) {
          setArticle(result.data);
        } else {
          throw new Error(result.message || 'Không lấy được dữ liệu');
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category, slug]);

  
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const handleToggleSpeech = () => {
    if (!article) return;

    const synth = window.speechSynthesis;


    if (isSpeaking) {
      stopSpeaking();
      return;
    }


    const fullText = [
      article.title, 
      article.summary, 
      ...article.contentBlocks
          .filter(b => b.type === 'text')
          .map(b => b.content)
    ].join('. '); 

    const utterance = new SpeechSynthesisUtterance(fullText);
    

    utterance.lang = 'vi-VN';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.voice

    utterance.onend = () => {
      setIsSpeaking(false);
    };


    utterance.onerror = (event) => {
      console.error('Speech error:', event);
      setIsSpeaking(false);
    };

    synthesisRef.current = utterance;
    synth.speak(utterance);
    setIsSpeaking(true);
  };


  if (loading) return <div>Đang tải bài viết...</div>;
  if (error) return <div>Lỗi: {error}</div>;
  if (!article) return <div>Không tìm thấy bài viết.</div>;

  return (
    <div>
        
        {/* Tiêu đề bài viết */}
        <h1 className={styles.title}>{article.title}</h1>

        {/* --- 3. Giao diện Nút Báo Nói --- */}
        <div className={styles.speak_news}>
          <button
            onClick={handleToggleSpeech}
            style={{
              padding: '10px 20px',
              backgroundColor: isSpeaking ? '#e74c3c' : '#2ecc71',
              borderRadius: '15px',
              cursor: 'pointer',
            }}
          >
            {isSpeaking ? (
              <>
                <span>⏹</span> Dừng đọc
              </>
            ) : (
              <>
                <span>🔊</span> Nghe báo nói
              </>
            )}
          </button>
        </div>

        <article className={styles.news_article} >
          {article.summary && (
            <div className={styles.summary}>
              <b>{article.summary}</b>
            </div>
          )}

  
          <div className={styles.article_content}>
            {article.contentBlocks.map((block, index) => {
              if (block.type === 'text') {
                return (
                  <p key={index} className={styles.lines}>
                    {block.content}
                  </p>
                );
              }

              if (block.type === 'image') {
                return (
                  <div key={index} style={{ textAlign: 'center', margin: '1.5rem 0' }}>
                    <img
                      src={block.content}
                      alt={`Hình minh họa ${index}`}
                      style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }}
                    />
                  </div>
                );
              }

              if (block.type === 'caption') {
                return (
                  <p
                    key={index}
                    style={{
                      textAlign: 'center',
                      fontSize: '0.9rem',
                      color: '#666',
                      fontStyle: 'italic',
                      marginTop: '-0.5rem',
                      marginBottom: '1.5rem',
                    }}
                  >
                    {block.content}
                  </p>
                );
              }
              return null;
            })}
          </div>

          {/* Tin liên quan */}
          {article.relatedArticles && article.relatedArticles.length > 0 && (
            <section className="related-articles" style={{ marginTop: '2rem', borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Tin liên quan</h3>
              <ul style={{ paddingLeft: '1.2rem' }}>
                {article.relatedArticles.map((rel, i) => (
                  <li key={i} style={{ marginBottom: '0.5rem' }}>
                    <Link
                      to={rel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#0066cc', textDecoration: 'none' }}
                    >
                      {rel.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>

    </div>
  );
}

export default CategoryPage;