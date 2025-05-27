import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="project-name">PHUCHWA</span>
      </div>
      <div className="navbar-right">
        <Link to="/" className="nav-link">Tạo QR</Link>
        <Link to="/login" className="nav-link">Đăng nhập</Link>
      </div>
    </nav>
  );
}

export default Navbar;
