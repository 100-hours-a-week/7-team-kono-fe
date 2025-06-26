import axios from 'axios';

const api = axios.create({
  baseURL: process.env.PUBLIC_URL || '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
