import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
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
import KakaoCallback from './pages/KakaoCallback.tsx';
import Layout from './components/layout/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Favorite />,
          },
          {
            path: 'login',
            element: <Login />,
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
            path: 'favorites',
            element: <Favorite />,
          },
          {
            path: 'rankings',
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
          {
            path: 'coins/ticker',
            element: <CoinDetail />,
          },
          {
            path: 'oauth/kakao/callback',
            element: <KakaoCallback />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
