// contexts/AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user = { user_id, role, ... }

  const login = (userData) => {
    setUser(userData); // userData phải chứa role: 'elderly' hoặc 'nurse'
  };

  const logout = () => {
  localStorage.clear();
  setUser(null);
};
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
