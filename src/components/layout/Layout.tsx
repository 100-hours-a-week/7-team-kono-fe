import React from 'react';
import Header from './Header';
import BottomNavigation from './BottomNavigation';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

const Layout: React.FC = () => {
  const { darkMode } = useTheme();

  return (
    <div className="flex flex-col min-h-screen max-w-[430px] w-full mx-auto relative overflow-y-auto bg-white dark:bg-gray-900 text-mainText dark:text-white">
      <Header />
      {/* 헤더 높이만큼 상단 패딩 추가 */}
      <main className="flex-1 pt-16 pb-16">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Layout;
