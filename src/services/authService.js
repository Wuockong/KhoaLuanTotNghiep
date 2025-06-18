// src/services/authService.js
import apiClient from "./apiClient";
import axios from "axios";

export const loginWithQR = async (qrBlob) => {
  const formData = new FormData();
  formData.append("qrImage", qrBlob, "qr-image.png");

  const res = await axios.post(
    "https://phuchwa-project.onrender.com/users/qr-login",
    formData
  );
  return res.data.data;
};
export const logout = () => {
  return apiClient.post("/logout");
};
export const getUserInfo = () => {
  return apiClient.get("/user/info");
};
export const getUserRole = () => {
  return apiClient.get("/user/role");
};
export const checkLoginStatus = () => {
  return apiClient.get("/login/status");
};
export const getUserCardId = () => {
  return localStorage.getItem("card_id");
};
export const getUserId = () => {
  return localStorage.getItem("user_id");
};
export const getUserToken = () => {
  return localStorage.getItem("token");
};
export const getUserName = () => {
  return localStorage.getItem("name");
};
