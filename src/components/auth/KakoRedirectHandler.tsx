import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/**
 * 백엔드에서 리다이렉트된 후의 처리
 * Spring Security에서는 이미 인증이 완료된 상태이므로
 * 사용자 정보를 요청하여 프론트엔드 상태를 업데이트
 */
const KakaoRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users`, {
          withCredentials: true,
        });

        navigate('/');
      } catch (error) {
        console.error('사용자 정보 로드 실패:', error);
        navigate('/login');
      }
    };

    getUserInfo();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default KakaoRedirectHandler;
