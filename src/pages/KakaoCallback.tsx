import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithKakao } from '../api/auth';
import { useAuth } from '../contexts/AuthContext';

const KakaoCallback: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { refreshAuth } = useAuth();

  useEffect(() => {
    const processKakaoLogin = async () => {
      try {
        // URL에서 인증 코드 추출
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (!code) {
          throw new Error('Authorization code not found');
        }

        // 백엔드로 코드 전송하여 로그인
        await loginWithKakao(code);

        // 인증 상태 갱신
        await refreshAuth();

        // 로그인 성공 후 리다이렉트
        navigate('/', { replace: true });
      } catch (err) {
        console.error('Login failed:', err);
        setError('로그인 처리 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    processKakaoLogin();
  }, [navigate, refreshAuth]);

  if (loading && !error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">로그인 처리 중입니다...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️ {error}</div>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            로그인 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default KakaoCallback;
