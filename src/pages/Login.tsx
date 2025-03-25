import React, { useEffect, useState } from 'react';
import KakaoLoginButton from '../assets/images/kakao_login_medium_wide.png';
import konoLogo from '../assets/kono_logo.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, loading } = useAuth();
  const [processingAuth, setProcessingAuth] = useState(false);

  // URL에 인증 코드가 있는지 확인
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hasAuthCode = params.has('code');
    
    if (hasAuthCode) {
      console.log('로그인 페이지: 인증 코드 감지됨, 처리 중...');
      setProcessingAuth(true);
    }
  }, [location.search]);

  // 이미 로그인된 경우 메인 페이지로 리다이렉트
  useEffect(() => {
    if (!loading && isAuthenticated) {
      console.log('로그인 페이지: 인증됨, 메인 페이지로 리다이렉트');
      navigate('/favorite');
    }
  }, [isAuthenticated, loading, navigate]);

  const handleKakaoLogin = () => {
    console.log('로그인 페이지: 카카오 로그인 버튼 클릭');
    setProcessingAuth(true);
    // AuthContext에 구현된 로그인 함수 호출
    login();
  };

  // 로딩 중이거나 처리 중이거나 이미 인증된 경우 로딩 표시
  if (loading || processingAuth || isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <img src={konoLogo} alt="코노 로고" className="w-1/2 mx-auto mb-8" />
        <p className="text-gray-500 text-center">
          {processingAuth ? '카카오 로그인 처리 중...' : '로딩 중...'}
        </p>
      </div>
    );
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
            className="mx-auto cursor-pointer hover:opacity-90 transition-opacity"
            onClick={handleKakaoLogin}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
