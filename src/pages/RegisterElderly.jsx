import React, { useState, useEffect } from 'react';
import api from '../services/apiClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import "../assets/styles/pages/register-elderly.css";

function RegisterElderly() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [studentIdNumber, setStudentIdNumber] = useState('');
  const [isNurse, setIsNurse] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(300);
  const { login } = useAuth();

  useEffect(() => {
    if (step === 2 && countdown > 0) {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [step, countdown]);

  const handleRegister = async () => {
    try {
      await api.post('/users/register', {
        email,
        password,
        role: isNurse ? 'nurse' : 'elderly',
        student_id: isNurse ? 'STU' + studentIdNumber.trim() : undefined
      });

      localStorage.setItem('raw_password', password);
      localStorage.setItem('raw_email', email);
      if (isNurse) {
        localStorage.setItem('raw_student_id', 'STU' + studentIdNumber.trim());
      }

      setMessage('✅ Đăng ký thành công! Đang gửi OTP...');
      await handleSendOTP();
    } catch (err) {
      setMessage('❌ Đăng ký thất bại: ' + (err.response?.data?.message || 'Lỗi server'));
    }
  };

  const handleSendOTP = async () => {
    try {
      await api.post('/users/send-verify-email', { email });
      setMessage('✅ OTP đã gửi đến email. Vui lòng nhập mã.');
      setStep(2);
      setCountdown(300);
    } catch (err) {
      setMessage('❌ Gửi OTP thất bại: ' + (err.response?.data?.message || 'Lỗi server'));
    }
  };

  const handleVerifyOTP = async () => {
    try {
      await api.post('/users/verify-account', { email, otp });
      setMessage('✅ Xác thực thành công! Đang đăng nhập...');

      const rawPassword = localStorage.getItem('raw_password');
      const rawEmail = localStorage.getItem('raw_email');
      const rawStudentId = localStorage.getItem('raw_student_id');
      if (!rawPassword || !rawEmail) {
        setMessage('❌ Không tìm thấy email hoặc mật khẩu gốc để đăng nhập.');
        return;
      }

      try {
        const loginRes = await api.post('/users/login', { email: rawEmail, password: rawPassword });
        const { access_token, user } = loginRes.data.data;
        localStorage.setItem('user_id', user.user_id);
        localStorage.setItem('role', user.role);
        localStorage.setItem('token', access_token);

        if (rawStudentId) {
          localStorage.setItem('student_id', rawStudentId); 
          localStorage.removeItem('raw_student_id');        
        }

        localStorage.removeItem('raw_password');
        localStorage.removeItem('raw_email');
        login({ user_id: user.user_id, role: user.role });

        setTimeout(() => {
          if (user.role === 'nurse') {
            navigate('/nurse');
          } else {
            navigate('/profile-elderly');
          }
        }, 1000);
      } catch (loginErr) {
        setMessage('❌ Đăng nhập thất bại: ' + (loginErr.response?.data?.message || 'Lỗi xác thực'));
        console.error('❌ Lỗi đăng nhập:', loginErr);
      }
    } catch (err) {
      setMessage('❌ Xác thực thất bại: ' + (err.response?.data?.message || 'Lỗi server'));
    }
  };

  return (
    <div className="container">
      <div className="card-box">
        <h2>📝 Đăng ký</h2>

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {isNurse && (
              <input
                type="number"
                placeholder="Mã số STU (chỉ nhập số)"
                value={studentIdNumber}
                onChange={(e) => setStudentIdNumber(e.target.value)}
                required
              />
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={isNurse}
                  onChange={() => setIsNurse(!isNurse)}
                  style={{ marginRight: '5px' }}
                />
                Bạn là y tá?
              </label>
            </div>

            <button onClick={handleRegister}>Đăng ký</button>
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

            <p>
              {countdown > 0
                ? `⏳ Mã OTP sẽ hết hạn sau: ${Math.floor(countdown / 60)
                    .toString()
                    .padStart(2, '0')}:${(countdown % 60).toString().padStart(2, '0')}`
                : '❌ Mã OTP đã hết hạn. Vui lòng gửi lại mã mới.'}
            </p>

            {countdown > 0 && (
              <button onClick={handleVerifyOTP}>Xác thực OTP</button>
            )}
          </>
        )}

        {message && (
          <p style={{ color: message.includes('✅') ? 'green' : 'red' }}>{message}</p>
        )}

        {step === 1 && (
          <div>
            <p>Đã có tài khoản?</p>
            <button onClick={() => navigate('/login-elderly')}>Đăng nhập</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterElderly;
