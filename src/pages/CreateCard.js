import React, { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import { useNavigate } from "react-router-dom";
import api from '../services/apiClient';
import '../assets/styles/pages/create-card.css';
import '../assets/styles/base/buttons.css';
import '../assets/styles/base/common.css';

function CreateCard() {
  const [inputCode, setInputCode] = useState(""); // số do người dùng nhập
  const [showQR, setShowQR] = useState(false);
  const [error, setError] = useState("");
  const qrRef = useRef(null);
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleGenerateQR = async () => {
  const fullCode = 'STU' + inputCode.trim();
  const storedStudentId = localStorage.getItem("student_id");
  const token = localStorage.getItem("token");

  if (!inputCode.trim()) {
    setError("❌ Vui lòng nhập mã số.");
    return;
  }

  if (fullCode !== storedStudentId) {
    setError(`❌ Mã STU không trùng khớp! Bạn nhập: ${fullCode}, yêu cầu: ${storedStudentId}`);
    return;
  }

  try {
    const res = await api.post(
      '/cards',
      { student_id: fullCode },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log("🔍 API /cards response:", res.data);
    const { card_id } = res.data.data;

    const qrData = JSON.stringify({
      card_id, // ✅ Lấy đúng từ API
      role: "nurses"
    });

    console.log("✅ QR Data:", qrData);

    setCode(qrData);
    localStorage.setItem("card_id", card_id);
    localStorage.setItem("role", "nurses");

    setError("");
    setShowQR(true);

    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  } catch (err) {
    console.error("❌ Lỗi tạo QR:", err);
    setError("❌ Lỗi tạo QR: " + (err.response?.data?.message || "Unauthorized hoặc lỗi server"));
  }
};



  // Tự động lưu QR sau khi render
  useEffect(() => {
    if (showQR && qrRef.current) {
      const timeout = setTimeout(() => {
        htmlToImage
          .toPng(qrRef.current, { backgroundColor: "white" })
          .then((dataUrl) => {
            download(dataUrl, "qr-code.png");
          });
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [showQR]);

  return (
    <div className="container">
      <div className="card-box">
        {!showQR ? (
          <>
            <h2>Tạo Mã QR</h2>
            <input
              type="text"
              placeholder="Nhập mã số (chỉ số)"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="input-box"
            />
            <button className="animated-btn" onClick={handleGenerateQR}>
              Tạo QR
            </button>
            {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
          </>
        ) : (
          <div className="qr-section">
            <div
              className="qr-box qr-centered"
              ref={qrRef}
              style={{
                padding: "20px",
                backgroundColor: "white",
                display: "inline-block",
                borderRadius: "8px",
              }}>
              <QRCodeCanvas value={code} size={300} />
            </div>
            <p>✅ Mã QR đã được lưu về máy!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateCard;
