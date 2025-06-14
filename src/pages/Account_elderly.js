import React, { useEffect, useState } from 'react';
import api from '../api'; // ✅ Đúng instance có baseURL
import '../styles/base/common.css';

function Account() {
  const [accountInfo, setAccountInfo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('❌ Bạn chưa đăng nhập.');
          return;
        }

        const res = await api.get('/users/account', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setAccountInfo(res.data);
      } catch (err) {
        console.error('❌ Không thể lấy thông tin tài khoản.', err);
        setError('❌ Không thể lấy thông tin tài khoản.');
      }
    };

    fetchAccount();
  }, []);

  return (
    <div className="container">
      <h2>Thông tin tài khoản</h2>
      {error && <p>{error}</p>}
      {accountInfo && (
        <div className="card-box">
          <p><strong>Email:</strong> {accountInfo.email}</p>
          <p><strong>Họ tên:</strong> {accountInfo.fullName}</p>
          {/* Thêm các thông tin khác nếu có */}
        </div>
      )}
    </div>
  );
}

export default Account;
