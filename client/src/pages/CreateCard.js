import React, { useState, useRef, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
import Navbar from '../components/Navbar';
import '../styles/buttons.css';
import '../styles/common.css';
import './CreateCard.css';
import axios from 'axios';

function CreateCard() {
  const [code, setCode] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [loading, setLoading] = useState(false);
  const qrRef = useRef(null);

  useEffect(() => {
    if (showQR && qrRef.current) {
      // Tự động tải ảnh QR sau khi render
      const downloadTimeout = setTimeout(() => {
        htmlToImage.toPng(qrRef.current, { backgroundColor: 'white' }).then((dataUrl) => {
          download(dataUrl, 'qr-code.png');
          setLoading(false);
        });
      }, 800); // delay nhỏ để QR được render

      return () => clearTimeout(downloadTimeout);
    }
  }, [showQR]);

  const handleGenerateQR = () => {
    const cleaned = code.trim();
    if (cleaned) {
      setLoading(true);
      setShowQR(true);
      registerCardId(cleaned);
    }
  };

  const registerCardId = async (cleanedCode) => {
    try {
      await axios.post('/api/users/register', {
        card_id: cleanedCode
      });
    } catch (err) {
      console.warn('❌ Đăng ký thất bại!');
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="card-box">
          {!showQR ? (
            <>
              <h2>Đăng ký mã QR</h2>
              <input
                type="text"
                placeholder="Nhập mã số đăng ký..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="input-box"
              />
              <button className="animated-btn" onClick={handleGenerateQR} disabled={loading}>
                {loading ? 'Đang xử lý...' : 'Tạo mã và tải về'}
              </button>
            </>
          ) : (
            <div className="qr-section">
              <div className="qr-box qr-centered" ref={qrRef}>
                <QRCodeCanvas value={code.trim()} size={300} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CreateCard;