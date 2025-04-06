import React, { useEffect, useState } from 'react';
import KakaoLoginButton from '../assets/images/kakao_login_medium_wide.png';
import konoLogo from '../assets/kono_logo.svg';

declare global {
  interface Window {
    Kakao: any;
  }
}

const Login: React.FC = () => {
  const [isKakaoInitialized, setIsKakaoInitialized] = useState(false);

  // Kakao SDK 초기화
  useEffect(() => {
    const loadKakaoSDK = () => {
      const script = document.createElement('script');
      script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
      script.async = true;
      script.onload = () => {
        window.Kakao.init(import.meta.env.VITE_KAKAO_API_KEY);
        setIsKakaoInitialized(true);
        console.log('Kakao SDK loaded and initialized');
      };
      document.body.appendChild(script);
    };

    // Kakao SDK가 이미 로드되어 있는지 확인
    if (!window.Kakao) {
      loadKakaoSDK();
    } else if (!window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_API_KEY);
      setIsKakaoInitialized(true);
      console.log('Kakao SDK initialized');
    } else {
      setIsKakaoInitialized(true);
      console.log('Kakao SDK already initialized');
    }

    // cleanup
    return () => {
      const script = document.querySelector(
        'script[src="https://developers.kakao.com/sdk/js/kakao.js"]',
      );
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleKakaoLogin = () => {
    if (!isKakaoInitialized) {
      console.error('Kakao SDK not initialized yet');
      return;
    }

    try {
      // API_URL에서 마지막 슬래시가 있으면 제거
      const apiUrl = import.meta.env.VITE_API_URL.replace(/\/$/, '');
      window.location.href = `${apiUrl}/oauth2/authorization/kakao`;
    } catch (error) {
      console.error('Failed to initiate Kakao login:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-4">
      {/* 상단 1/3 영역 - 로고 배치 */}
      <div className="flex-1 flex items-end justify-center w-full mb-8">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center justify-center">
            <img src={konoLogo} alt="코노 로고" className="w-3/4 mx-auto" />
            <p className="text-center text-sm text-gray-500 mt-2">
              코인 놀이터 <strong>코노</strong>에서 실전 투자 감각을 키워보세요
            </p>
          </div>
        </div>
      </div>

      {/* 중간 영역 - 빈 공간 */}
      <div className="flex-1"></div>

      {/* 하단 1/3 영역 - 카카오 로그인 버튼 배치 */}
      <div className="flex-1 flex items-start justify-center w-full mt-8">
        <div className="w-full max-w-md">
          <img
            src={KakaoLoginButton}
            alt="카카오 로그인"
            className={`mx-auto cursor-pointer transition-opacity ${
              isKakaoInitialized
                ? 'hover:opacity-90'
                : 'opacity-50 cursor-not-allowed'
            }`}
            onClick={isKakaoInitialized ? handleKakaoLogin : undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
