import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../assets/styles/components/navbar.css";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
  try {
    await logout(); // gọi API POST /users/logout
  } catch (error) {
    console.error("Logout failed:", error.message);
  }

  // Xóa toàn bộ thông tin người dùng local
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
  localStorage.removeItem("role");

  setMenuOpen(false);
  navigate("/login-elderly");
};  

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const isLoginElderly = location.pathname === "/login-elderly";
  const isRegisterElderly = location.pathname === "/register-elderly";

  return (
    <header className="navbar-full">
      <div className="logo">🌸 PhucHwa</div>

      <div className="navbar-right">
        {!user && !isLoginElderly && !isRegisterElderly ? (
          <>
            <button onClick={() => navigate("/register-elderly")}>📝 Đăng ký</button>
            <button onClick={() => navigate("/login-elderly")}>🔑 Đăng nhập</button>
          </>
        ) : user && (
          <>
            <div className="bell">🔔</div>
            <button className="account-button" onClick={toggleMenu}>Tài khoản</button>
            {menuOpen && (
              <div className="account-menu">
                <button onClick={() => navigate("/account-elderly")}>👤 Thông tin tài khoản</button>
                <button onClick={() => navigate("/dashboard")}>🏠 Home</button>
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
