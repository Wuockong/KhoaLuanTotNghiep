import axiosClient from './axiosClient';

export const getMatching = () => axiosClient.get('/matching');
export const postMatching = (data) => axiosClient.post('/matching', data);

export const reportViolation = (matchId, data) =>
  axiosClient.post(`/matching/${matchId}/violation`, data);

export const completeMatching = (matchId) =>
  axiosClient.post(`/matching/${matchId}/complete`);
