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

<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const ageDifMs = Date.now() - birthDate.getTime();
    return Math.floor(ageDifMs / (1000 * 60 * 60 * 24 * 365.25));
  };

  const filtered = elderlies.filter((el) => {
    const age = calculateAge(el.date_of_birth);
    const cityMatch = filter.city
      ? el.current_address?.city
          ?.toLowerCase()
          .includes(filter.city.toLowerCase())
      : true;
    const genderMatch = filter.gender
      ? String(el.gender) === filter.gender
      : true;
    const minAgeMatch = filter.minAge ? age >= parseInt(filter.minAge) : true;
    const maxAgeMatch = filter.maxAge ? age <= parseInt(filter.maxAge) : true;
    return cityMatch && genderMatch && minAgeMatch && maxAgeMatch;
  });

  return (
    <div className="matching-nurse-container">
      <h2>🤝 Kết nối với bệnh nhân</h2>
      <div className="filter-row">
        <select
          value={filter.city}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, city: e.target.value }))
          }>
          <option value="">Tất cả thành phố</option>
          <option value="Hà Nội">Hà Nội</option>
          <option value="TP.HCM">TP.HCM</option>
          <option value="Đà Nẵng">Đà Nẵng</option>
          <option value="Cần Thơ">Cần Thơ</option>
          <option value="Hải Phòng">Hải Phòng</option>
        </select>

        <select
          value={filter.gender}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, gender: e.target.value }))
          }>
          <option value="">Giới tính</option>
          <option value="true">Nam</option>
          <option value="false">Nữ</option>
        </select>
        <input
          type="number"
          placeholder="Tuổi từ"
          value={filter.minAge}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, minAge: e.target.value }))
          }
        />
        <input
          type="number"
          placeholder="Tuổi đến"
          value={filter.maxAge}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, maxAge: e.target.value }))
          }
        />
      </div>

=======
  return (
    <div className="matching-nurse-container">
      <h2>🤝 Chọn Y tá để kết nối</h2>
>>>>>>> Stashed changes
=======
  return (
    <div className="matching-nurse-container">
      <h2>🤝 Chọn Y tá để kết nối</h2>
>>>>>>> Stashed changes
      {loading ? (
        <p>⏳ Đang tải danh sách...</p>
      ) : (
        <div className="elderly-list">
          {nurses.map((nurse, index) => (
            <div className="elderly-card" key={index}>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
              <h4>{el.full_name}</h4>
              <p>📅 Ngày sinh: {el.date_of_birth}</p>
              <p>
                📍 Địa chỉ: {el.current_address?.street},{" "}
                {el.current_address?.city}
              </p>
              <p>📞 SĐT: {el.phone_number}</p>
              <button className="match-btn" onClick={() => handleMatch(el._id)}>
                Matching
=======
=======
>>>>>>> Stashed changes
              <h4>{nurse.full_name}</h4>
              <p>🏫 Trường: {nurse.school}</p>
              <p>🧪 Điểm test: {nurse.test_score}</p>
              <p>📍 Địa chỉ: {nurse.current_address?.city || "Không rõ"}</p>
              <p>📞 SĐT: {nurse.phone_number}</p>
              <button className="match-btn" onClick={() => handleMatch(nurse.nurse_id)}>
                Booking
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MatchingNurses;
