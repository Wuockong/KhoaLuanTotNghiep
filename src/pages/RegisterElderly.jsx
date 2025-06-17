import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/styles/pages/register-elderly.css";

function RegisterElderly() {
  const [formData, setFormData] = useState({
    full_name: "",
    card_id: "",
    password: "",
    date_of_birth: "",
    phone_number: "",
    current_address: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://phuchwa-project.onrender.com/api/users/register", {
        ...formData,
        role: "elderly",
      });

      setMessage("✅ Đăng ký thành công!");
      setTimeout(() => {
        navigate("/login-elderly");
      }, 1000);
    } catch (err) {
      setMessage("❌ Đăng ký thất bại. " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="container">
      <div className="card-box">
        <h2>📝 Đăng ký người cao tuổi</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="full_name"
            placeholder="Họ và tên"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="card_id"
            placeholder="Mã thẻ"
            value={formData.card_id}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date_of_birth"
            placeholder="Ngày sinh"
            value={formData.date_of_birth}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone_number"
            placeholder="Số điện thoại"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="current_address"
            placeholder="Địa chỉ hiện tại"
            value={formData.current_address}
            onChange={handleChange}
            required
          />
          <button type="submit">Đăng ký</button>
        </form>
        {message && (
          <p style={{ color: message.includes("✅") ? "green" : "red" }}>
            {message}
          </p>
        )}
        <div>
          <p>Đã có tài khoản?</p>
          <button onClick={() => navigate("/login-elderly")}>Đăng nhập</button>
        </div>
      </div>
    </div>
  );
}

export default RegisterElderly;
