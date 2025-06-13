import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import jsQR from "jsqr";
import "../assets/styles/pages/login-qr.css";
import "../assets/styles/base/common.css";
import "../assets/styles/base/buttons.css";
import { login as loginApi } from "../services/authService";

import { getMatching } from "../services/matchingService";
import Swal from "sweetalert2";

function LoginQR() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [cardId, setCardId] = useState("");
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState("camera");
  const [isDragging, setIsDragging] = useState(false);
  useEffect(() => {
    // Xóa thông tin đăng nhập mỗi lần vào trang này
    localStorage.clear();
  }, []);

  const handleLogin = async (card_id, role) => {
    try {
      const res = await loginApi({ card_id });
      const token = res.data.token;

      localStorage.setItem("card_id", card_id);
      localStorage.setItem("user_id", card_id);
      localStorage.setItem("role", role);
      localStorage.setItem("token", token);

      Swal.fire({
        icon: "success",
        title: "Đăng nhập thành công!",
        text: `Chào mừng bạn quay lại, vai trò: ${role}`,
        confirmButtonText: "Tiếp tục",
      }).then(() => {
        checkMatching(card_id);
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Đăng nhập thất bại",
        text:
          err?.response?.data?.message ||
          "Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.",
        confirmButtonText: "Đóng",
      });
    }
  };

  const checkMatching = async (card_id) => {
    try {
      const res = await getMatching();
      const match = res.data.find((m) => m.elderlyId === card_id);
      if (match) {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/matching";
      }
    } catch (err) {
      window.location.href = "/dashboard";
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
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code && code.data !== cardId) {
        setCardId(code.data);
        try {
          const parsed = JSON.parse(code.data);
          if (parsed.card_id && parsed.role) {
            // 🟢 Gọi login trực tiếp ở đây
            loginApi({ card_id: parsed.card_id })
              .then((res) => {
                const token = res.data.token;
                localStorage.setItem("card_id", parsed.card_id);
                localStorage.setItem("user_id", parsed.card_id);
                localStorage.setItem("role", parsed.role);
                localStorage.setItem("token", token);
                Swal.fire({
                  icon: "success",
                  title: "Đăng nhập thành công!",
                  text: `Chào mừng bạn quay lại, vai trò: ${parsed.role}`,
                  confirmButtonText: "Tiếp tục",
                }).then(() => {
                  checkMatching(parsed.card_id);
                });
              })
              .catch((err) => {
                Swal.fire({
                  icon: "error",
                  title: "Đăng nhập thất bại",
                  text:
                    err?.response?.data?.message ||
                    "Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.",
                  confirmButtonText: "Đóng",
                });
              });
          } else {
            setMessage("❌ QR không hợp lệ (thiếu thông tin)");
          }
        } catch {
          setMessage("❌ QR không hợp lệ (không phải JSON)");
        }
      }
    }
  }, [cardId]);

  useEffect(() => {
    if (mode === "camera") {
      const interval = setInterval(scanQRCode, 1000);
      return () => clearInterval(interval);
    }
  }, [mode, scanQRCode]);

  useEffect(() => {
    const savedCardId = localStorage.getItem("card_id");
    if (savedCardId) {
      setCardId(savedCardId);
    }
  }, []);

  useEffect(() => {
    if (cardId) {
      localStorage.setItem("card_id", cardId);
    }
  }, [cardId]);

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
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);
        if (code) {
          setCardId(code.data);
          try {
            const parsed = JSON.parse(code.data);
            if (parsed.card_id && parsed.role) {
              handleLogin(parsed.card_id, parsed.role);
            } else {
              setMessage("❌ QR không hợp lệ (thiếu thông tin)");
            }
          } catch (err) {
            setMessage("❌ QR không hợp lệ (không phải JSON)");
          }
        } else {
          setMessage("❌ Không tìm thấy mã QR!");
        }
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
