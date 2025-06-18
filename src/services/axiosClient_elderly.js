import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://phuchwa-backend.onrender.com', // ⚠️ Đổi đúng cổng BE bạn đang chạy
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
