import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/common.css';

function Matching() {
  const [nurses, setNurses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const elderlyId = localStorage.getItem('cardId');

  useEffect(() => {
    fetch('https://phuchwa-project.onrender.com/api/users?role=nurse')
      .then(res => res.json())
      .then(data => setNurses(data.users || []))
      .catch(err => console.error(err));
  }, []);

  const callMatchApi = async (nurseId) => {
    if (!elderlyId) return setErrorMessage('Không tìm thấy mã elderly.');
    setLoading(true);
    try {
      const res = await fetch('https://phuchwa-project.onrender.com/api/matching', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ elderlyId, nurseId })
      });
      const result = await res.json();
      if (res.ok) {
        setSuccessMessage('🎉 Đã gửi yêu cầu matching thành công!');
        setErrorMessage('');
      } else {
        setErrorMessage(result.message || 'Lỗi khi gửi yêu cầu matching.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Lỗi mạng hoặc server.');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>🔗 Danh sách y tá khả dụng</h2>
        {successMessage && <p className="success-text">{successMessage}</p>}
        {errorMessage && <p className="error-text">{errorMessage}</p>}
        <div className="card-grid">
          {nurses.map(nurse => (
            <div key={nurse._id} className="card-box fade-in">
              <h3>{nurse.name}</h3>
              <p><b>Chuyên môn:</b> {nurse.specialty || 'Chưa cập nhật'}</p>
              <p><b>Quận/Huyện:</b> {nurse.location || 'Chưa rõ'}</p>
              <button onClick={() => callMatchApi(nurse._id)} disabled={loading}>
                {loading ? 'Đang gửi...' : 'Yêu cầu ghép cặp'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Matching;
