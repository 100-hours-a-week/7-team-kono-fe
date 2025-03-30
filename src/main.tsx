import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
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
