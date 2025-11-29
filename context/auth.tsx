"use client";
import React, { ReactNode, useContext, useEffect, useState } from "react";

import apiFetch from "@/lib/apiClient";

// 型定義
interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  currentUser: null | {
    id: number;
    email: string;
    username: string;
  };
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType>({
  currentUser: null,
  login: () => {},
  logout: () => {},
});

// カスタムフック
export const useAuth = () => {
  return useContext(AuthContext);
};

// プロバイダーコンポーネント
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<null | {
    id: number;
    email: string;
    username: string;
  }>(null);

  // ----------- ユーザー情報取得関数 -----------
  const fetchUserWithToken = async (token: string) => {
    try {
      const currentUserData = await apiFetch("/users/me", {
        method: "GET",
        headers: {
          "X-JWT-Authorization": `Bearer ${token}`,
        },
      });
      setCurrentUser(currentUserData.user);
    } catch (error) {
      console.error(error);
    }
  };

  // ----------- 初回読み込み時：token があればユーザー取得 -----------
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;
    fetchUserWithToken(token);
  }, []);

  // ----------- login：token を保存してユーザー情報を取得 -----------
  const login = async (token: string) => {
    localStorage.setItem("auth_token", token);
    await fetchUserWithToken(token);
  };

  // ----------- logout：token 削除 -----------
  const logout = () => {
    localStorage.removeItem("auth_token");
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
