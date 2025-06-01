import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { QRCodeSVG } from 'qrcode.react';
import '../styles/pages/payment-elderly.css';

function Payment_Elderly() {
  const [services, setServices] = useState([]);
  const [amount, setAmount] = useState(0);
  const [showQR, setShowQR] = useState(false);
  const [paid, setPaid] = useState(false);
  const qrRef = useRef(null);

  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    axios.get(`https://phuchwa-project.onrender.com/api/transactions/pending?user_id=${user_id}`)
      .then(res => {
        const list = res.data;
        setServices(list);
        const total = list.reduce((sum, item) => sum + item.amount, 0);
        setAmount(total);
      })
      .catch(err => console.error('Lỗi khi lấy dịch vụ:', err));
  }, [user_id]);

  useEffect(() => {
    let interval;
    if (showQR && !paid) {
      interval = setInterval(() => {
        axios.get(`https://phuchwa-project.onrender.com/api/transactions/status?user_id=${user_id}`)
          .then(res => {
            if (res.data.status === 'Success') {
              setPaid(true);
              clearInterval(interval);
            }
          })
          .catch(err => console.error('Lỗi kiểm tra thanh toán:', err));
      }, 7000);
    }
    return () => clearInterval(interval);
  }, [showQR, paid, user_id]);

  const handleShowQR = () => setShowQR(true);

  const downloadQR = async () => {
    const canvas = await html2canvas(qrRef.current);
    const link = document.createElement('a');
    link.download = `QR_ThanhToan_${user_id}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const qrContent = `Vietcombank|Account:1026092892|Amount:${amount}|Content:${user_id}`;

  return (
    <div className="payment-container">
      <h2 className="title">💳 Thanh toán dịch vụ</h2>

      {services.length === 0 ? (
        <p className="no-service">🧾 Chưa sử dụng dịch vụ nào.</p>
      ) : (
        <>
          <div className="service-list">
            {services.map((svc, idx) => (
              <div className="service-card" key={idx}>
                <p><strong>Ngày:</strong> {new Date(svc.timestamp).toLocaleDateString()}</p>
                <p><strong>Số tiền:</strong> ${svc.amount}</p>
              </div>
            ))}
          </div>

          <h3 className="total">Tổng thanh toán: <span>${amount.toFixed(2)}</span></h3>

          {!showQR && (
            <button className="pay-btn" onClick={handleShowQR}>
              🔄 Tiến hành thanh toán
            </button>
          )}

          {showQR && (
            <div className="qr-section">
              <p>📱 Quét mã QR bên dưới bằng app ngân hàng</p>
              <div ref={qrRef} className="qr-box">
                <QRCodeSVG value={qrContent} size={220} />
              </div>
              <p><strong>Ngân hàng:</strong> Vietcombank<br /><strong>STK:</strong> 1026092892<br /><strong>Nội dung:</strong> {user_id}</p>
              <button className="download-btn" onClick={downloadQR}>⬇️ Tải mã QR</button>
              {paid && <p className="success-msg">✅ Thanh toán thành công! Cảm ơn bạn.</p>}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Payment_Elderly;
