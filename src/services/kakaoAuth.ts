import axios from 'axios';

// 카카오 개발자 사이트에서 발급받은 JavaScript 키
const KAKAO_JS_KEY = '9e72c1282f1e3d10881403ac2d0f4457';
const REDIRECT_URI = 'http://localhost:8080/login/oauth2/code/kakao'; // 개발 환경 기준

// 카카오 SDK 초기화
export const initializeKakao = (): void => {
  // SDK가 로드되었는지 확인
  if (window.Kakao) {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JS_KEY);
      console.log('Kakao SDK initialized');
    }
  } else {
    console.error('Kakao SDK not loaded. Trying again in 1 second...');
    // SDK가 로드될 때까지 재시도
    setTimeout(initializeKakao, 1000);
  }
};

// 카카오 로그인 요청
export const loginWithKakao = (): void => {
  if (!window.Kakao) {
    console.error('Kakao SDK not loaded');
    return;
  }

  window.Kakao.Auth.authorize({
    redirectUri: REDIRECT_URI,
    scope: 'profile_nickname,profile_image', // 필요한 동의항목
  });
};

// 카카오 토큰으로 사용자 정보 가져오기
export const getKakaoUserInfo = async (accessToken: string) => {
  try {
    const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Kakao user info:', error);
    throw error;
  }
};

// 카카오 로그아웃
export const logoutFromKakao = async (): Promise<void> => {
  if (!window.Kakao) {
    console.error('Kakao SDK not loaded');
    return;
  }

  if (!window.Kakao.Auth.getAccessToken()) {
    console.log('Not logged in to Kakao');
    return;
  }

  await window.Kakao.Auth.logout();
  console.log('Logged out from Kakao');
};

// 카카오 연결 끊기
export const unlinkKakao = async (): Promise<void> => {
  if (!window.Kakao) {
    console.error('Kakao SDK not loaded');
    return;
  }

  try {
    await window.Kakao.API.request({
      url: '/v1/user/unlink',
    });
    console.log('Unlinked from Kakao');
  } catch (error) {
    console.error('Error unlinking Kakao:', error);
    throw error;
  }
};

// 카카오 로그인 상태 확인
export const checkKakaoLoginStatus = (): boolean => {
  return !!window.Kakao.Auth.getAccessToken();
};

// 인증 코드를 백엔드로 전송하는 함수
export const sendAuthCodeToBackend = async (code: string) => {
  try {
    const response = await axios.post('/api/auth/kakao', { code });
    return response.data; // 백엔드에서 반환한 사용자 정보와 JWT 토큰 등
  } catch (error) {
    console.error('Error sending auth code to backend:', error);
    throw error;
  }
};
