import React, { useEffect, useState } from 'react';
import Header from './Header';
import BottomNavigation from './BottomNavigation';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Layout: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    // 인증 관련 페이지 확인
    const isLoginPage = location.pathname === '/login';
    const isSignupPage = location.pathname === '/signup';
    const isAuthPage = isLoginPage || isSignupPage;

    // 로딩 중이면 리다이렉트하지 않음
    if (loading) {
      return;
    }

    // 이미 리다이렉트 중이면 다시 처리하지 않음
    if (redirecting) {
      return;
    }

    // 인증되지 않았고, 인증 페이지가 아닌 경우에만 리다이렉트
    if (!isAuthenticated && !isAuthPage) {
      setRedirecting(true);
      // 약간의 지연을 통해 리다이렉트 루프 방지
      setTimeout(() => {
        navigate('/login');
        setRedirecting(false);
      }, 100);
    }
  }, [isAuthenticated, loading, navigate, location.pathname, redirecting]);

  // 로딩 중이면 로딩 표시
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen max-w-[430px] w-full mx-auto relative overflow-y-auto bg-white dark:bg-gray-900 text-mainText dark:text-white justify-center items-center">
        <div className="text-center">
          <p className="mb-2">로딩 중...</p>
        </div>
      </div>
    );
  }

  // URL에 인증 코드가 있으면 인증 처리 중으로 간주하고 로딩 표시
  const params = new URLSearchParams(window.location.search);
  const hasAuthCode = params.has('code');
  if (hasAuthCode) {
    return (
      <div className="flex flex-col min-h-screen max-w-[430px] w-full mx-auto relative overflow-y-auto bg-white dark:bg-gray-900 text-mainText dark:text-white justify-center items-center">
        <div className="text-center">
          <p className="mb-2">로그인 처리 중...</p>
        </div>
      </div>
    );
  }

  // 인증이 필요한 페이지에 접근하려는 경우 (인증되지 않은 상태이고 로그인 페이지가 아닌 경우)
  if (!isAuthenticated && location.pathname !== '/login') {
    return (
      <div className="flex flex-col min-h-screen max-w-[430px] w-full mx-auto relative overflow-y-auto bg-white dark:bg-gray-900 text-mainText dark:text-white justify-center items-center">
        <div className="text-center">
          <p className="mb-2">로그인이 필요한 페이지입니다</p>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            로그인 페이지로 이동
          </button>
        </div>
      </div>
    );
  }

  // 정상적인 레이아웃 표시 (인증됨 또는 로그인 페이지)
  return (
    <div className="flex flex-col min-h-screen max-w-[430px] w-full mx-auto relative overflow-y-auto bg-white dark:bg-gray-900 text-mainText dark:text-white">
      <Header />
      {/* 헤더 높이만큼 상단 패딩 추가 */}
      <main className="flex-1 py-16">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Layout;
