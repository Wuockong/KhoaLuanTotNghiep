
import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import axios from 'axios';

const QRLogin = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [cardId, setCardId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      scanQRCode();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const scanQRCode = () => {
    const video = webcamRef.current?.video;
    if (video && video.readyState === 4) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code && code.data !== cardId) {
        setCardId(code.data);
        loginWithCardId(code.data);
      }
    }
  };

  const loginWithCardId = async (id) => {
    try {
      const res = await axios.post('https://phuchwa-project.onrender.com/api/login', {
        card_id: id
      });
      setMessage('✅ Đăng nhập thành công!');
      console.log(res.data);
    } catch (err) {
      setMessage('❌ Đăng nhập thất bại.');
      console.error(err);
    }
  };

  return (
    <div>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {cardId && <p>Đã quét: {cardId}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default QRLogin;
