import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen max-w-[430px] w-full mx-auto relative overflow-y-auto bg-white dark:bg-gray-900 text-mainText dark:text-white">
      <main className="flex-1">{children || <Outlet />}</main>
    </div>
  );
};

export default AuthLayout;
