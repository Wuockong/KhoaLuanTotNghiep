import React from 'react';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const cardId = localStorage.getItem('card_id');

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="card-box">
          <h2>🎉 Chào mừng!</h2>
          <p>Đăng nhập thành công với mã thẻ:</p>
          <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{cardId || 'Không tìm thấy card_id'}</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;