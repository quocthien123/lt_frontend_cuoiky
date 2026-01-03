import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';

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

  useEffect(() => {
    if (!category || !slug) return;

    setLoading(true);
    setError(null);

    fetch(`http://localhost:3000/api/get-new-description?category=${category}&slug=${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('Lỗi mạng hoặc server');
        return res.json();
      })
      .then((result) => {
        if (result.success && result.data) {
          // Giả sử API trả { summary, content, relatedArticles }
          setArticle(result.data);
          console.log(result.data)
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

  if (loading) return <div>Đang tải bài viết...</div>;
  if (error) return <div>Lỗi: {error}</div>;
  if (!article) return <div>Không tìm thấy bài viết.</div>;

  return (
    <div>
              <MainLayout>
                      
                 
        <h1> {article.title}</h1>

<article className="news-article" style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      {/* Tóm tắt — hiển thị đầu tiên, in đậm */}
      {article.summary && (
        <div className="summary" style={{ marginBottom: '1.5rem' }}>
          <b>{article.summary}</b>
        </div>
      )}

      {/* Nội dung chính — theo thứ tự */}
      <div className="article-content">
        {article.contentBlocks.map((block, index) => {
          if (block.type === 'text') {
            return (
              <p key={index} style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
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
                key={ index }
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
       </MainLayout>
    </div>

    
  );
}

export default CategoryPage;