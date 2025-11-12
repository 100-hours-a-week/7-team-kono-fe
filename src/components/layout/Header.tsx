import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaHistory } from 'react-icons/fa';
import { ROUTES } from '../../config/routes';

export interface HeaderOverride {
  title?: string;
  rightElement?: React.ReactNode;
  centerTitle?: boolean;
}

interface HeaderProps {
  override?: HeaderOverride;
}

const Header: React.FC<HeaderProps> = ({ override }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const getHeaderConfig = () => {
    if (override) {
      return {
        title: override.title || '',
        rightElement: override.rightElement || null,
        centerTitle:
          override.centerTitle !== undefined ? override.centerTitle : true,
      };
    }

    const path = location.pathname;

    if (path === '/wallet') {
      return {
        title: t('pages.wallet'),
        rightElement: (
          <button onClick={() => navigate(ROUTES.TRANSACTION)}>
            <FaHistory className="mr-1 text-xl text-gray-500 dark:text-white" />
          </button>
        ),
        centerTitle: true,
      };
    }

    const routeMap: Record<string, string> = {
      '/discover': 'pages.discover',
      '/favorites': 'pages.favorites',
      '/rankings': 'pages.rankings',
      '/settings': 'pages.settings',
      '/profile': 'pages.profile',
      '/transactions': 'pages.transactions',
    };

    if (routeMap[path]) {
      return {
        title: t(routeMap[path]),
        rightElement: null,
        centerTitle: true,
      };
    }

    if (path.startsWith('/coins/')) {
      return {
        title: '',
        rightElement: null,
        centerTitle: true,
      };
    }

    if (path.startsWith('/trade/')) {
      return {
        title: t('pages.trade'),
        rightElement: null,
        centerTitle: true,
      };
    }

    return {
      title: '',
      rightElement: null,
      centerTitle: true,
    };
  };

  const { title, rightElement, centerTitle } = getHeaderConfig();

  return (
    <header className="fixed top-0 left-0 right-0 w-full max-w-[430px] mx-auto bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white z-30">
      {/* Inner container - max width constraint */}
      <div className="h-14 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center"
          >
            <IoIosArrowBack className="text-2xl text-gray-500 dark:text-white" />
          </button>

          {/* Show title next to arrow (when centerTitle is false) */}
          {!centerTitle && title && (
            <h1 className="text-lg font-medium ml-2">{title}</h1>
          )}
        </div>

        {/* Center title (shown only when centerTitle is true) */}
        {centerTitle && title && (
          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-medium">
            {title}
          </h1>
        )}

        {/* Right element */}
        <div className="w-10 h-10 flex items-center justify-center">
          {rightElement}
        </div>
      </div>
    </header>
  );
};

export default Header;
