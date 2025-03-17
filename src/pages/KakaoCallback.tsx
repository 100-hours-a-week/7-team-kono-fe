import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getKakaoUserInfo } from '../services/kakaoAuth';
import axios from 'axios';

const KakaoCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processKakaoLogin = async () => {
      // URL에서 인증 코드 추출
      const params = new URLSearchParams(location.search);
      const code = params.get('code');

      if (!code) {
        setError('인증 코드를 찾을 수 없습니다.');
        return;
      }

      try {
        // 백엔드에 인증 코드 전송하여 토큰 받기
        // 실제 구현에서는 백엔드 API 엔드포인트로 변경해야 함
        const tokenResponse = await axios.post('/api/auth/kakao', { code });
        const { access_token } = tokenResponse.data;

        // 카카오 액세스 토큰으로 사용자 정보 가져오기
        const userInfo = await getKakaoUserInfo(access_token);

        // 사용자 정보를 로컬 스토리지나 상태 관리 라이브러리에 저장
        localStorage.setItem(
          'user',
          JSON.stringify({
            id: userInfo.id,
            nickname: userInfo.properties.nickname,
            profileImage: userInfo.properties.profile_image,
            email: userInfo.kakao_account.email,
            provider: 'kakao',
          }),
        );

        // 로그인 성공 후 리다이렉트
        navigate('/');
      } catch (err) {
        console.error('Kakao login error:', err);
        setError('로그인 처리 중 오류가 발생했습니다.');
      }
    };

    processKakaoLogin();
  }, [location, navigate]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            로그인 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-lg">로그인 처리 중입니다...</p>
      </div>
    </div>
  );
};

export default KakaoCallback;
