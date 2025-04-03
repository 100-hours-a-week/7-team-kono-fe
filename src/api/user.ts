import axios from 'axios';
import api from './clients';
import { API_ENDPOINTS } from '../config/apiEndpoints';

interface ProfileData {
  nickname: string;
  profileImageUrl: string;
}

// 사용자 프로필 정보 가져오기
export const getUserProfile = async (): Promise<ProfileData> => {
  try {
    // API 서버에서 인증된 사용자 정보 가져오기
    const response = await api.get(API_ENDPOINTS.GET_USER);
    
    // API 응답 형식에 맞게 데이터 변환
    return response.data;
      // nickname: response.data.nickname || '사용자',
      // profileImage: response.data.profileImage || 'https://via.placeholder.com/150',
      // id: response.data.id,
    // cashBalance: response.data.cashBalance
  } catch (error) {
    console.error('사용자 프로필 정보를 가져오는 중 오류 발생:', error);
    // 오류 발생 시 기본 더미 데이터 반환
    return {
      nickname: '사용자',
      profileImageUrl: 'https://via.placeholder.com/150',

    };
  }
};

// 프로필 이미지 업데이트
export const updateProfileImage = async (imageFile: File): Promise<ProfileData> => {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);
    
    const response = await axios.post('/api/v1/users/profile-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    });
    
    return getUserProfile(); // 업데이트 후 최신 프로필 정보 반환
  } catch (error) {
    console.error('프로필 이미지 업데이트 중 오류 발생:', error);
    throw error;
  }
};

// 닉네임 업데이트
export const updateNickname = async (nickname: string): Promise<ProfileData> => {
  try {
    const response = await axios.put('/api/v1/users/nickname', 
      { nickname }, 
      { 
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true 
      }
    );
    
    return getUserProfile(); // 업데이트 후 최신 프로필 정보 반환
  } catch (error) {
    console.error('닉네임 업데이트 중 오류 발생:', error);
    throw error;
  }
};

// 잔액 조회
export const getBalance = async (): Promise<number> => {
  try {
    const response = await axios.get('/api/v1/users/balance', {
      withCredentials: true
    });
    
    return response.data.balance;
  } catch (error) {
    console.error('잔액 조회 중 오류 발생:', error);
    return 0;
  }
};
