import React, { useState } from 'react';
import api from '../api'; // ✅ Dùng axios instance đã cấu hình
import '../styles/base/common.css';
import '../styles/base/buttons.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Đưa thông tin user vào context sau khi đăng nhập

  const handleLogin = async () => {
    try {
      const res = await api.post('/users/login', { email, password }); // ✅ dùng api thay vì axios

      console.log("Server trả về:", res.data);

      // Kiểm tra nếu có token và user_id
      if (!res.data || !res.data.token || !res.data.user_id) {
        setMessage('❌ Thiếu thông tin trả về từ server.');
        return;
      }

      setMessage('✅ Đăng nhập thành công!');
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user_id', res.data.user_id); // lưu user_id
      login({ user_id: res.data.user_id }); // gọi context login
      navigate('/dashboard');
    } catch (err) {
      console.error("🚨 Đăng nhập lỗi:", err);
      setMessage('❌ Sai email hoặc mật khẩu');
    }
  };

  return (
    <div className="container">
      <div className="card-box">
        <h2>Đăng nhập</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Đăng nhập</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Login;
