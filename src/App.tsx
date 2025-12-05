
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout'; // hoặc đường dẫn đúng đến layout của bạn
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Trang chủ */}
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        {/* Các trang khác sẽ thêm sau: /matches, /news, /standings... */}
      </Routes>
    </Router>
  );
}