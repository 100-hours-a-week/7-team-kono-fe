import api from './clients';
import { API_ENDPOINTS } from '../config/apiEndpoints';

export interface User {
  nickname: string;
  profileImage: string;
  balance?: number;
}

// 사용자 프로필 정보 가져오기
export const getUserProfile = async (): Promise<User> => {
  try {
    const response = await api.get(API_ENDPOINTS.GET_USER);
    const users = response.data;
    console.log(users);
    return users;
  } catch (error) {
    console.error(`사용자 프로필 조회 오류: ${error}`);
    return null;
  }
};

// 프로필 이미지 업데이트
export const updateProfileImage = async (imageFile: File): Promise<boolean> => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await api.post(
      API_ENDPOINTS.POST_PROFILE_IMAGE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.status === 200;
  } catch (error) {
    console.error(`프로필 이미지 업데이트 오류: ${error}`);
    return false;
  }
};

// 닉네임 업데이트
export const updateNickname = async (nickname: string): Promise<boolean> => {
  try {
    const response = await api.put(API_ENDPOINTS.PUT_NICKNAME, {
      nickname,
    });

    return response.status === 200;
  } catch (error) {
    console.error(`닉네임 업데이트 오류: ${error}`);
    return false;
  }
};

// 회원 탈퇴
export const deleteUser = async (): Promise<boolean> => {
  try {
    const response = await api.delete(API_ENDPOINTS.DELETE_USER);
    return response.status === 200;
  } catch (error) {
    console.error(`회원 탈퇴 오류: ${error}`);
    return false;
  }
};

// 로그아웃
export const logout = async (): Promise<boolean> => {
  try {
    const response = await api.post(API_ENDPOINTS.LOGOUT);
    return response.status === 200;
  } catch (error) {
    console.error(`로그아웃 오류: ${error}`);
    return false;
  }
};
