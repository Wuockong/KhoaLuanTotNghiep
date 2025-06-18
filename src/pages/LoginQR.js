import React, { useEffect, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import jsQR from "jsqr";
import axios from "axios";
import "../assets/styles/pages/login-qr.css";
import "../assets/styles/base/common.css";
import "../assets/styles/base/buttons.css";

function LoginQR() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [cardId, setCardId] = useState("");
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState("camera");
  const [isDragging, setIsDragging] = useState(false);

  const handleLogin = async (qrBlob) => {
    try {
      const formData = new FormData();
      formData.append("qrImage", qrBlob, "qr-image.png");

      const res = await axios.post("https://phuchwa-project.onrender.com/users/qr-login", formData);
      const { access_token, user } = res.data.data;

      localStorage.setItem("token", access_token);
      localStorage.setItem("user_id", user.user_id);
      localStorage.setItem("role", user.role);

      setMessage("✅ Đăng nhập thành công!");
      window.location.href = "/dashboard";
    } catch (err) {
      setMessage("❌ Đăng nhập thất bại.");
    }
  };

  const scanQRCode = useCallback(() => {
    const video = webcamRef.current?.video;
    if (video && video.readyState === 4) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);
      if (code && code.data !== cardId) {
        canvas.toBlob((blob) => {
          if (blob) handleLogin(blob);
        }, "image/png");
        setCardId(code.data);
      }
    }
  }, [cardId]);

  useEffect(() => {
    if (mode === "camera") {
      const interval = setInterval(scanQRCode, 1000);
      return () => clearInterval(interval);
    }
  }, [mode, scanQRCode]); // ✅ Đã thêm scanQRCode vào dependency

  const handleImageUpload = (file) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onload = () => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) handleLogin(blob);
        }, "image/png");
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file);
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

        {mode === "camera" && (
          <div className="qr-camera">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="webcam-box"
            />
            <canvas ref={canvasRef} style={{ display: "none" }} />
            <p>Đưa mã QR vào camera để đăng nhập</p>
          </div>
        )}

        {mode === "image" && (
          <div
            className={`drop-zone ${isDragging ? "dragover" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}>
            <p>Kéo và thả ảnh QR vào đây</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files[0])}
            />
          </div>
        )}

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
