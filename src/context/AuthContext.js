import React, { createContext, useContext, useState, useEffect } from "react";
import AuthService from "../service/AuthService"; // AuthService import 변경

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      AuthService.validateToken(token)
        .then((response) => {
          if (response.data) {
            setUser(response.data);
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
        });
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.jwt);
    localStorage.setItem("userId", userData.id);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
