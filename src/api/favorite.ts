import axios from 'axios';

interface FavoriteCoin {
  id: number;
  ticker: string;
  nickname: string;
}

// 초기 데이터 로드 (앱 시작시 한 번만 실행)
export const initializeFavorites = async () => {
  if (!localStorage.getItem('favorites')) {
    try {
      const res = await axios.get('/data/favorite.json');
      localStorage.setItem('favorites', JSON.stringify(res.data));
    } catch (error) {
      console.error('Failed to initialize favorites:', error);
      localStorage.setItem('favorites', JSON.stringify({ coin_favorites: [] }));
    }
  }
};

// 좋아요 목록 가져오기
export const getFavoriteList = async (nickname: string) => {
  await initializeFavorites(); // 초기 데이터가 없을 경우 로드
  const favorites = JSON.parse(
    localStorage.getItem('favorites') || '{"coin_favorites": []}',
  );
  return favorites.coin_favorites.filter(
    (favorite: FavoriteCoin) => favorite.nickname === nickname,
  );
};

// 코인이 관심 목록에 있는지 확인
export const isFavoriteCoin = async (nickname: string, ticker: string) => {
  const favorites = await getFavoriteList(nickname);
  return favorites.some((favorite: FavoriteCoin) => favorite.ticker === ticker);
};

// 좋아요 추가
export const addFavorite = async (nickname: string, ticker: string) => {
  try {
    const favorites = JSON.parse(
      localStorage.getItem('favorites') || '{"coin_favorites": []}',
    );
    const newFavorite = {
      id: Date.now(),
      ticker: ticker,
      nickname: nickname,
    };

    favorites.coin_favorites.push(newFavorite);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    return true;
  } catch (error) {
    console.error('Failed to add favorite:', error);
    return false;
  }
};

// 좋아요 삭제
export const removeFavorite = async (nickname: string, ticker: string) => {
  try {
    const favorites = JSON.parse(
      localStorage.getItem('favorites') || '{"coin_favorites": []}',
    );
    favorites.coin_favorites = favorites.coin_favorites.filter(
      (favorite: FavoriteCoin) =>
        !(favorite.nickname === nickname && favorite.ticker === ticker),
    );
    localStorage.setItem('favorites', JSON.stringify(favorites));
    return true;
  } catch (error) {
    console.error('Failed to remove favorite:', error);
    return false;
  }
};
