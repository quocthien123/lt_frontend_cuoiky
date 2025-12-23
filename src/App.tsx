import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path="/danh-muc/:slug"
          element={
            <CategoryPage/>
          }
        />
        {/* Additional routes: /matches, /news, /standings... will be added later */}
      </Routes>
    </Router>
  );
}