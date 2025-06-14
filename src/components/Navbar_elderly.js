import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/components/navbar.css';
import { useAuth } from '../contexts/AuthContext'; // 👈 sử dụng context

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // 👈 lấy thông tin user và hàm logout

  const handleLogout = () => {
    logout();          // 👈 gọi hàm logout từ context
    localStorage.removeItem('token'); // cũng xóa token nếu cần
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">PHUCHWA</Link>
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <Link to="/account" className="nav-link">Tài khoản</Link>
            <button onClick={handleLogout} className="nav-link">Đăng xuất</button>
          </>
        ) : (
          <>
            <Link to="/register" className="nav-link">Đăng ký</Link>
            <Link to="/login" className="nav-link">Đăng nhập</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
