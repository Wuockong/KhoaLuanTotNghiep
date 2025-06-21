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
  //const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!user_id || !role) return;
        const endpoint = role === "nurse" ? `/nurses/${user_id}` : `/elderly/${user_id}`;
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
            <div className="image-container">
              <img src={userInfo.avatar_url || "/avatar-default.png"} alt="avatar" />
            </div>
            <div className="details">
              <span className="label">ID:</span><span className="value">{userInfo.user_id || userInfo._id}</span>
              <span className="label">Họ tên:</span><span className="value">{userInfo.full_name || "Chưa có"}</span>
              <span className="label">Giới tính:</span><span className="value">{userInfo.gender === true ? "Nam" : userInfo.gender === false ? "Nữ" : "Chưa có"}</span>
              <span className="label">Ngày sinh:</span><span className="value">{userInfo.date_of_birth?.slice(0, 10) || "Chưa có"}</span>
              <span className="label">Vai trò:</span><span className="value">{role === "nurse" ? "Y tá" : "Người cao tuổi"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="feature-grid">
        <div className="feature-box" onClick={() => navigate("/profile")}>
          <span className="icon">📋</span><p>Hồ sơ cá nhân</p>
        </div>

        <div className="feature-box"><span className="icon">🔔</span><p>Nhắc nhở</p><h2>0</h2></div>
        <div className="feature-box"><span className="icon">📅</span><p>Lịch chăm sóc</p></div>

        {role === "elderly" && (
          <>
            <div className="feature-box" onClick={() => navigate("/survey")}><span className="icon">📄</span><p>Làm khảo sát nhu cầu</p></div>
            <div className="feature-box" onClick={() => navigate("/matching")}><span className="icon">🧭</span><p>Matching</p></div>
            <div className="feature-box" onClick={() => navigate("/payment")}><span className="icon">💰</span><p>Thực hiện thanh toán</p></div>
            <div className="feature-box" onClick={() => navigate("/history")}><span className="icon">📜</span><p>Lịch sử giao dịch</p></div>
            <div className="feature-box" onClick={() => navigate("/feedback")}><span className="icon">📤</span><p>Gửi phản hồi</p></div>
            <div className="feature-box" onClick={() => navigate("/disputes")}><span className="icon">⚖️</span><p>Tranh chấp</p></div>
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
