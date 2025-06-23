import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Clarity from '@microsoft/clarity';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound.tsx';
import Wallet from './pages/Wallet.tsx';
import Discover from './pages/Discover.tsx';
import Favorite from './pages/Favorite.tsx';
import Ranking from './pages/Ranking.tsx';
import Settings from './pages/Settings.tsx';
import CoinDetail from './pages/CoinDetail.tsx';
import Profile from './pages/Profile.tsx';
import Trade from './pages/Trade.tsx';
import Transaction from './pages/Transaction.tsx';
import Login from './pages/Login.tsx';
import Layout from './components/layout/Layout';
import AuthLayout from './components/layout/AuthLayout';
import KakoRedirectHandler from './components/auth/KakoRedirectHandler.tsx';

import * as Sentry from "@sentry/react"; //npm install @sentry/react @sentry/tracing

// Clarity 초기화
Clarity.init('r1aim0c7qk');

// 쿠키 동의 설정 (GDPR 준수)
Clarity.consent();

// AuthContext와 함께 사용하면 좋은 사용자 식별
const identifyUser = (userId: string, nickname: string) => {
  Clarity.identify(userId, undefined, undefined, nickname);
};

// 중요 이벤트 태깅
const setUserTags = (userId: string, userType: string) => {
  Clarity.setTag("userId", userId);
  Clarity.setTag("userType", userType);
  Clarity.setTag("platform", "web");
};

// 주요 이벤트 트래킹
const trackImportantEvent = (eventName: string) => {
  Clarity.event(eventName);
  // 중요 세션으로 업그레이드
  Clarity.upgrade(eventName);
};

// AuthContext에서 사용할 수 있도록 전역으로 노출
window.clarityHelpers = {
  identifyUser,
  setUserTags,
  trackImportantEvent
};

// 타입 정의 추가
declare global {
  interface Window {
    clarityHelpers: {
      identifyUser: (userId: string, nickname: string) => void;
      setUserTags: (userId: string, userType: string) => void;
      trackImportantEvent: (eventName: string) => void;
    };
  }
}

// Sentry 초기화 (기존 코드)
Sentry.init({
  dsn: "https://9ba5351ae2788a1039d336aeb4b88082@o4509077698707456.ingest.us.sentry.io/4509077976449024",
  integrations: [
    Sentry.browserTracingIntegration()
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/dev.playkono.com\.io\/api/]
});
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: 'login',
        element: (
          <AuthLayout>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: 'login/oauth',
        element: <KakoRedirectHandler />,
      },
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Favorite />,
          },
          {
            path: 'wallet',
            element: <Wallet />,
          },
          {
            path: 'discover',
            element: <Discover />,
          },
          {
            path: 'favorite',
            element: <Favorite />,
          },
          {
            path: 'ranking',
            element: <Ranking />,
          },
          {
            path: 'settings',
            element: <Settings />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'users/:nickname',
            element: <Profile />,
          },
          {
            path: 'transaction',
            element: <Transaction />,
          },
          {
            path: 'coins/:ticker/:type',
            element: <Trade />,
          },
          {
            path: 'coins/:ticker',
            element: <CoinDetail />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
