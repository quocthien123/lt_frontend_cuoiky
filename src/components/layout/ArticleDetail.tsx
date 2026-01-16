import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ArticleDetail() {
  const { '*': slug } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // console.log("Slug gửi đi:", slug);
    fetch(`http://localhost:3000/api/scrape-article?slug=${slug}`)
      .then(res => res.json())
      .then(res => {
        // console.log("Dữ liệu nhận về:", res); 
        if (res.success && res.data) {
          setArticle(res.data);
        } else {
          setError(true);
        }
      })
      .catch(err => {
        console.error("Lỗi Fetch:", err);
        setError(true);
      });
  }, [slug]);

  if (error) return (
    <div className="container mt-5 text-center">
      <h3 className="text-danger">Không tìm thấy nội dung bài báo này!</h3>
      <Link to="/" className="btn btn-primary mt-3">Quay về trang chủ</Link>
    </div>
  );

  if (!article) return (
    <div className="d-flex justify-content-center my-5">
      <div className="spinner-border text-danger" role="status"></div>
    </div>
  );

  return (
    <div className="container mt-4 mb-5" style={{ maxWidth: '850px' }}>
      <h1 className="fw-bold mb-4" style={{ color: '#222', lineHeight: '1.3' }}>
        {article.title}
      </h1>
      
      <p className="lead fw-bold text-secondary mb-4 p-3 bg-light border-start border-danger border-4">
        {article.sapo}
      </p>
      <style>{`
        .article-content img { 
          max-width: 100% !important; 
          height: auto !important; 
          border-radius: 8px;
          margin: 15px 0;
        }
        .article-content p {
          line-height: 1.8;
          margin-bottom: 20px;
          font-size: 18px;
        }
      `}</style>

      <div 
        className="article-content"
        dangerouslySetInnerHTML={{ __html: article.content }} 
      />
    </div>
  );
}