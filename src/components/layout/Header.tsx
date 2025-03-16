// import { IoIosArrowBack } from 'react-icons/io';
// import styles from '../../assets/style';

// const Header: React.FC = () => {
//   return (
//     <header className={`${styles.flexBetween} fixed top-0 w-full max-w-680`}>
//       <button className="w-8 h-8">
//         <IoIosArrowBack className="text-2xl mr4 bg-grayBg" />
//       </button>
//       <h1 className="text-center bg-grayBg">헤더</h1>
//       <div className="w-8 h-8"></div>
//     </header>
//   );
// };

// export default Header;

import { IoIosArrowBack } from 'react-icons/io';
import styles from '../../assets/style';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-white border-b border-gray-200">
      {/* 내부 컨테이너 - 최대 너비 제한 */}
      <div className="max-w-[430px] w-full mx-auto flex justify-between items-center h-14 px-4 relative">
        <button className="w-10 h-10 flex items-center justify-center -ml-1">
          <IoIosArrowBack className="text-2xl" />
        </button>

        {/* 중앙 제목 */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-medium">
          헤더
        </h1>

        {/* 오른쪽 여백용 */}
        <div className="w-10 h-10"></div>
      </div>
    </header>
  );
};

export default Header;
