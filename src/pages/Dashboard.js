import React, { useEffect, useState } from "react";
import "../assets/styles/pages/dashboard.css";
import { useNavigate } from "react-router-dom";
import api from "../services/axiosClient";

function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!user_id || !role) return;
        console.log("📦 Token hiện tại:", token);
        console.log("📤 Headers gửi đi:", api.defaults.headers);

        const endpoint = role === "nurse"
        ? `/nurses/${user_id}`
        : `/elderly/${user_id}`;
        const res = await api.get(endpoint);
        setUserInfo(res.data.data);
      } catch (err) {
        console.error("❌ Lỗi lấy thông tin người dùng:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [role, user_id]);

  if (loading) return <div>⏳ Đang tải thông tin...</div>;
  if (!userInfo) return <div>❌ Không tìm thấy thông tin người dùng.</div>;

  return (
    <div className="dashboard-container-v2">
      <div className="top-section">
        <div className="info-card">
          <h3>Thông tin người dùng</h3>
          <div className="info-content">
            <img src={userInfo.avatar_url || "/avatar-default.png"} alt="avatar" />
            <div className="details">
              <p><strong>ID:</strong> {userInfo.user_id || userInfo._id}</p>
              <p><strong>Họ tên:</strong> {userInfo.full_name || "Chưa có"}</p>
              <p><strong>Giới tính:</strong> {userInfo.gender === true ? "Nam" : userInfo.gender === false ? "Nữ" : "Chưa có"}</p>
              <p><strong>Ngày sinh:</strong> {userInfo.date_of_birth?.slice(0, 10) || "Chưa có"}</p>
              <p><strong>Vai trò:</strong> {role === "nurse" ? "Y tá" : "Người cao tuổi"}</p>
              <p><strong>Lớp:</strong> {userInfo.class || "Chưa có"}</p>
              <p><strong>Ngành:</strong> {userInfo.major || "Chưa có"}</p>
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
        <div className="feature-box" onClick={() => navigate("/profile")}>📋 Hồ sơ cá nhân</div>

        {role === "elderly" && (
          <>
            <div className="feature-box" onClick={() => navigate("/survey")}>📄 Làm khảo sát nhu cầu</div>
            <div className="feature-box" onClick={() => navigate("/matching")}>🧭 Matching</div>
            <div className="feature-box" onClick={() => navigate("/payment")}>💰 Thực hiện thanh toán</div>
            <div className="feature-box" onClick={() => navigate("/history")}>📜 Lịch sử giao dịch</div>

            <div className="feature-box" onClick={() => navigate("/feedback")}>📤 Gửi phản hồi</div>
            <div className="feature-box" onClick={() => navigate("/disputes")}>⚖️ Tranh chấp</div>
          </>
        )}

        {role === "nurse" && (
          <>
            <div className="feature-box">📝 Làm bài test</div>
            <div className="feature-box">📄 Làm khảo sát</div>
            <div className="feature-box" onClick={() => navigate("/matching")}>📬 Matching</div>
            <div className="feature-box">⭐ Nhận đánh giá</div>
            <div className="feature-box">🏆 Hồ sơ + rank</div>
          </>
        )}

        <div className="feature-box">📬 Hộp thư</div>
      </div>
    </div>
  );
}

export default Dashboard;
