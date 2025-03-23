import React from 'react';
import KakaoLoginButton from '../assets/images/kakao_login_medium_wide.png';
import konoLogo from '../assets/kono_logo.svg';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    // 외부 URL로 리다이렉트하려면 window.location.href를 사용
    window.location.href = import.meta.env.VITE_API_URL;
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
            className="mx-auto cursor-pointer hover:opacity-90 transition-opacity"
            onClick={handleKakaoLogin}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
