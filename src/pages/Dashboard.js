import React, { useEffect, useState } from "react";
import "../assets/styles/pages/dashboard.css";
import { getAccountInfo } from "../services/authService";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getAccountInfo();
        setUser(res.user); // Lấy ra user từ res.data.user nếu đúng theo API mẫu
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

        <div className="stats-group">
          <div className="stat-card">🔔 <p>Nhắc nhở</p> <h2>0</h2></div>
          <div className="stat-card blue">📅 <p>Lịch chăm sóc</p> <h2>0</h2></div>
          <div className="stat-card orange">🧪 <p>Bài test</p> <h2>0</h2></div>
        </div>
      </div>

      <div className="feature-grid">
        <div className="feature-box">📋 Hồ sơ cá nhân</div>
        <div className="feature-box">🔍 Kết quả test</div>
        {role === "elderly" && (
          <>
            <div className="feature-box">🤝 Matching</div>
            <div className="feature-box">📖 Nhật ký chăm sóc</div>
            <div className="feature-box">📤 Gửi phản hồi</div>
            <div className="feature-box">⚖️ Tranh chấp</div>
          </>
        )}
        {role === "nurse" && (
          <>
            <div className="feature-box">📥 Yêu cầu chăm sóc</div>
            <div className="feature-box">🧾 Lịch làm việc</div>
          </>
        )}
        <div className="feature-box">💸 Giao dịch</div>
        <div className="feature-box">📬 Hộp thư</div>
      </div>
    </div>
  );
}

export default Dashboard;
