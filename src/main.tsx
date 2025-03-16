import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound.tsx';
import Wallet from './pages/Wallet.tsx';
import Discover from './pages/Discover.tsx';
import Favorites from './pages/Favorites.tsx';
import Rankings from './pages/Rankings.tsx';
import Settings from './pages/Settings.tsx';
import CoinDetail from './pages/CoinDetail.tsx';
import Profile from './pages/Profile.tsx';
import Trade from './pages/Trade.tsx';
import Transaction from './pages/Transaction.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Favorites />,
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
        element: <Favorites />,
      },
      {
        path: 'rankings',
        element: <Rankings />,
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
        path: 'trade',
        element: <Trade />,
      },
      {
        path: 'transaction',
        element: <Transaction />,
      },
      {
        path: 'coin/:ticker',
        element: <CoinDetail />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
