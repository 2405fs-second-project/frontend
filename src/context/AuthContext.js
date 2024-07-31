import React, { createContext, useContext, useState, useEffect } from "react";
import AuthService from "../service/AuthService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user"));
    if (token && userData) {
      AuthService.validateToken(token)
        .then((response) => {
          if (response.valid) {
            setUser(userData);
          } else {
            AuthService.logout();
          }
        })
        .catch(() => {
          AuthService.logout();
        });
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.jwt);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    AuthService.logout();
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
