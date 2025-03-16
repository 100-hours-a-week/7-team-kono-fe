import React from 'react';
import Header from './Header';
import BottomNavigation from './BottomNavigation';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen max-w-[430px] w-full mx-auto relative">
      <Header />
      {/* 헤더 높이만큼 상단 패딩 추가 */}
      <main className="flex-1 pt-14 pb-16">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Layout;
