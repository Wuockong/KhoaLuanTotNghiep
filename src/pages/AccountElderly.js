// src/pages/AccountElderly.js
import React, { useEffect, useState } from 'react';
import axiosClient from '../services/axiosClient';
import '../assets/styles/base/common.css';

function AccountElderly() {
  const [accountInfo, setAccountInfo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log("📦 Token lấy từ localStorage:", token);
        if (!token) {
          setError('❌ Bạn chưa đăng nhập.');
          return;
        }

        const res = await axiosClient.get('/users/account', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("🧪 Raw API response:", res.data);

        // Nếu API trả về chuỗi thuần, cần parse nếu cần
        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
        setAccountInfo(data.data);
      } catch (err) {
        console.error('❌ Không thể lấy thông tin tài khoản.', err);
        setError('❌ Không thể lấy thông tin tài khoản. Hãy chắc chắn bạn đã đăng nhập và token còn hiệu lực.');
      }
    };

    fetchAccount();
  }, []);

  return (
    <div className="container">
      <h2>👤 Thông tin tài khoản</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {accountInfo && (
        <div className="card-box">
          <p><strong>Email:</strong> {accountInfo.email}</p>
          <p><strong>Vai trò:</strong> {accountInfo.role === 'elderly' ? 'Người cao tuổi' : accountInfo.role}</p>
          <p><strong>User ID:</strong> {accountInfo.user_id}</p>
        </div>
      )}
    </div>
  );
}

export default AccountElderly;
