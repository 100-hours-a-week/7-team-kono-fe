import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
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
import { ThemeProvider } from './contexts/ThemeContext.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
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
      // {
      //   path: 'trade',
      //   element: <Trade />,
      // },
      // {
      //   path: 'trade/:ticker',
      //   element: <Trade />,
      // },
      {
        path: 'transaction',
        element: <Transaction />,
      },
      // {
      //   path: 'coins/:ticker/buy',
      //   element: <Trade />,
      // },
      // {
      //   path: 'coins/:ticker/sell',
      //   element: <Trade />,
      // },
      {
        path: 'coins/:ticker/:type',
        element: <Trade />,
      },
      {
        path: 'coins/:ticker',
        element: <CoinDetail />,
      },
      {
        path: 'oauth/kakao/callback',
        element: <KakaoCallback />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
