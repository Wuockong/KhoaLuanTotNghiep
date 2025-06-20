import apiClient from "./apiClient";
import axiosClient from "./axiosClient";

export const login = ({ card_id }) => {
  return apiClient.post("/users/login", { card_id });
};
export const logout = () => {
  return apiClient.post("/users/logout");
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

export const getAccountInfo = async () => {
  const token = localStorage.getItem("token");
  const res = await axiosClient.get("/users/account", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("🧪 Raw API response:", res.data);
  return res.data;
};


        
