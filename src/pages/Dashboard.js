import React from 'react';

const Dashboard = () => {
  const cardId = localStorage.getItem('card_id');
  if (!cardId) return null;

  return (
    <div className="container">
      <div className="card-box">
        <h2>🎉 Chào mừng!</h2>
        <p>Đăng nhập thành công với mã thẻ:</p>
        <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{cardId}</p>
      </div>
    </div>
  );
};

export default Dashboard;
