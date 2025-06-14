import React, { useState } from 'react';
import '../styles/base/buttons.css';
import api from '../api'; //Sử dụng instance thay vì axios trực tiếp
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


function Register() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();


  const handleSendOTP = async () => {
    try {
      await api.post('/users/send-verify-email', { email });
      setStep(2);
      setMessage('✅ Mã OTP đã được gửi, vui lòng kiểm tra email.');
    } catch {
      setMessage('❌ Gửi mã OTP thất bại.');
    }
  };

  const handleVerifyOTP = async () => {
    try {
      await api.post('/users/verify-account', { email, otp });
      setStep(3);
      setMessage('✅ Xác thực thành công. Hãy đặt mật khẩu để hoàn tất.');
    } catch {
      setMessage('❌ Mã OTP không hợp lệ.');
    }
  };

  const handleRegister = async () => {
  try {
    const res = await api.post('/users/register', { email, password });

    console.log('🎯 Server trả về:', res.data); // 👉 XEM DỮ LIỆU THỰC SỰ

    const userId = res.data.user?.user_id;
    if (!userId) {
      setMessage('❌ Không nhận được user_id từ server.');
      return;
    }

    login({ user_id: userId }); // 👈 Cập nhật trạng thái đăng nhập
    setMessage('✅ Đăng ký thành công!');
    navigate('/profile');
  } catch (err) {
    setMessage('❌ Đăng ký thất bại. Có thể email đã tồn tại.');
  }
};



  return (
    <div className="container">
      <div className="card-box">
        <h2>Đăng ký tài khoản</h2>

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Nhập email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSendOTP}>Gửi mã OTP</button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Nhập mã OTP..."
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={handleVerifyOTP}>Xác thực OTP</button>
          </>
        )}

        {step === 3 && (
          <>
            <input
              type="password"
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Đăng ký</button>
          </>
        )}

        {message && <p style={{ marginTop: '1rem', color: message.includes('✅') ? 'green' : 'red' }}>{message}</p>}
      </div>
    </div>
  );
}

export default Register;
