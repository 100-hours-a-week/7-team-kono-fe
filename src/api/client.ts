import axios from 'axios';

// Vite에서는 process.env 대신 import.meta.env 사용
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 세션 쿠키를 주고받기 위해 필요
  headers: {
    'Content-Type': 'application/json',
  },
});

// 응답 인터셉터 설정 (선택 사항)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 Unauthorized 에러 처리
    if (error.response && error.response.status === 401) {
      // 로그인 페이지로 리다이렉트하거나 다른 처리
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default apiClient;
