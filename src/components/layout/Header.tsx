import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  rightElement?: React.ReactNode;
  centerTitle?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  rightElement,
  centerTitle = true,
}) => {
  const navigate = useNavigate();
  return (
    <header className="w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white sticky top-0 z-30">
      {/* Inner container - max width constraint */}
      <div className="max-w-[430px] mx-auto h-14 px-4 flex items-center justify-between">
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

        {/* Right spacing */}
        <div className="w-10 h-10 flex items-center justify-center">
          {rightElement}
        </div>
      </div>
    </header>
  );
};

export default Header;
