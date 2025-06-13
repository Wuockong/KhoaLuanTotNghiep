import axiosClient from './axiosClient';

// GET /test/questions/today hiện chưa có → bạn có thể comment tạm
// export const getTestQuestions = () => axiosClient.get('/test/questions/today');

export const submitTest = (data) => axiosClient.post('/test/submit', data);
