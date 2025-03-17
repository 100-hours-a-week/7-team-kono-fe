import { useState, useRef, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack, IoIosClose } from 'react-icons/io';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import Header from '../components/layout/Header';

export default function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 상태 관리
  const [nickname, setNickname] = useState('코인마스터');
  const [profileImage, setProfileImage] = useState<string | null>(
    'https://static.upbit.com/logos/BTC.png',
  );
  const [isEditing, setIsEditing] = useState(false);
  const [tempNickname, setTempNickname] = useState(nickname);
  const [error, setError] = useState('');

  // 허용된 이미지 타입
  const allowedImageTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
  ];

  // 프로필 이미지 선택
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // 이미지 파일 변경 처리
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 크기 체크 (5MB 제한)
      if (file.size > 5 * 1024 * 1024) {
        setError('이미지 크기는 5MB 이하여야 합니다.');
        return;
      }

      // 이미지 타입 체크
      if (!allowedImageTypes.includes(file.type)) {
        setError('JPG, JPEG, PNG, WEBP 형식의 이미지만 업로드 가능합니다.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  // 닉네임 수정 모드 시작
  const startEditing = () => {
    setIsEditing(true);
    setTempNickname(nickname);
  };

  // 닉네임 수정 취소
  const cancelEditing = () => {
    setIsEditing(false);
    setTempNickname(nickname);
    setError('');
  };

  // 닉네임 저장
  const saveNickname = () => {
    // 닉네임 유효성 검사
    if (!tempNickname.trim()) {
      setError('닉네임을 입력해주세요.');
      return;
    }

    if (tempNickname.length < 2 || tempNickname.length > 10) {
      setError('닉네임은 2~10자 사이여야 합니다.');
      return;
    }

    // 닉네임 저장 로직
    setNickname(tempNickname);
    setIsEditing(false);
    setError('');

    // API 호출 (실제 구현 시)
    // fetch(API_ENDPOINTS.USERS.NICKNAME, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ nickname: tempNickname })
    // });
  };

  // 프로필 저장
  const saveProfile = () => {
    // 프로필 저장 로직 (실제 구현 시)
    // 이미지와 닉네임 모두 저장
    navigate('/settings');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header title="프로필 수정" />

      {/* 프로필 이미지 섹션 */}
      <div className="flex flex-col items-center mt-8">
        <div className="relative">
          <div
            className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100 flex items-center justify-center"
            onClick={handleImageClick}
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="프로필"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-4xl">BTC</span>
            )}
          </div>

          {/* 이미지 변경 버튼 */}
          <button
            className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
            onClick={handleImageClick}
          >
            +
          </button>

          {/* 숨겨진 파일 입력 */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleImageChange}
          />
        </div>

        <button
          className="mt-2 text-blue-500 text-sm"
          onClick={handleImageClick}
        >
          프로필 이미지 변경
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      {/* 닉네임 섹션 */}
      <div className="mx-4 mt-8 bg-white rounded-xl p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-medium">닉네임</h2>
          {!isEditing && (
            <button className="text-blue-500 text-sm" onClick={startEditing}>
              수정
            </button>
          )}
        </div>

        {isEditing ? (
          <div>
            <div className="relative">
              <input
                type="text"
                value={tempNickname}
                onChange={(e) => setTempNickname(e.target.value)}
                className="w-full p-3 bg-gray-100 rounded-xl pr-10"
                maxLength={10}
              />
              {tempNickname && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setTempNickname('')}
                >
                  <IoIosClose className="text-2xl" />
                </button>
              )}
            </div>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            <div className="text-right text-sm text-gray-500 mt-1">
              {tempNickname.length}/10
            </div>

            <div className="flex gap-3 mt-4">
              <button
                className="flex-1 py-3 rounded-xl bg-gray-200 text-gray-700 font-medium"
                onClick={cancelEditing}
              >
                취소
              </button>
              <button
                className="flex-1 py-3 rounded-xl bg-blue-500 text-white font-medium"
                onClick={saveNickname}
              >
                저장
              </button>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-gray-100 rounded-xl">{nickname}</div>
        )}
      </div>

      {/* 저장 버튼 */}
      <div className="fixed bottom-16 left-0 right-0 max-w-[430px] mx-auto p-4">
        <button
          className="w-full py-4 rounded-xl bg-blue-500 text-white font-bold"
          onClick={saveProfile}
        >
          수정하기
        </button>
      </div>
    </div>
  );
}
