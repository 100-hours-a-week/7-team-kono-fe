import apiClient from './client';

export const sendKakaoAuthCode = async (code: string) => {
  try {
    const response = await apiClient.post('/api/auth/kakao', { code });
    return response.data;
  } catch (error) {
    console.error('Error during Kakao login:', error);
    throw error;
  }
};

export const checkAuthStatus = async () => {
  try {
    const response = await apiClient.get('/api/v1/auth/status');
    return response.data;
  } catch (error) {
    console.error('Error checking auth status:', error);
    return { isAuthenticated: false };
  }
};

export const logout = async () => {
  try {
    const response = await apiClient.post('/api/v1/auth/logout');
    return response.data;
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

export const loginWithKakao = async (code: string) => {
  try {
    const response = await apiClient.post('/api/v1/auth/login', {
      provider: 'kakao',
      code,
    });
    return response.data;
  } catch (error) {
    console.error('Error during Kakao login:', error);
    throw error;
  }
};
