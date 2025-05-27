import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('card_id');
    setIsLoggedIn(false);
    setMenuOpen(false);
    navigate('/');
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
              <button className="account-button" onClick={() => setMenuOpen(!menuOpen)}>👤 Tài khoản</button>
            </>
          ) : (
            <>
              <button className="account-button" onClick={() => navigate('/register')}>Tạo QR</button>
              <button className="account-button" onClick={() => navigate('/')}>Đăng nhập</button>
            </>
          )}
        </div>
      </header>

      {/* Overlay & Dropdown */}
      {menuOpen && <div className="menu-overlay" onClick={closeMenu} />}
      {menuOpen && isLoggedIn && (
        <div className="dropdown-menu right">
          <a href="#">👤 Thông tin cá nhân</a>
          <a href="#">🎵 Trình độ</a>
          <a href="#">🎵 Elite</a>
          <a href="#">🏆 Phần thưởng</a>
          <a href="#">🏆 Danh vọng</a>
          <a href="#">📚 Tài liệu học</a>
          <a href="#">🧠 Từ vựng</a>
          <a href="#">📝 Luyện tập</a>
          <a href="#">💳 Thanh toán</a>
          <button onClick={handleLogout}>🚪 Đăng xuất</button>
        </div>
      )}
    </>
  );
};

export default Navbar;
