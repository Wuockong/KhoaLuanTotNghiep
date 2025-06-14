import React, { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import '../assets/styles/pages/create-card.css';
import '../assets/styles/base/buttons.css';
import '../assets/styles/base/common.css';

function CreateCard() {
  const [code, setCode] = useState("");
  const [showQR, setShowQR] = useState(false);
  const qrRef = useRef(null);

  const handleGenerateQR = () => {
    if (code.trim()) {
      const qrData = JSON.stringify({
        card_id: code.trim(),
        role: "nurses",
      });
      setCode(qrData); // cập nhật code thành nội dung JSON
      setShowQR(true);
      localStorage.setItem("card_id", code.trim());
      localStorage.setItem("role", "nurses"); // lưu mặc định vai trò
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
              placeholder="Nhập mã số..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="input-box"
            />
            <button className="animated-btn" onClick={handleGenerateQR}>
              Tạo QR
            </button>
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
