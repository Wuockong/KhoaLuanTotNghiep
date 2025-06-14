import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="card-box">
        <h2>🎉 Chào mừng bạn đến với Dashboard!</h2>
        <p>Chức năng đang được phát triển...</p>
        <button onClick={handleLogout}>Đăng xuất</button>
      </div>
    </div>
  );
}

export default Dashboard;