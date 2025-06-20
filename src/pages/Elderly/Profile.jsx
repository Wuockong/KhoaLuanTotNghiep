import React, { useEffect, useState } from "react";
import api from "../../services/axiosClient";

function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const user_id = localStorage.getItem("user_id");
  //const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user_id) return;
        const res = await api.get(`/elderly/${user_id}`);
        setUserInfo(res.data.data);
      } catch (err) {
        console.error("❌ Lỗi khi lấy hồ sơ:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user_id]);

  if (loading) return <div>⏳ Đang tải hồ sơ...</div>;
  if (!userInfo) return <div>❌ Không tìm thấy hồ sơ.</div>;

  return (
    <div className="page-container">
      <h1>📋 Hồ sơ cá nhân</h1>
      <div className="info-card">
        <p><strong>ID:</strong> {userInfo.user_id || userInfo._id}</p>
        <p><strong>Họ tên:</strong> {userInfo.full_name || "Chưa có"}</p>
        <p><strong>Giới tính:</strong> {userInfo.gender === true ? "Nam" : userInfo.gender === false ? "Nữ" : "Chưa có"}</p>
        <p><strong>Ngày sinh:</strong> {userInfo.date_of_birth?.slice(0, 10) || "Chưa có"}</p>
        <p><strong>Lớp:</strong> {userInfo.class || "Chưa có"}</p>
        <p><strong>Ngành:</strong> {userInfo.major || "Chưa có"}</p>
      </div>
    </div>
  );
}

export default Profile;