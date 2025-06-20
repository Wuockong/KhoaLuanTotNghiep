import React, { useState } from "react";
import api from "../../services/axiosClient";
import "../../assets/styles/pages/matching.css"; // Đảm bảo bạn đã import file CSS
import { useNavigate } from "react-router-dom";

function MatchingPage() {
  const [nurseId, setNurseId] = useState("");
  const [serviceLevel, setServiceLevel] = useState("basic");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState("");
  const [matchId, setMatchId] = useState(null);
  const navigate = useNavigate();

  const handleCreateMatching = async () => {
  if (!nurseId || !startTime || !endTime) {
    setMessage("❌ Vui lòng điền đầy đủ thông tin bắt buộc.");
    return;
  }

  try {
    const body = {
      nurse_id: nurseId,
      service_level: serviceLevel,
      booking_time: [
        {
          start_time: new Date(startTime).toISOString(),
          end_time: new Date(endTime).toISOString(),
        },
      ],
    };

    const res = await api.post("/matching", body);
    const newId = res.data.data._id;
    localStorage.setItem("matching_id", newId); // ✅ Lưu đúng ID
    setMatchId(newId);
    setMessage("✅ Tạo yêu cầu chăm sóc thành công!");
    setTimeout(() => {
      navigate("/matching/actions"); 
    }, 1000);
  } catch (err) {
    console.error("Lỗi tạo matching:", err);
    setMessage("❌ Không thể tạo yêu cầu. Vui lòng thử lại.");
  }
};

  return (
    <div className="matching-page-container">
      <div className="matching-card">
        <h1 className="title">🔗 Tạo Matching giữa Elderly và Nurse</h1>

        {/* Hàng 1: ID Y tá và Gói dịch vụ */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nurseId">🧑‍⚕️ ID Y tá</label>
            <input
              id="nurseId"
              type="text"
              value={nurseId}
              onChange={(e) => setNurseId(e.target.value)}
              placeholder="Nhập mã ID y tá"
            />
          </div>
          <div className="form-group">
            <label htmlFor="serviceLevel">📦 Gói dịch vụ</label>
            <select id="serviceLevel" value={serviceLevel} onChange={(e) => setServiceLevel(e.target.value)}>
              <option value="basic">Cơ bản</option>
              <option value="standard">Tiêu chuẩn</option>
              <option value="premium">Cao cấp</option>
            </select>
          </div>
        </div>

        {/* Hàng 2: Khung giờ booking */}
        <div className="form-group">
           <label>🗓️ Khung giờ booking</label>
           <div className="form-row time-group">
              <div className="form-group">
                <label htmlFor="startTime" className="time-label">Bắt đầu</label>
                <input id="startTime" type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="endTime" className="time-label">Kết thúc</label>
                <input id="endTime" type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
              </div>
           </div>
        </div>

        <button className="btn-submit" onClick={handleCreateMatching}>
          Lưu Matching
        </button>

        {message && (
            <p className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
                {message}
            </p>
        )}

        {matchId && (
          <div className="result-box">
            <p><strong>ID Matching được tạo:</strong> {matchId}</p>
            <p>Bạn có thể dùng ID này để thực hiện các bước tiếp theo.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MatchingPage;