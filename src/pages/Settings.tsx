import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import { ROUTES } from '../config/routes';
import {
  FaGithub,
  FaUser,
  FaSignOutAlt,
  FaInfoCircle,
  FaUserMinus,
  FaExclamationTriangle,
} from 'react-icons/fa';
import DarkModeToggle from '../components/theme/DarkModeToggle';
import Modal from '../components/modal/Modal';
import { withdrawUser } from '../api/user';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

const Settings = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  const openGitHubWiki = () => {
    window.open(
      'https://github.com/100-hours-a-week/7-team-secretjuju-kono-wiki/wiki',
      '_blank',
    );
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('로그아웃 되었습니다.');
    } catch (err) {
      console.error('로그아웃 실패:', err);
      toast.error('로그아웃 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteAccount = () => {
    setShowDeleteAccountModal(true);
  };

  const closeDeleteAccountModal = () => {
    setShowDeleteAccountModal(false);
  };

  const confirmDeleteAccount = async () => {
    try {
      await withdrawUser();
      toast.success('회원탈퇴가 완료되었습니다.');
      closeDeleteAccountModal();
      window.location.href = ROUTES.AUTH.LOGIN;
    } catch (err: any) {
      console.error('회원탈퇴 실패:', err);
      if (err.response?.status === 401) {
        toast.error('로그인이 필요합니다.');
      } else if (err.response?.status === 403) {
        toast.error('탈퇴 권한이 없습니다.');
      } else {
        toast.error('회원탈퇴 처리 중 오류가 발생했습니다.');
      }
      closeDeleteAccountModal();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="설정" />

      {/* 다크 모드 설정 */}
      <div className="mx-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-4 border border-gray-200 dark:border-gray-700">
        <div className="p-4">
          <DarkModeToggle />
        </div>
      </div>

      {/* 프로필 수정 */}
      <div className="mx-4 mt-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-4 border border-gray-200 dark:border-gray-700">
        <button
          onClick={() => navigate('/profile')}
          className="w-full text-left p-4 flex items-center"
        >
          <FaUser className="text-gray-500 dark:text-gray-400 mr-3" />
          <span className="text-base">프로필 수정</span>
        </button>
      </div>

      {/* 앱 정보 섹션 */}
      <div className="mx-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-4 border border-gray-200 dark:border-gray-700">
        <h2 className="p-4 border-b dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400">
          앱 정보
        </h2>

        {/* 개발자 정보 */}
        <button
          onClick={openGitHubWiki}
          className="w-full text-left p-4 flex items-center border-b dark:border-gray-700"
        >
          <FaGithub className="text-gray-500 dark:text-gray-400 mr-3" />
          <div>
            <span className="text-base block">개발자 정보</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              7-team-secretjuju
            </span>
          </div>
        </button>

        {/* 앱 버전 */}
        <div className="p-4 flex items-center">
          <FaInfoCircle className="text-gray-500 dark:text-gray-400 mr-3" />
          <div>
            <span className="text-base block">앱 버전</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              1.0.0
            </span>
          </div>
        </div>
      </div>

      {/* 계정 관리 섹션 */}
      <div className="mx-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-4 border border-gray-200 dark:border-gray-700">
        <h2 className="p-4 border-b dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400">
          계정 관리
        </h2>

        {/* 로그아웃 */}
        <button
          onClick={handleLogout}
          className="w-full text-left p-4 flex items-center text-red-500"
        >
          <FaSignOutAlt className="mr-3" />
          <span className="text-base">로그아웃</span>
        </button>
      </div>

      {/* 회원 탈퇴 */}
      <div className="mx-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-4 border border-gray-200 dark:border-gray-700">
        <button
          onClick={handleDeleteAccount}
          className="flex items-center w-full text-left p-4 text-red-500"
        >
          <FaUserMinus className="mr-3" />
          <span className="text-base">회원 탈퇴</span>
        </button>
      </div>

      {/* 회원 탈퇴 확인 모달 */}
      <Modal
        isOpen={showDeleteAccountModal}
        onClose={closeDeleteAccountModal}
        actions={
          <>
            <button
              onClick={closeDeleteAccountModal}
              className="flex-1 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              취소
            </button>
            <button
              onClick={confirmDeleteAccount}
              className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              탈퇴하기
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <FaExclamationTriangle className="text-4xl text-red-500" />
          </div>
          <p className="text-center font-medium dark:text-white">
            정말 탈퇴하시겠습니까?
          </p>
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            회원 탈퇴 시 모든 데이터가 삭제되며 <br /> 복구할 수 없습니다.
          </p>
        </div>
      </Modal>

      {/* 푸터 */}
      <div className="mt-auto p-4 text-center text-xs text-gray-500 dark:text-gray-400">
        <p>© 2025 KONO. All rights reserved.</p>
        <p className="mt-1">Made with full heart by Team Secret JuJu</p>
      </div>
    </div>
  );
};

export default Settings;
