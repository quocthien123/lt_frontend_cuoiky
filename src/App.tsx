// App.tsx
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Import Layout & Pages
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
// import CategoryPage from './pages/CategoryPage';
import NewPage from './pages/News/NewsPage';
import MatchDetailPage from './pages/MatchDetail'
import ArticleDetail from './components/layout/ArticleDetail';
import CategoryPage from './components/layout/categorypage';




export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          {/* 1. Trang chủ */}
          <Route path="/" element={<HomePage />} />

          {/* Lịch thi đấu của đội bóng */}
          <Route path="/match/:id" element={<MatchDetailPage />} />

          {/* 3. Trang danh mục */}
          {/* <Route path="/danh-muc/:slug" element={<CategoryPage />} /> */}
          <Route path="/danh-muc/*" element={<CategoryPage />} />
          <Route path="/bai-viet/*" element={<ArticleDetail />} />

          {/* 4. Trang chi tiết tin tức */}
          <Route path="/:category/:slug" element={<NewPage />} />
          
        </Routes>
      </MainLayout>
    </Router>
  );
}