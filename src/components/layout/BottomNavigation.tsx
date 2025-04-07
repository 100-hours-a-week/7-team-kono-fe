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

  // 활성화된 아이템에 적용할 스타일
  const activeStyle = "text-blue-500";
  const inactiveStyle = "text-toastBg";

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
        {/* Link 컴포넌트가 li 전체를 차지하도록 수정 */}
        <Link 
          to={to} 
          className="flex flex-col items-center justify-center h-full w-full group relative py-2 touch-manipulation"
        >
          {/* 아이콘 컨테이너 - 높이를 지정하여 공간 확보 */}
          <div className="relative h-7 flex items-center transition-all duration-200 ease-in-out hover:scale-105 active:scale-95">
            <Icon 
              className={`text-xl transition-all duration-200 ease-in-out ${active ? activeStyle : inactiveStyle}`} 
            />
            
            {/* 활성화된 경우 아이콘 아래에 작은 점 표시 - 위치 조정 */}
            {active && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
            )}
          </div>
          
          {/* 텍스트에 여백 추가 */}
          <span className={`text-xs mt-2 transition-all duration-200 ease-in-out ${active ? activeStyle : inactiveStyle}`}>
            {label}
          </span>
          
          {/* 클릭 시 파장 효과 (Ripple Effect) */}
          <span className="absolute inset-0 w-full h-full bg-blue-500 opacity-0 rounded-lg group-active:opacity-10 group-active:scale-95 transition-all duration-300" />
          
          {/* 활성화된 경우 배경 효과 */}
          {active && (
            <span className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20 rounded-lg opacity-30" />
          )}
        </Link>
      </li>
    );
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 max-w-[430px] w-full mx-auto bg-white border-t border-gray-200 z-10 dark:border-0 dark:bg-gray-900 dark:text-white">
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