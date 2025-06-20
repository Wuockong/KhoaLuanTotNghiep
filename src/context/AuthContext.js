import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Khi load lại trang, lấy user_id từ localStorage
    const userId = localStorage.getItem('user_id');
    if (userId) setUser({ user_id: userId });
  }, []);

  const login = (userData) => {
    localStorage.setItem('user_id', userData.user_id);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user_id');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
