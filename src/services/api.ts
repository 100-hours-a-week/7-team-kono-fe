import axios from 'axios';

// axios 인스턴스 생성
const api = axios.create({
  baseURL: process.env.PUBLIC_URL || '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// JSON 파일 가져오는 함수
export const fetchJsonData = async <T>(fileName: string): Promise<T> => {
  try {
    const response = await api.get<T>(`/data/${fileName}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${fileName}:`, error);
    throw error;
  }
};

export default api;
