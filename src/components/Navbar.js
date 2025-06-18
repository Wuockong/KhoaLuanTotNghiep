// src/components/Navbar.js
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../assets/styles/components/navbar.css";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const isLoginElderly = location.pathname === "/login-elderly";
  const isRegisterElderly = location.pathname === "/login-elderly";

  return (
    <header className="navbar-full">
      <div className="logo">🌸 PhucHwa</div>

      <div className="navbar-right">
        {!user && !isLoginElderly && !isRegisterElderly ? (
          <>
            <button onClick={() => navigate("/register-nurse")}>🎟️ Tạo QR</button>
            <button onClick={() => navigate("/login-nurse")}>🔑 Đăng nhập</button>
          </>
        ) : user && (
          <>
            <div className="bell">🔔</div>
            <button className="account-button" onClick={toggleMenu}>Tài khoản</button>
            {menuOpen && (
              <div className="account-menu">
                <button onClick={handleLogout}>🚪 Đăng xuất</button>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
