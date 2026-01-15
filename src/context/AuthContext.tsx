import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextType {
    user: any;
    login: (userData: any) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);

    // Kiểm tra ngay khi vừa mở web
    useEffect(() => {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) setUser(JSON.parse(savedUser));
    }, []);

    const login = (userData: any) => {
        setUser(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
        window.location.href = '/login'; // Đuổi về trang login khi thoát
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};