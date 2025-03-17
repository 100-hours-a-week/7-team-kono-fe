import React, { useEffect } from 'react';
import Layout from './components/layout/Layout';
import { initializeKakao } from './services/kakaoAuth';

function App() {
  useEffect(() => {
    // 앱 시작 시 카카오 SDK 초기화
    const loadKakaoSDK = () => {
      const script = document.createElement('script');
      script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
      script.async = true;
      script.onload = () => {
        initializeKakao();
      };
      document.head.appendChild(script);
    };

    loadKakaoSDK();
  }, []);

  return <Layout />;
}

export default App;
