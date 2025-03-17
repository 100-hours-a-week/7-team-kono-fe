import { IoIosArrowBack } from 'react-icons/io';
import styles from '../../assets/style';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  rightElement?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, rightElement }) => {
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-white border-b border-gray-200">
      {/* 내부 컨테이너 - 최대 너비 제한 */}
      <div className="max-w-[430px] w-full mx-auto flex justify-between items-center h-14 px-4 relative">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center -ml-1"
        >
          <IoIosArrowBack className="text-2xl text-gray-500" />
        </button>

        {/* 중앙 제목 */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-medium">
          {title}
        </h1>

        {/* 오른쪽 여백용 */}
        <div className="w-10 h-10 flex items-center justify-center">
          {rightElement}
        </div>
      </div>
    </header>
  );
};

export default Header;

// import React from 'react';

// interface HeaderProps {
//   title: string;
//   leftElement?: React.ReactNode;
//   rightElement?: React.ReactNode;
// }

// const Header: React.FC<HeaderProps> = ({
//   title,
//   leftElement,
//   rightElement,
// }) => {
//   return (
//     <div className="bg-white p-4 flex items-center justify-between">
//       <div className="w-24">{leftElement}</div>
//       <h1 className="text-xl font-bold">{title}</h1>
//       <div className="w-24 flex justify-end">{rightElement}</div>
//     </div>
//   );
// };

// export default Header;
