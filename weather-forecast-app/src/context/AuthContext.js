import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const stored = localStorage.getItem("auth");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (token) => {
    const data = { token }; 
    setAuthData(data);
    localStorage.setItem("auth", JSON.stringify(data));
  };

  const logout = () => {
    setAuthData(null);
    localStorage.removeItem("auth");
  };

  const saveCity = (city) => {
    const updated = { ...authData, city };
    setAuthData(updated);
    localStorage.setItem("auth", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout, saveCity }}>
      {children}
    </AuthContext.Provider>
  );
};
