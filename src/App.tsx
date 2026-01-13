import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import NewPage from './pages/News/NewsPage'
import {RegisterPage} from "@/pages/Auth/Register/RegisterPage.tsx";
import {LoginPage} from "@/pages/Auth/Login/LoginPage.tsx";
import {AuthProvider} from "@/context/AuthContext.tsx";

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <MainLayout>
                                <HomePage/>
                            </MainLayout>
                        }
                    />
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>

                    <Route
                        path="/danh-muc/:slug"
                        element={
                            <CategoryPage/>
                        }


                    />
                    <Route path="/:category/:slug" element={<NewPage/>}/>

                    {/* Additional routes: /matches, /news, /standings... will be added later */}
                </Routes>
            </Router>
        </AuthProvider>
    );
}