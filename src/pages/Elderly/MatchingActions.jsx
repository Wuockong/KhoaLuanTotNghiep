import React, { useState, useEffect } from "react";
import api from "../../services/axiosClient";
import "../../assets/styles/pages/matching.css";

function MatchingActions() {
  const MATCHING_ID = localStorage.getItem("matching_id"); // Lấy ID đã tạo
  const [info, setInfo] = useState(null);
  const [newStart, setNewStart] = useState("");
  const [newEnd, setNewEnd] = useState("");
  const [signature, setSignature] = useState("");
  const [violationReason, setViolationReason] = useState("");
  const [message, setMessage] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Fetch matching data mỗi khi MATCHING_ID hoặc trigger thay đổi
  useEffect(() => {
    const fetchMatching = async () => {
      if (!MATCHING_ID) return;
      try {
        const res = await api.get(`/matching/${MATCHING_ID}`);
        setInfo(res.data.data);
      } catch (err) {
        setMessage("❌ Không tìm thấy matching.");
      }
    };

    fetchMatching();
  }, [MATCHING_ID, refreshTrigger]);

  const updateBookingTime = async () => {
    try {
      const body = {
        booking_time: [
          {
            start_time: new Date(newStart).toISOString(),
            end_time: new Date(newEnd).toISOString(),
          },
        ],
      };
      await api.patch(`/matching/${MATCHING_ID}/booking`, body);
      setMessage("✅ Đã cập nhật khung giờ thành công.");
      setRefreshTrigger((prev) => prev + 1); // Trigger reload
    } catch (err) {
      setMessage("❌ Lỗi khi cập nhật khung giờ.");
    }
  };

  const signContract = async () => {
    try {
      const body = {
        signature: signature || "elderly-signature-placeholder",
        by: "elderly",
      };
      await api.post(`/matching/${MATCHING_ID}/sign`, body);
      setMessage("✅ Đã ký hợp đồng số.");
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      setMessage("❌ Lỗi khi ký hợp đồng.");
    }
  };

  const reportViolation = async () => {
    try {
      const body = {
        reported_by: "elderly",
        reason: violationReason,
      };
      await api.post(`/matching/${MATCHING_ID}/violation`, body);
      setMessage("✅ Đã báo cáo vi phạm.");
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      setMessage("❌ Lỗi khi báo cáo vi phạm.");
    }
  };

  return (
    <div className="matching-page-container">
      <div className="matching-card">
        <h2>📄 Chức năng với Matching ID: {MATCHING_ID}</h2>

        {/* Thông tin Matching */}
        {info && (
          <div className="info-display">
            <h3>📋 Thông tin Matching</h3>
            <p><strong>👤 Y tá ID:</strong> {info.nurse_id}</p>
            <p><strong>👵 Người cao tuổi ID:</strong> {info.elderly_id}</p>
            <p><strong>📦 Gói dịch vụ:</strong> {info.service_level}</p>

            <div>
              <strong>🕒 Lịch đặt:</strong>
              <ul>
                {info.booking_time.map((bt, index) => (
                  <li key={index}>
                    Bắt đầu: {new Date(bt.start_time).toLocaleString()} – Kết thúc: {new Date(bt.end_time).toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <strong>📜 Hợp đồng:</strong>
              <p>✔️ Chữ ký người già: {info.contract_status?.elderly_signature || "Chưa"}</p>
              <p>🧑‍⚕️ Chữ ký y tá: {info.contract_status?.nurse_signature || "Chưa"}</p>
              <p>🔒 Hoàn tất: {info.contract_status?.is_signed ? "✔️ Có" : "❌ Chưa"}</p>
            </div>

            {info.violation_report && (
              <div>
                <strong>🚨 Vi phạm:</strong>
                <p>ID người báo cáo: {info.violation_report.reported_by}</p>
                <p>Lý do: {info.violation_report.reason}</p>
                <p>Thời gian: {new Date(info.violation_report.timestamp).toLocaleString()}</p>
              </div>
            )}
          </div>
        )}

        <hr style={{ margin: "24px 0" }} />

        {/* Cập nhật thời gian */}
        <h4>⏰ Cập nhật thời gian</h4>
        <div className="form-row time-group">
          <input
            type="datetime-local"
            value={newStart}
            onChange={(e) => setNewStart(e.target.value)}
          />
          <input
            type="datetime-local"
            value={newEnd}
            onChange={(e) => setNewEnd(e.target.value)}
          />
          <button className="btn-submit" onClick={updateBookingTime}>
            Cập nhật
          </button>
        </div>

        <hr style={{ margin: "24px 0" }} />

        {/* Ký hợp đồng */}
        <h4>✍️ Ký hợp đồng</h4>
        <input
          type="text"
          placeholder="Chữ ký (nếu có)"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
        />
        <button className="btn-submit" onClick={signContract}>
          Ký hợp đồng số
        </button>

        <hr style={{ margin: "24px 0" }} />

        {/* Báo cáo vi phạm */}
        <h4>🚨 Báo cáo vi phạm</h4>
        <textarea
          placeholder="Lý do vi phạm..."
          value={violationReason}
          onChange={(e) => setViolationReason(e.target.value)}
        />
        <button className="btn-submit" onClick={reportViolation}>
          Báo cáo vi phạm
        </button>

        {message && (
          <p className={`message ${message.includes("✅") ? "success" : "error"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default MatchingActions;
