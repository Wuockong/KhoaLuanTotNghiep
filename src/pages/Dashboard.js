import React, { useEffect, useState } from "react";
import "../assets/styles/pages/dashboard.css";
import { useNavigate } from "react-router-dom";
import { getAccountInfo } from "../services/authService";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getAccountInfo();
        setUser(res.data);
      } catch (err) {
        console.error("Lỗi lấy thông tin người dùng:", err);
      }
    };
    fetchUser();
  }, []);

  if (!user) return <div>⏳ Đang tải thông tin...</div>;

  const role = user.role;

  return (
    <div className="dashboard-container-v2">
      <div className="top-section">
        <div className="info-card">
          <h3>Thông tin người dùng</h3>
          <div className="info-content">
            <img src={user.avatar || "/avatar-default.png"} alt="avatar" />
            <div className="details">
              <p><strong>ID:</strong> {user.user_id || user.mssv}</p>
              <p><strong>Họ tên:</strong> {user.name || "Chưa có"}</p>
              <p><strong>Giới tính:</strong> {user.gender || "Chưa có"}</p>
              <p><strong>Ngày sinh:</strong> {user.birth || "Chưa có"}</p>
              <p><strong>Nơi sinh:</strong> {user.place || "Chưa có"}</p>
              <p><strong>Vai trò:</strong> {role === "nurse" ? "Y tá" : "Người cao tuổi"}</p>
              <p><strong>Ngành:</strong> {user.major || "Chưa có"}</p>
              <p><strong>Lớp:</strong> {user.class || "Chưa có"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="feature-grid">
        <div className="feature-box"><span className="icon">📋</span><p>Hồ sơ cá nhân</p></div>
        <div className="feature-box"><span className="icon">🔔</span><p>Nhắc nhở</p><h2>0</h2></div>
        <div className="feature-box"><span className="icon">📅</span><p>Lịch chăm sóc</p></div>

        {role === "elderly" && (
          <>
            <div className="feature-box"><span className="icon">📄</span><p>Làm khảo sát nhu cầu</p></div>
            <div className="feature-box"><span className="icon">🧭</span><p>Matching</p></div>
            <div className="feature-box"><span className="icon">💰</span><p>Thực hiện thanh toán</p></div>
            <div className="feature-box"><span className="icon">📜</span><p>Lịch sử giao dịch</p></div>
            <div className="feature-box"><span className="icon">⭐</span><p>Đánh giá</p></div>
            <div className="feature-box"><span className="icon">📤</span><p>Gửi phản hồi</p></div>
            <div className="feature-box"><span className="icon">⚖️</span><p>Tranh chấp</p></div>
          </>
        )}

        {role === "nurse" && (
          <>
            <div className="feature-box"><span className="icon">📝</span><p>Làm bài test</p></div>
            <div className="feature-box"><span className="icon">📄</span><p>Làm khảo sát</p></div>
            <div className="feature-box" onClick={() => navigate("/matching")}><span className="icon">📬</span><p>Matching</p></div>
            <div className="feature-box"><span className="icon">⭐</span><p>Nhận đánh giá</p></div>
            <div className="feature-box"><span className="icon">🏆</span><p>Hồ sơ + rank</p></div>
          </>
        )}
        <div className="feature-box"><span className="icon">📬</span><p>Hộp thư</p></div>
      </div>
    </div>
  );
}

export default Dashboard;
