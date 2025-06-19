import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://phuchwa-project.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Optional: auto add token nếu cần
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
