import React from 'react';
// import styles from '../../assets/style';
import { Link } from 'react-router-dom';
import { MdWallet } from 'react-icons/md';
import { FaCompass } from 'react-icons/fa';
import { ROUTES } from '../../config/routes';
import { FaHeart } from 'react-icons/fa';
import { FaCrown } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';

const BottomNavigation: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 max-w-[430px] w-full mx-auto bg-white border-t border-gray-200 z-10  dark:border-0 dark:bg-gray-900 dark:text-white">
      <nav className="max-w-[430px] mx-auto">
        <ul className="flex justify-around items-center h-16">
          <li className="flex flex-col items-center">
            <Link to={ROUTES.WALLET} className="flex flex-col items-center">
              <MdWallet className="text-2xl mb-1 text-toastBg" />
              <span className="text-xs text-toastBg">지갑</span>
            </Link>
          </li>
          <li className="flex flex-col items-center">
            <Link to={ROUTES.DISCOVER} className="flex flex-col items-center">
              <FaCompass className="text-2xl mb-1 text-toastBg" />
              <span className="text-xs text-toastBg">탐색</span>
            </Link>
          </li>
          <li className="flex flex-col items-center">
            <Link to={ROUTES.FAVORITE} className="flex flex-col items-center">
              <FaHeart className="text-2xl mb-1 text-toastBg" />
              <span className="text-xs text-toastBg">관심종목</span>
            </Link>
          </li>
          <li className="flex flex-col items-center">
            <Link to={ROUTES.RANKING} className="flex flex-col items-center">
              <FaCrown className="text-2xl mb-1 text-toastBg" />
              <span className="text-xs text-toastBg">랭킹</span>
            </Link>
          </li>
          <li className="flex flex-col items-center">
            <Link to={ROUTES.SETTINGS} className="flex flex-col items-center">
              <IoMdSettings className="text-2xl mb-1 text-toastBg" />
              <span className="text-xs text-toastBg">설정</span>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default BottomNavigation;
