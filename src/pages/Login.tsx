import React from 'react';
import KakaoLoginButton from '../components/auth/KakaoLoginButton';
import konoLogo from '../assets/kono_logo.svg';

const Login: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>

        <div className="space-y-4">
          {/* 기존 로그인 폼이 있다면 여기에 */}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">또는</span>
            </div>
          </div>

          <KakaoLoginButton />
        </div>
      </div>
    </div>
  );
};

export default Login;
