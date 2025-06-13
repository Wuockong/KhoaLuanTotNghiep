import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../assets/styles/components/navbar.css';

const role = localStorage.getItem("role");

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("card_id");
    setIsLoggedIn(false);
    setMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="navbar-full">
        <div className="navbar-left">
          <div className="logo">PHUCHWA</div>
        </div>
        <div className="navbar-right">
          {isLoggedIn ? (
            <>
              <span className="bell">🔔 Thông Báo</span>
              <button
                className="account-button"
                onClick={() => setMenuOpen(!menuOpen)}>
                👤 Tài khoản
              </button>
            </>
          ) : (
            <>
              <button
                className="account-button"
                onClick={() => navigate("/register")}>
                Tạo QR
              </button>
              <button className="account-button" onClick={() => navigate("/")}>
                Đăng nhập
              </button>
            </>
          )}
        </div>
      </header>

      {/* Overlay & Dropdown */}
      {menuOpen && <div className="menu-overlay" onClick={closeMenu} />}
      {menuOpen && isLoggedIn && (
        <div className="dropdown-menu right">
          <a href="/dashboard">👤 Thông tin</a>
          {role === "nurses" && (
            <>
              <a href="/testform-nurses">📝 Làm bài test</a>
              <a href="/matching-nurses">🔗 Matching</a>
            </>
          )}
          {role === "mentor" && (
            <>
              <a href="/manage-tests">📋 Quản lý đề thi</a>
            </>
          )}
          <button onClick={handleLogout}>🚪 Đăng xuất</button>
        </div>
      )}
    </>
  );
};

export default Navbar;
