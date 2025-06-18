import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/styles/pages/login-elderly.css";
import { useAuth } from "../contexts/AuthContext"; // ✅ Thêm dòng này

function LoginElderly() {
  const [cardId, setCardId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth(); // ✅ Sử dụng context

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://phuchwa-project.onrender.com/api/users/login",
        {
          email: cardId, // 👈 thực chất là email
          password: password,
        }
      );

      const { access_token, user } = res.data.data;

      // ✅ Lưu localStorage
      localStorage.setItem("token", access_token);
      localStorage.setItem("user_id", user.user_id);
      localStorage.setItem("role", user.role);

      // ✅ Gọi context login để cập nhật trạng thái cho Navbar
      login({
        user_id: user.user_id,
        role: user.role,
      });

      setMessage("✅ Đăng nhập thành công!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      console.error("❌ Đăng nhập lỗi:", err);
      setMessage("❌ Sai thông tin đăng nhập hoặc lỗi server.");
    }
  };

  return (
    <div className="elderly-auth-container">
      <h2>🔒 Đăng nhập</h2>
      <form onSubmit={handleLogin} className="elderly-auth-form">
        <input
          type="text"
          placeholder="Email"
          value={cardId}
          onChange={(e) => setCardId(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Đăng nhập</button>
        {message && (
          <p style={{ color: message.includes("✅") ? "green" : "red" }}>
            {message}
          </p>
        )}
      </form>

      <div className="elderly-auth-footer">
        <p>Chưa có tài khoản?</p>
        <button onClick={() => navigate("/register-elderly")}>
          Đăng ký ngay
        </button>
      </div>

      <div className="elderly-auth-footer">
        <p>Bạn là y tá?</p>
        <button onClick={() => navigate("/login-nurse")}>Đăng nhập cho y tá</button>
      </div>
    </div>
  );
}

export default LoginElderly;
