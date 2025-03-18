import axios from 'axios';

// 카카오 개발자 사이트에서 발급받은 JavaScript 키
const KAKAO_JS_KEY = '9e72c1282f1e3d10881403ac2d0f4457';
const REDIRECT_URI = 'http://localhost:8080/login/oauth2/code/kakao'; // 개발 환경 기준

// 카카오 SDK 초기화
export const initializeKakaoSDK = () => {
  if (!window.Kakao) {
    console.error('Kakao SDK not loaded');
    return;
  }

  // Vite에서는 process.env 대신 import.meta.env 사용
  const kakaoJsKey = import.meta.env.VITE_KAKAO_CLIENT_ID;

  if (!kakaoJsKey) {
    console.error('Kakao JavaScript key is not defined');
    return;
  }

  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(kakaoJsKey);
    console.log('Kakao SDK initialized');
  }
};

// 카카오 로그인 요청 함수
export const loginWithKakao = () => {
  if (!window.Kakao) {
    console.error('Kakao SDK not loaded');
    return;
  }

  if (!window.Kakao.isInitialized()) {
    initializeKakaoSDK();
  }

  // Vite에서는 process.env 대신 import.meta.env 사용
  const redirectUri =
    import.meta.env.VITE_KAKAO_REDIRECT_URI ||
    'http://localhost:3000/login/oauth2/code/kakao';

  // 카카오 인증 페이지로 리다이렉트
  window.Kakao.Auth.authorize({
    redirectUri: redirectUri,
    scope: 'profile_nickname,profile_image,account_email', // 필요한 스코프 설정
  });
};

// 기존 함수를 유지하고 새 이름으로도 내보내기
export const requestKakaoLogin = loginWithKakao;

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
