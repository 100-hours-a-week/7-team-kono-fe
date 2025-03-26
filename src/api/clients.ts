import axios from 'axios';

// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const api = axios.create({
//    baseURL: API_BASE_URL,
  withCredentials: true, // 세션 쿠키를 주고받기 위해 필요
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
