import React, { useState, useEffect, useRef } from 'react';
import {
  getUserProfile,
  updateProfileImage,
  updateNickname,
} from '../api/user';
import { toast } from 'react-toastify';

interface ProfileData {
  nickname: string;
  profileImage: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [nickname, setNickname] = useState('');
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 더미 프로필 데이터 추가
  const dummyProfile = {
    nickname: '사용자',
    profileImage: 'https://via.placeholder.com/150',
  };

  const [useRealData, setUseRealData] = useState(false);
  const [profileData, setProfileData] = useState(null);

  // 실제 데이터를 가져오는 함수 (필요한 경우 구현)
  const fetchProfileData = async () => {
    setLoading(true);
    try {
      // API 호출 등을 통해 실제 데이터 가져오기
      // const response = await api.getProfile();
      // setProfileData(response.data);
    } catch (error) {
      console.error('프로필 데이터를 가져오는 중 오류 발생:', error);
    } finally {
      setLoading(false);
    }
  };

  // 실제 데이터를 사용할 경우에만 데이터 가져오기
  useEffect(() => {
    if (useRealData) {
      fetchProfileData();
    }
  }, [useRealData]);

  // 더미 데이터 또는 실제 데이터 사용
  const displayProfile = error || !profileData ? dummyProfile : profileData;

  // 프로필 정보 로드
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const data = await getUserProfile();
        setProfile(data);
        setNickname(data.nickname);
      } catch (err) {
        setError(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // 프로필 이미지 변경 핸들러
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    // 이미지 파일 타입 검증
    if (!file.type.startsWith('image/')) {
      toast.error('이미지 파일만 업로드 가능합니다.');
      return;
    }

    try {
      setImageUploading(true);
      await updateProfileImage(file);

      // 프로필 정보 다시 로드
      const updatedProfile = await getUserProfile();
      setProfile(updatedProfile);

      toast.success('프로필 이미지가 업데이트되었습니다.');
    } catch (err) {
      toast.error('이미지 업로드에 실패했습니다.');
      console.error(err);
    } finally {
      setImageUploading(false);
    }
  };

  // 닉네임 변경 핸들러
  const handleNicknameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nickname.trim()) {
      toast.error('닉네임을 입력해주세요.');
      return;
    }

    try {
      await updateNickname(nickname);

      // 프로필 정보 다시 로드
      const updatedProfile = await getUserProfile();
      setProfile(updatedProfile);

      setIsEditingNickname(false);
      toast.success('닉네임이 업데이트되었습니다.');
    } catch (err) {
      toast.error('닉네임 변경에 실패했습니다.');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="profile-container"
      style={{ padding: '20px', textAlign: 'center' }}
    >
      {error ? (
        // 에러 상태일 때 더미 데이터로 프로필 표시
        <div>
          <div style={{ marginBottom: '20px', color: '#888' }}>
            (더미 데이터를 사용하여 표시 중입니다)
          </div>
          <div className="profile-content">
            <img
              src={displayProfile.profileImage}
              alt="프로필 이미지"
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                marginBottom: '15px',
              }}
            />
            <h2 style={{ color: '#fff' }}>{displayProfile.nickname}</h2>
          </div>
        </div>
      ) : (
        // 정상 상태일 때 실제 프로필 표시
        <div className="profile-content">
          <img
            src={displayProfile.profileImage}
            alt="프로필 이미지"
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              marginBottom: '15px',
            }}
          />
          <h2 style={{ color: '#fff' }}>{displayProfile.nickname}</h2>
        </div>
      )}
    </div>
  );
};

export default Profile;
