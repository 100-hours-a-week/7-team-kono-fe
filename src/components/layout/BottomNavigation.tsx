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
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10  dark:border-0 dark:bg-gray-900 dark:text-white">
      <nav className="max-w-[430px] mx-auto">
        <ul className="flex justify-around items-center h-16">
          <li>
            <Link to={ROUTES.WALLET}>
              <MdWallet className="text-2xl mr4 text-toastBg" />
            </Link>
          </li>
          <li>
            <Link to={ROUTES.DISCOVER}>
              <FaCompass className="text-2xl mr4 text-toastBg" />
            </Link>
          </li>
          <li>
            <Link to={ROUTES.FAVORITES}>
              <FaHeart className="text-2xl mr4 text-toastBg" />
            </Link>
          </li>
          <li>
            <Link to={ROUTES.RANKINGS}>
              <FaCrown className="text-2xl mr4 text-toastBg" />
            </Link>
          </li>
          <li>
            <Link to={ROUTES.SETTINGS}>
              <IoMdSettings className="text-2xl mr4 text-toastBg" />
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default BottomNavigation;
