import React, { useState, useRef, useLayoutEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import "../assets/styles/pages/create-card.css";
import "../assets/styles/base/buttons.css";
import "../assets/styles/base/common.css";

function CreateCard() {
  const [inputCode, setInputCode] = useState("");
  const [qrData, setQrData] = useState("");
  const [shouldDownload, setShouldDownload] = useState(false);
  const qrRef = useRef(null);

  const handleGenerateQR = () => {
    if (inputCode.trim()) {
      const data = {
        card_id: inputCode.trim(),
        role: "nurses",
      };
      const qrString = JSON.stringify(data);
      setQrData(qrString);
      setShouldDownload(true); // đánh dấu để trigger tải
      localStorage.setItem("card_id", data.card_id);
      localStorage.setItem("role", data.role);
    }
  };

  // Sử dụng useLayoutEffect đảm bảo DOM đã render xong
  useLayoutEffect(() => {
    if (shouldDownload && qrRef.current) {
      htmlToImage
        .toPng(qrRef.current, { backgroundColor: "white" })
        .then((dataUrl) => {
          download(dataUrl, "qr-code.png");
          setShouldDownload(false); // reset để không tải lại
        })
        .catch((err) => {
          console.error("Lỗi khi tải ảnh QR:", err);
          setShouldDownload(false);
        });
    }
  }, [shouldDownload]);

  return (
    <div className="container">
      <div className="card-box">
        {!qrData ? (
          <>
            <h2>Tạo Mã QR</h2>
            <input
              type="text"
              placeholder="Nhập mã số..."
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
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
              <QRCodeCanvas value={qrData} size={300} />
            </div>
            <p>✅ Mã QR đã được lưu về máy!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateCard;
