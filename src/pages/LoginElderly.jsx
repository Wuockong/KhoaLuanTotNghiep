import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/styles/pages/login-elderly.css";

function LoginElderly() {
  const [cardId, setCardId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://phuchwa-project.onrender.com/api/users/login", {
        card_id: cardId,
        password: password,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("card_id", user.card_id);
      localStorage.setItem("user_id", user.card_id);
      localStorage.setItem("role", user.role);

      setMessage("✅ Đăng nhập thành công!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      setMessage("❌ Sai thông tin đăng nhập hoặc lỗi server.");
    }
  };

  return (
    <div className="elderly-auth-container">
      <h2>🔒 Đăng nhập</h2>
      <form onSubmit={handleLogin} className="elderly-auth-form">
        <input
          type="text"
          placeholder="Tài khoản"
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
          <button onClick={() => navigate("/loginqr")}>Đăng nhập cho y tá</button>
        </div>

    </div>
  );
}

export default LoginElderly;
