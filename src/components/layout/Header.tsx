import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  rightElement?: React.ReactNode;
  centerTitle?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, rightElement, centerTitle = true }) => {
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 left-0 right-0 z-20 max-w-[430px] w-full mx-auto bg-white border-b border-gray-200 dark:border-0 dark:bg-gray-900 dark:text-white">
      {/* 내부 컨테이너 - 최대 너비 제한 */}
      <div className="max-w-[430px] w-full mx-auto flex justify-between items-center h-14 px-4 relative">
        <div className="flex items-center">
          <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center"
          >
            <IoIosArrowBack className="text-2xl text-gray-500 dark:text-white" />
          </button>

          {/* 화살표 옆에 제목 표시 (centerTitle이 false일 때) */}
          {!centerTitle && title && (
              <h1 className="text-lg font-medium ml-2">
                {title}
              </h1>
          )}
        </div>

        {/* 중앙 제목 (centerTitle이 true일 때만 표시) */}
        {centerTitle && title && (
            <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-medium">
              {title}
            </h1>
        )}

        {/* 오른쪽 여백용 */}
        <div className="w-10 h-10 flex items-center justify-center">
          {rightElement}
        </div>
      </div>
    </header>
  );
};

export default Header;
