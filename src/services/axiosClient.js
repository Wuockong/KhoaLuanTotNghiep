// src/services/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://phuchwa-project.onrender.com/api",
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  config.headers = {
    ...config.headers,
    Accept: "application/json",
    "Content-Type": "application/json", // ✅ Thêm dòng này
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("✅ Headers thực sự gửi đi:", config.headers);

  return config;
});

export default axiosClient;
