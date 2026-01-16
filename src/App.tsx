// App.tsx
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import NewPage from "./pages/News/NewsPage";
import { RegisterPage } from "@/pages/Auth/Register/RegisterPage.tsx";
import { LoginPage } from "@/pages/Auth/Login/LoginPage.tsx";
import { AuthProvider } from "@/context/AuthContext.tsx";
import { Toaster } from "react-hot-toast";
// Import Layout & Pages

import MatchDetailPage from "./pages/MatchDetail";
import FavoritesPage from "./pages/Favorites/FavoritesPage";
import RecentlyViewedPage from "./pages/RecentlyViewed/RecentlyViewedPage";
import VideoPage from "./pages/videos/VideoPages";
import News from "./components/tinmoi/tinmoi";


export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <Router>
        <MainLayout>
          <Routes>
            {/* Trang chủ */}
            <Route path="/" element={<HomePage />} />

            {/* Đăng ký & Đăng nhập */}
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />


            {/* Trang chứa các bài báo yêu thích */}
            <Route path="/favorites" element={<FavoritesPage />} />

            {/* Trang lịch sử đọc */}
            <Route path="/recently-viewed" element={<RecentlyViewedPage />} />

            {/* Chi tiết trận đấu */}
            <Route path="/match/:id" element={<MatchDetailPage />} />

            {/* Trang danh mục */}
            <Route path="/danh-muc/:slug" element={<CategoryPage />} />

            {/* Trang chi tiết tin tức */}
            <Route path="/:category/:slug" element={<NewPage />} />


            {/* trang hiển thị videos */}
            <Route path="/danh-muc/video" element={<VideoPage />} />

        <Route path="/tin-moi" element={<News />} />
        <Route path="/:category/:slug" element={<CategoryPage />} />
         
          </Routes>
        </MainLayout>
      </Router>
    </AuthProvider>
  );
}
