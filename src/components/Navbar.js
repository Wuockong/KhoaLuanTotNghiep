import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/components/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const r = localStorage.getItem("role");
    if (token) {
      setIsLoggedIn(true);
      setRole(r);
    } else {
      setIsLoggedIn(false);
      setRole("");
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setMenuOpen(false);
    navigate("/");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="navbar-full">
      <div className="logo">🌸 PhucHwa</div>

      <div className="navbar-right">
        {!isLoggedIn ? (
          <>
            <button onClick={() => navigate("/create-card")}>🎟️ Tạo QR</button>
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/loginqr");
              }}>
              🔑 Đăng nhập
            </button>
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
                <div className="dropdown-menu">
                  <a href="/dashboard">🏠 Trang chủ</a>

                  {role === "nurses" && (
                    <>
                      <a href="/testform-nurses">📝 Làm bài kiểm tra</a>
                      <a href="/matching-nurses">🔗 Kết nối bệnh nhân</a>
                      <a href="/transaction">💳 Quản lý hợp đồng</a>
                      <a href="/feedback">📩 Gửi phản hồi</a>
                      <a href="/service-log">📋 Nhật ký chăm sóc</a>
                    </>
                  )}

                  {role === "mentor" && (
                    <>
                      <a href="/manage-tests">📋 Quản lý đề kiểm tra</a>
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
