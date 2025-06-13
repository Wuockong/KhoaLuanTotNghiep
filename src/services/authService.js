// src/services/authService.js
import apiClient from "./apiClient";

export const login = ({ card_id }) => {
  return apiClient.post("/users/login", { card_id });
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
