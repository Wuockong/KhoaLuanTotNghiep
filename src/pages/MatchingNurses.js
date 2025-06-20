import React, { useEffect, useState } from "react";
import "../assets/styles/pages/matching-nurses.css";
import { getEligibleNurses, postMatching } from "../services/matchingService";
import { useNavigate } from "react-router-dom";

function MatchingNurses() {
  const [nurses, setNurses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const elderly_id = localStorage.getItem("user_id");
  const role = localStorage.getItem("role");

  useEffect(() => {
    // ✅ Không tự navigate - chỉ hiển thị cảnh báo nếu sai role
    if (role !== "elderly") {
      alert("❌ Chỉ người dùng elderly mới có thể thực hiện matching.");
      return;
    }

    const fetchNurses = async () => {
      try {
        const result = await getEligibleNurses();
        setNurses(result || []);
      } catch (err) {
        alert("❌ Không thể tải danh sách y tá.");
      } finally {
        setLoading(false);
      }
    };

    fetchNurses();
  }, [role]);

  const handleMatch = async (nurse_id) => {
    const now = new Date();
    const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);

    const booking_time = [{
      start_time: now.toISOString(),
      end_time: twoHoursLater.toISOString()
    }];

    try {
      await postMatching({
        nurse_id,
        service_level: "basic",
        booking_time
      });

      alert("✅ Đã tạo matching thành công!");
    } catch (err) {
      alert("❌ Không thể tạo matching: " + (err.response?.data?.message || "Lỗi không xác định"));
    }
  };

  return (
    <div className="matching-nurse-container">
      <h2>🤝 Chọn Y tá để kết nối</h2>
      {loading ? (
        <p>⏳ Đang tải danh sách...</p>
      ) : (
        <div className="elderly-list">
          {nurses.map((nurse, index) => (
            <div className="elderly-card" key={index}>
              <h4>{nurse.full_name}</h4>
              <p>🏫 Trường: {nurse.school}</p>
              <p>🧪 Điểm test: {nurse.test_score}</p>
              <p>📍 Địa chỉ: {nurse.current_address?.city || "Không rõ"}</p>
              <p>📞 SĐT: {nurse.phone_number}</p>
              <button className="match-btn" onClick={() => handleMatch(nurse.nurse_id)}>
                Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MatchingNurses;
