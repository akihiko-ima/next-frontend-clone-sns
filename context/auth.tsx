"use client";
import React, { ReactNode, useContext, useState } from "react";

interface User {
  id: number;
  email: string;
  username: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
}

const AuthContext = React.createContext<AuthContextType>({
  currentUser: null,
  login: async () => { },
  logout: async () => { },
  setUser: () => { },
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
  initialUser: User | null;
}

export const AuthProvider = ({ children, initialUser }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(initialUser);

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("ログインに失敗しました");
    const { user } = await res.json();
    setCurrentUser(user);
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setCurrentUser(null);
  };

  const setUser = (user: User) => {
    setCurrentUser(user);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
