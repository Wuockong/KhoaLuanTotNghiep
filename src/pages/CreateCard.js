import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
import Navbar from '../components/Navbar';
import '../styles/buttons.css';
import '../styles/common.css';
import './CreateCard.css'; // 👈 Thêm CSS riêng cho hiệu ứng

function CreateCard() {
  const [code, setCode] = useState('');
  const [showQR, setShowQR] = useState(false);
  const qrRef = useRef(null);

  const handleGenerateQR = () => {
    if (code.trim()) {
      setShowQR(true);
    }
  };

  const handleDownload = () => {
    htmlToImage.toPng(qrRef.current, { backgroundColor: 'white' }).then((dataUrl) => {
      download(dataUrl, 'qr-code.png');
    });
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="card-box">
          {!showQR ? (
            <>
              <h2>Tạo thẻ vật lý</h2>
              <input
                type="text"
                placeholder="Nhập mã số..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="input-box"
              />
              <button className="animated-btn" onClick={handleGenerateQR}>Tạo QR</button>
            </>
          ) : (
            <div className="qr-section">
              <div className="qr-box qr-centered" ref={qrRef}>
                <QRCodeCanvas value={code} size={300} />
              </div>
              <div className="button-row">
                <button className="animated-btn" onClick={handleDownload}>Lưu mã QR</button>
                <button className="animated-btn" onClick={() => window.location.href = '/login'}>Đăng nhập</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CreateCard;
