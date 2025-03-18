import React, { useEffect } from 'react';
import { initializeKakaoSDK, loginWithKakao } from '../../services/kakaoAuth';
import kakaoLoginButtonImg from '../../assets/images/kakao_login_medium_wide.png';

const KakaoLoginButton: React.FC = () => {
  useEffect(() => {
    // 컴포넌트 마운트 시 SDK 초기화
    const initKakao = () => {
      if (document.readyState === 'complete') {
        initializeKakaoSDK();
      } else {
        window.addEventListener('load', initializeKakaoSDK);
        return () => window.removeEventListener('load', initializeKakaoSDK);
      }
    };

    initKakao();
  }, []);

  return (
    <button
      onClick={() => {
        // 클릭 시 SDK가 로드되었는지 다시 확인
        if (window.Kakao) {
          loginWithKakao();
        } else {
          console.error('Kakao SDK not loaded');
          alert(
            '카카오 로그인을 위한 SDK 로드에 실패했습니다. 페이지를 새로고침 해주세요.',
          );
        }
      }}
      className="w-full flex justify-center items-center bg-[#FEE500] text-[#000000] py-2 px-4 rounded-md hover:bg-[#F6E000] transition-colors"
    >
      <img src={kakaoLoginButtonImg} alt="카카오 로그인" className="h-10" />
    </button>
  );
};

export default KakaoLoginButton;
