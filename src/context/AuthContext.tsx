import React, { useState } from "react";
import type { User } from "@/types/auth";
import { AuthContext } from "./AuthContextType";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize state from localStorage
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
