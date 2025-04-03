import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import KakaoLoginButton from '../assets/images/kakao_login_medium_wide.png';
import konoLogo from '../assets/kono_logo.svg';
import { useAuth } from '../contexts/AuthContext';

declare global {
  interface Window {
    Kakao: any;
  }
}

const Login: React.FC = () => {
  const [isKakaoInitialized, setIsKakaoInitialized] = useState(false);
  const { isAuthenticated, loading } = useAuth(); // AuthContext에서 인증 상태 가져오기
  const navigate = useNavigate();
  const location = useLocation();

  // 로그인 상태에 따른 리디렉트 처리
  useEffect(() => {
    const handleLoginPageHistory = () => {
      if (location.pathname === '/login') {
        if (!loading && isAuthenticated) {
          navigate('/', { replace: true });
        }
      }
    };
    handleLoginPageHistory();
  }, [isAuthenticated, loading, navigate, location]);

  // URL 쿼리 파라미터 확인 (로그인 직후 코드 존재 시)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hasCode = params.has('code');

    if (hasCode) {
      // 인증 코드가 있는 경우, 히스토리에서 제거
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);

      // 로그인 성공 시 이전에 저장해둔 페이지로 리다이렉트
      const redirectTo = localStorage.getItem('redirectAfterLogin') || '/';
      navigate(redirectTo, { replace: true });
      localStorage.removeItem('redirectAfterLogin');
    }
  }, [navigate]);

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
      // 현재 URL 저장 (로그인 후 리다이렉트용)
      const prevPath = location.state?.from || '/';
      localStorage.setItem('redirectAfterLogin', prevPath);
      window.location.href = `${import.meta.env.VITE_API_URL}/oauth2/authorization/kakao`;
      // window.Kakao.Auth.authorize({
      //   redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
      //   scope: 'profile_nickname,profile_image',
      // });
    } catch (error) {
      console.error('Failed to initiate Kakao login:', error);
    }
  };

  // 로딩 중이거나 이미 인증된 상태라면 컴포넌트를 렌더링하지 않음
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        로딩 중...
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // 이미 인증된 경우 아무것도 렌더링하지 않음 (리다이렉트 처리됨)
  }

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
