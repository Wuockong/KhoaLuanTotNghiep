// src/components/Navbar.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/components/navbar.css";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="navbar-full">
      <div className="logo">🌸 PhucHwa</div>

      <div className="navbar-right">
        {!user ? (
          <>
            <button onClick={() => navigate("/register-nurse")}>🎟️ Tạo QR</button>
            <button onClick={() => navigate("/loginqr")}>🔑 Đăng nhập</button>
          </>
        ) : (
          <>
            <div className="bell">🔔</div>
            <button className="account-button" onClick={toggleMenu}>
              Tài khoản
            </button>

            {menuOpen && (
              <>
                <div
                  className="menu-overlay"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="menu-dropdown">
                  {/* 🧑 Y tá */}
                  {user.role === "nurse" && (
                    <>
                      <a href="/testform-nurses">📝 Làm bài kiểm tra</a>
                      <a href="/matching-nurses">🔗 Kết nối bệnh nhân</a>
                      <a href="/transaction">💳 Quản lý hợp đồng</a>
                      <a href="/feedback">📩 Gửi phản hồi</a>
                      <a href="/service-log">📋 Nhật ký chăm sóc</a>
                    </>
                  )}

                  {/* 🧓 Người cao tuổi */}
                  {user.role === "elderly" && (
                    <>
                      <a href="/dashboard">📋 Hồ sơ</a>
                    </>
                  )}

                  <button onClick={handleLogout}>🚪 Đăng xuất</button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
