import React, { useState, useEffect } from 'react';
import '../styles/pages/survey-elderly.css';

function SurveyElderly() {
  const [form, setForm] = useState({
    availability: '',
    care_type: '',
    location: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('user_id');
    console.log('[DEBUG] user_id trong localStorage:', id);
    setUserId(id);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.availability || !form.care_type || !form.location) {
        alert('Vui lòng nhập đầy đủ các thông tin bắt buộc.');
        return;
    }
    if (!userId) {
        alert('Không tìm thấy thông tin đăng nhập. Vui lòng đăng nhập lại.');
        return;
    }

    setLoading(true);
    try {
        const token = localStorage.getItem('token');

        const body = new URLSearchParams();
        body.append("user_id", userId);
        body.append("availability", form.availability);
        body.append("care_type", form.care_type);
        body.append("location", form.location);
        body.append("notes", form.notes);

        console.log('[DEBUG] Body gửi đi:', Object.fromEntries(body));

        const res = await fetch('', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        },
        body: body.toString()
        });

        const result = await res.json();
        if (!res.ok) throw new Error(result.message || 'Lỗi server');

        setSubmitted(true);
    } catch (err) {
        alert('Có lỗi xảy ra khi gửi khảo sát: ' + err.message);
    }
    setLoading(false);
    };

  const handleEdit = () => setSubmitted(false);

  return (
    <div className="survey-container">
      <h2>📋 Khảo sát nhu cầu chăm sóc</h2>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="survey-form">
          <label>⏰ Thời gian rảnh: *</label>
          <input
            name="availability"
            value={form.availability}
            onChange={handleChange}
            placeholder="Ví dụ: Sáng 8-11h, Thứ 2-6"
            required
          />

          <label>🩺 Loại hình chăm sóc: *</label>
          <select name="care_type" value={form.care_type} onChange={handleChange} required>
            <option value="">-- Chọn --</option>
            <option value="day">Ban ngày</option>
            <option value="full">Toàn thời gian</option>
            <option value="weekend">Cuối tuần</option>
          </select>

          <label>📍 Địa chỉ / khu vực: *</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Quận Tân Phú, TP.HCM"
            required
          />

          <label>📝 Ghi chú thêm:</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Ví dụ: Thích trò chuyện, không leo cầu thang..."
            rows="3"
          />

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Đang gửi..." : "Gửi khảo sát"}
          </button>
        </form>
      ) : (
        <div className="summary-box">
          <p><strong>⏰ Thời gian rảnh:</strong> {form.availability}</p>
          <p><strong>🩺 Loại hình chăm sóc:</strong> {form.care_type}</p>
          <p><strong>📍 Khu vực:</strong> {form.location}</p>
          {form.notes && <p><strong>📝 Ghi chú:</strong> {form.notes}</p>}

          <button className="edit-btn" onClick={handleEdit}>✏️ Thay đổi khảo sát</button>
        </div>
      )}
    </div>
  );
}

export default SurveyElderly;
