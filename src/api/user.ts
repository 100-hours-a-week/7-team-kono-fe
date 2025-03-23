import axios from 'axios';

// 사용자 프로필 정보 가져오기
export const getUserProfile = async () => {
  axios
    .get('/data/user.json') //
    .then((res) => {
      return res.data;
    }) //
    .catch((err) => {
      console.log(`get data/user.json error : ${err}`);
    });
};

// TODO: 프로필 이미지 S3
// 로 업데이트
export const updateProfileImage = async (
  userNickname: string,
  imageFile: File,
) => {
  const res = await getUserProfile();
  const user = res.find((user) => user.nickname === userNickname);
  if (!user) {
    console.log('user not found');
    return;
  }
  user.profileImage = imageFile;
  await axios.post('data/user.json', {
    profileImage: imageFile,
  });
};

// 닉네임 업데이트
export const updateNickname = async (nickname: string, newNickname: string) => {
  const res = await getUserProfile();
  const user = res.find((user) => user.nickname === nickname);
  if (!user) {
    console.log('user not found');
    return;
  }
  user.nickname = newNickname;

  await axios.post('data/user.json', {
    nickname,
  });
};

// 닉네임 별 잔액 조회
export const getBalanceByNickname = async (nickname: string) => {
  axios
    .get('/data/user.json') //
    .then((res) => {
      const user = res.data.find((user) => user.nickname === nickname);
      return user.balance;
    }) //
    .catch((err) => {
      console.log(`get data/user.json error : ${err}`);
    });
};
