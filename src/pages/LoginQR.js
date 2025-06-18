import React, { useState } from "react";
import QRScanner from "../components/QRScanner";
import { loginWithQR } from "../services/authService";

function LoginQR() {
  const [cardId, setCardId] = useState("");
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState("camera");

  const handleQRDetected = async (blob, data) => {
    if (data === cardId) return;
    setCardId(data);
    try {
      const { access_token, user } = await loginWithQR(blob);
      localStorage.setItem("token", access_token);
      localStorage.setItem("user_id", user.user_id);
      localStorage.setItem("role", user.role);
      setMessage("✅ Đăng nhập thành công!");
      window.location.href = "/dashboard";
    } catch (err) {
      setMessage("❌ Đăng nhập thất bại.");
    }
  };

  return (
    <div className="container">
      <div className="card-box">
        <h2>Đăng nhập bằng mã QR</h2>

        <div className="loginqr-mode">
          <button
            className={mode === "camera" ? "selected" : ""}
            onClick={() => setMode("camera")}>
            📷 Dùng Camera
          </button>
          <button
            className={mode === "image" ? "selected" : ""}
            onClick={() => setMode("image")}>
            🖼 Tải ảnh QR
          </button>
        </div>

        <QRScanner onQRDetected={handleQRDetected} mode={mode} />

        {cardId && <p>✅ Mã quét: {cardId}</p>}
        {message && (
          <p style={{ color: message.includes("✅") ? "green" : "red" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default LoginQR;
