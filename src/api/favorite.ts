import axios from 'axios';

// 좋아요 목록 가져오기
export const getFavoriteList = async (nickname: string) => {
  const res = await axios.get('/data/favorite.json');
  return res.data.find((favorite: any) => favorite.nickname === nickname);
};

// 좋아요 추가
export const likeCoin = async (nickname: string, ticker: string) => {
  const res = await getFavoriteList(nickname);
  const favorite = res.find((favorite: any) => favorite.nickname === nickname);
  if (!favorite) {
    console.log('favorite not found');
    return;
  }
  favorite.ticker = ticker;
};

// 좋아요 삭제
export const unlikeCoin = async (nickname: string, ticker: string) => {
  const res = await getFavoriteList(nickname);
  const favorite = res.find((favorite: any) => favorite.nickname === nickname);
  if (!favorite) {
    console.log('favorite not found');
    return;
  }
  axios.delete(`/data/favorite.json`, { data: { nickname, ticker } });
};
