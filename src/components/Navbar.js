import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/components/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (token) {
      setIsLoggedIn(true);
      setRole(storedRole);
    } else {
      setIsLoggedIn(false);
      setRole("");
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setRole("");
    navigate("/");
  };

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <>
      <div className="navbar-full">
        <div className="logo">🌸 PhucHwa</div>

        {isLoggedIn && (
          <div className="navbar-right">
            <div className="bell" onClick={toggleMenu} style={{ cursor: "pointer" }}>
              📋 Menu
            </div>
            <button onClick={handleLogout} className="account-button">
              🚪 Đăng xuất
            </button>
          </div>
        )}
      </div>

      {showMenu && (
        <>
          <div className="menu-overlay" onClick={toggleMenu}></div>
          <div className="dropdown-menu">
            <a href="/dashboard">🏠 Trang chủ</a>

            {role === "nurses" && (
              <>
                <a href="/testform-nurses">📝 Làm bài kiểm tra</a>
                <a href="/matching-nurses">🔗 Kết nối bệnh nhân</a>
                <a href="/transaction">💳 Quản lý hợp đồng</a>
                <a href="/feedback">📝 Gửi phản hồi</a>
                <a href="/service-log">📋 Nhật ký chăm sóc</a>
              </>
            )}

            {role === "mentor" && (
              <>
                <a href="/manage-tests">📋 Quản lý đề kiểm tra</a>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;
