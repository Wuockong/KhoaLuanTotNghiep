import React, { useState } from 'react';
import api from '../services/apiClient';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

function RegisterElderly() {
  const [step, setStep] = useState(1); // Step 1: Email | Step 2: OTP | Step 3: Password | Step 4: Register/ProfileForm
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(null);
  const [otp, setOtp] = useState('');
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const sendOTP = async () => {
    try {
      await api.post('/users/send-verify-email', { email });
      setMessage('✅ OTP đã được gửi đến email!');
      setStep(2);
    } catch (err) {
      setMessage('❌ Gửi OTP thất bại: ' + (err.response?.data?.error || 'Lỗi server'));
    }
  };

  const verifyOTP = async () => {
    try {
      await api.post('/users/verify-account', { email, otp });
      setMessage('✅ Xác thực OTP thành công!');
      setStep(3);
    } catch (err) {
      setMessage('❌ OTP không đúng hoặc hết hạn');
    }
  };

  const registerUser = async () => {
    try {
      const hashed_password = await bcrypt.hash(password, 10);
      const res = await api.post('/users/register', {
        email,
        password: hashed_password,
        role: 'elderly'
      });
      setUserId(res.data.user.user_id);
      setMessage('✅ Đăng ký thành công, mời bạn hoàn tất hồ sơ.');
      localStorage.setItem('user_id', res.data.user.user_id);
      setStep(4);
    } catch (err) {
      setMessage('❌ Đăng ký thất bại: ' + (err.response?.data?.error || 'Lỗi server'));
    }
  };

  if (step === 4) {
    navigate('/profile');
    return null;
  }

  return (
    <div className="container">
      <div className="card-box">
        <h2>Đăng ký Người Dùng (Elderly)</h2>

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button onClick={sendOTP}>Gửi OTP xác thực email</button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Nhập mã OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button onClick={verifyOTP}>Xác thực OTP</button>
          </>
        )}

        {step === 3 && (
          <>
            <input
              type="password"
              placeholder="Tạo mật khẩu"
              value={password || ''}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button onClick={registerUser}>Hoàn tất đăng ký</button>
          </>
        )}

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default RegisterElderly;
