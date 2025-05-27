import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../styles/buttons.css';
import '../styles/common.css';
import './LoginQR.css';

const LoginQR = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [cardId, setCardId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('camera');
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (mode === 'camera') {
      const interval = setInterval(scanFromWebcam, 1000);
      return () => clearInterval(interval);
    }
  }, [mode]);

  const scanFromWebcam = () => {
    const video = webcamRef.current?.video;
    if (video && video.readyState === 4) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);
      if (code && code.data !== cardId) {
        setCardId(code.data);
        login(code.data);
      }
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
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
          setCardId(code.data);
          login(code.data);
        } else {
          setMessage('❌ Không tìm thấy mã QR trong ảnh!');
        }
      };
      img.src = reader.result;
    };

    reader.readAsDataURL(file);
  };

  const login = async (id) => {
    try {
      setLoading(true);
      const res = await axios.post('/api/users/login', {
        card_id: id
      });
      localStorage.setItem('card_id', id);
      setMessage('✅ Đăng nhập thành công!');
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
    } catch (err) {
      setMessage('❌ Đăng nhập thất bại.');
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload({ target: { files: [file] } });
    } else {
      setMessage('❌ Tệp không hợp lệ!');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="card-box">
          <h2 style={{ marginBottom: '1rem' }}>Đăng nhập bằng mã QR</h2>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', gap: '1rem' }}>
            <button
              className="animated-btn"
              style={mode === 'camera' ? { backgroundColor: '#1d3e94' } : {}}
              onClick={() => setMode('camera')}
            >
              📷 Dùng Camera
            </button>
            <button
              className="animated-btn"
              style={mode === 'image' ? { backgroundColor: '#1d3e94' } : {}}
              onClick={() => setMode('image')}
            >
              🖼 Tải ảnh QR
            </button>
          </div>

          {mode === 'camera' && (
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="webcam-box"
              />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
              <p style={{ fontStyle: 'italic', marginTop: '0.5rem' }}>
                Đưa mã QR vào camera để đăng nhập tự động
              </p>
            </div>
          )}

          {mode === 'image' && (
            <div
              className="drop-zone"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={() => setDragging(true)}
              onDragLeave={() => setDragging(false)}
            >
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              <p style={{ fontStyle: 'italic', marginTop: '0.5rem' }}>
                hoặc kéo & thả ảnh vào đây
              </p>
              {dragging && <p className="drop-hint">📥 Thả ảnh tại đây</p>}
            </div>
          )}

          {loading && (
            <div style={{ marginTop: '1rem' }}>
              <span className="spinner" /> Đang xử lý...
            </div>
          )}
          {message && (
            <p
              style={{
                marginTop: '1rem',
                fontWeight: 'bold',
                color: message.includes('✅') ? 'green' : 'red',
              }}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginQR;