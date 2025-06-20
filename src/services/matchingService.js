import axiosClient from './axiosClient';
import api from './apiClient';

export const getMatching = () => axiosClient.get('/matching');
export const postMatching = (data) => axiosClient.post('/matching', data);

export const reportViolation = (matchId, data) =>
  axiosClient.post(`/matching/${matchId}/violation`, data);

export const completeMatching = (matchId) =>
  axiosClient.post(`/matching/${matchId}/complete`);

// Lấy danh sách y tá đủ điều kiện
export async function getEligibleNurses() {
  const res = await api.get("/nurses?scoreMin=70&hoursMax=56&available=true&distanceMax=10");
  return res.data.data; // giả định backend có lọc
}

// Gửi yêu cầu matching
export async function createMatching({ nurse_id, service_level = "basic", booking_time }) {
  const res = await api.post("/matching", {
    nurse_id,
    service_level,
    booking_time,
  });
  return res.data;
}

// Lấy matching theo ID
export async function getMatchingById(id) {
  const res = await api.get(`/matching/${id}`);
  return res.data;
}

// Ký hợp đồng số
export async function signMatching(id, signature, by = "elderly") {
  const res = await api.post(`/matching/${id}/sign`, { signature, by });
  return res.data;
}