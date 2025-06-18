// src/pages/AccountElderly.js
import React, { useEffect, useState } from "react";
import axiosClient from "../../services/axiosClient";
import "../../assets/styles/base/common.css";

function AccountElderly() {
  const [accountInfo, setAccountInfo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("❌ Bạn chưa đăng nhập.");
          return;
        }

        const res = await axiosClient.get("/users/account", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAccountInfo(res.data);
      } catch (err) {
        console.error("❌ Không thể lấy thông tin tài khoản.", err);
        setError("❌ Không thể lấy thông tin tài khoản.");
      }
    };

    fetchAccount();
  }, []);

  return (
    <div className="container">
      <h2>Thông tin tài khoản</h2>
      {error && <p>{error}</p>}
      {accountInfo && (
        <div className="card-box">
          <p>
            <strong>Email:</strong> {accountInfo.email}
          </p>
          <p>
            <strong>Họ tên:</strong> {accountInfo.fullName}
          </p>
          {/* Thêm các thông tin khác nếu có */}
        </div>
      )}
    </div>
  );
}

export default AccountElderly;
