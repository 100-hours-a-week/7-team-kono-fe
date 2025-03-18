import apiClient from './client';

// 사용자 프로필 정보 가져오기
export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/api/v1/users/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// 프로필 이미지 업데이트
export const updateProfileImage = async (imageFile: File) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await apiClient.post(
      '/api/v1/users/profile/image',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error updating profile image:', error);
    throw error;
  }
};

// 닉네임 업데이트
export const updateNickname = async (nickname: string) => {
  try {
    const response = await apiClient.post('/api/v1/users/profile/nickname', {
      nickname,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating nickname:', error);
    throw error;
  }
};
