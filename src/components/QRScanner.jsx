import React, { useEffect, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import {
  decodeQRCodeFromVideo,
  readQRCodeFromImage,
} from "../utils/imageUtils";
import "../assets/styles/pages/login-qr.css";

const QRScanner = ({ onQRDetected, mode }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const scanQRCode = useCallback(() => {
    const video = webcamRef.current?.video;
    const canvas = canvasRef.current;

    if (video && canvas && video.readyState === 4) {
      const code = decodeQRCodeFromVideo(video, canvas);
      if (code) {
        canvas.toBlob((blob) => {
          if (blob) onQRDetected(blob, code.data);
        }, "image/png");
      }
    }
  }, [onQRDetected]);

  useEffect(() => {
    if (mode === "camera") {
      const interval = setInterval(scanQRCode, 1000);
      return () => clearInterval(interval);
    }
  }, [mode, scanQRCode]);

  const handleFile = (file) => {
    readQRCodeFromImage(file, onQRDetected);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <>
      {mode === "camera" && (
        <div className="qr-camera">
          <Webcam audio={false} ref={webcamRef} className="webcam-box" />
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
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>
      )}
    </>
  );
};

export default QRScanner;
