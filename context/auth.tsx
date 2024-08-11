import React, { ReactNode, useContext, useEffect, useState } from "react";

import apiClient from "@/lib/apiClient";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  user: null | {
    id: number;
    email: string;
    username: string;
  };
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<null | {
    id: number;
    email: string;
    username: string;
  }>(null);

  // add request headers
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;

      apiClient
        .get("/users/find")
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  // set token
  const login = async (token: string) => {
    localStorage.setItem("auth_token", token);
    apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;

    try {
      apiClient.get("/users/find").then((res) => {
        setUser(res.data.user);
      });
    } catch (error) {
      console.error(error);
    }
  };

  // remove token
  const logout = () => {
    localStorage.removeItem("auth_token");
    delete apiClient.defaults.headers["Authorization"];
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
