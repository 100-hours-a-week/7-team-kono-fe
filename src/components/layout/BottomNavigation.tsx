import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdWallet } from 'react-icons/md';
import { FaCompass } from 'react-icons/fa';
import { ROUTES } from '../../config/routes';
import { FaHeart } from 'react-icons/fa';
import { FaCrown } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // 각 메뉴에 속하는 경로 매핑
  const pathMappings = {
    wallet: [ROUTES.WALLET, ROUTES.TRANSACTION], // 지갑 및 거래내역
    discover: [ROUTES.DISCOVER, '/coins'], // 탐색 및 코인 상세
    favorite: [ROUTES.FAVORITE], // 관심종목
    ranking: [ROUTES.RANKING], // 랭킹
    settings: [ROUTES.SETTINGS, '/profile'] // 설정 및 프로필
  };

  // 경로에 따른 활성화 여부 확인 함수
  const isActive = (category: 'wallet' | 'discover' | 'favorite' | 'ranking' | 'settings'): boolean => {
    return pathMappings[category].some(path => {
      // 정확한 경로 일치 확인 (예: /wallet)
      if (currentPath === path) return true;
      
      // 하위 경로 확인 (예: /coins/btc)
      if (path !== '/' && currentPath.startsWith(path)) return true;
      
      return false;
    });
  };


  // 네비게이션 아이템 컴포넌트
  const NavItem = ({ 
    to, 
    category, 
    icon: Icon, 
    label 
  }: { 
    to: string; 
    category: 'wallet' | 'discover' | 'favorite' | 'ranking' | 'settings'; 
    icon: React.ElementType; 
    label: string 
  }) => {
    const active = isActive(category);
    


return (
  <li className="flex-1 h-full">
    <Link 
      to={to} 
      className="flex flex-col items-center justify-center h-full w-full group relative touch-manipulation"
    >
      <div className="relative h-7 flex items-center transition-all duration-200 ease-in-out">
        <Icon 
          className={`text-xl transition-all duration-200 ease-in-out ${active ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`} 
        />
      </div>
      
      <span className={`text-xs mt-1 transition-all duration-200 ease-in-out ${active ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}>
        {label}
      </span>
      
      {active && (
        <span className="absolute inset-x-0 top-0 h-0.5 bg-blue-500 rounded-full" />
      )}
    </Link>
  </li>
);
};

return (
<footer className="fixed bottom-0 left-0 right-0 max-w-[430px] w-full mx-auto backdrop-blur-md bg-white/70 dark:bg-black/40 border-t border-gray-200/30 dark:border-gray-700/30 z-10">
  <nav className="max-w-[430px] mx-auto">
    <ul className="flex h-16 w-full">
      <NavItem to={ROUTES.WALLET} category="wallet" icon={MdWallet} label="지갑" />
      <NavItem to={ROUTES.DISCOVER} category="discover" icon={FaCompass} label="탐색" />
      <NavItem to={ROUTES.FAVORITE} category="favorite" icon={FaHeart} label="관심종목" />
      <NavItem to={ROUTES.RANKING} category="ranking" icon={FaCrown} label="랭킹" />
      <NavItem to={ROUTES.SETTINGS} category="settings" icon={IoMdSettings} label="설정" />
    </ul>
  </nav>
</footer>
);
};

export default BottomNavigation;