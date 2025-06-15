import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:10000/api', // đúng với backend bạn đang chạy!
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
