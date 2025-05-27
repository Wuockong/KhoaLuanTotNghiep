import React, { useState } from 'react';
import jsQR from 'jsqr';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../styles/buttons.css';
import '../styles/common.css';

function LoginQR() {
  const [result, setResult] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setMessage('');

    const img = new Image();
    const reader = new FileReader();

    reader.onload = function () {
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);
        if (code) {
          setResult(code.data);
          setMessage('Tìm thấy mã QR!');
          setImageLoaded(true);
        } else {
          setMessage('Không tìm thấy mã QR!');
        }
        setLoading(false);
      };
      img.src = reader.result;
    };

    reader.readAsDataURL(file);
  };

  const login = async () => {
    try {
      setLoading(true);
      const res = await axios.post('https://phuchwa-project.onrender.com/api/users/login', {
        card_id: result
      });
      setMessage('✅ Đăng nhập thành công!');
    } catch (err) {
      setMessage('❌ Đăng nhập thất bại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="card-box">
          <h2>QR Scanner</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ marginBottom: '1rem' }}
          />

          {!imageLoaded && !loading && <p style={{ fontStyle: 'italic' }}>Khu vực quét mã QR</p>}

          <div>
            {!imageLoaded && !loading && (
              <button onClick={() => {}}>
                Quét QR Code
              </button>
            )}

            {loading && (
              <button disabled>
                <span className="spinner" />
                Đang xử lý...
              </button>
            )}

            {imageLoaded && !loading && (
              <button onClick={login}>Đăng nhập</button>
            )}

            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginQR;
