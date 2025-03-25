import api from './clients';
import { API_ENDPOINTS } from '../config/apiEndpoints';

interface FavoriteCoin {
  id: number;
  ticker: string;
  nickname: string;
}

/**
 * 사용자의 관심 코인 목록을 가져오는 함수
 * @param nickname 사용자 닉네임
 * @returns 관심 코인 목록 배열
 */
export const getFavoriteList = async (): Promise<FavoriteCoin[]> => {
  try {
    const response = await api.get(API_ENDPOINTS.GET_FAVORITE);

    // 백엔드에서 이미 필터링된 데이터를 반환하는 경우
    if (Array.isArray(response.data)) {
      return response.data;
    }

    // 백엔드에서 coin_favorites와 같은 객체 구조로 반환하는 경우
    // if (response.data && Array.isArray(response.data.coin_favorites)) {
    //   return response.data.coin_favorites;
    // }

    return [];
  } catch (error) {
    console.error('관심 코인 목록 조회 오류:', error);
    return [];
  }
};

/**
 * 특정 코인이 관심 목록에 있는지 확인하는 함수
 * @param nickname 사용자 닉네임
 * @param ticker 코인 티커 (예: BTC, ETH)
 * @returns 관심 목록 포함 여부 (true/false)
 */
export const isFavoriteCoin = async (
  nickname: string,
  ticker: string,
): Promise<boolean> => {
  try {
    // 백엔드에서 직접 확인하는 API가 있는 경우
    try {
      const response = await api.get(API_ENDPOINTS.POST_FAVORITE(ticker));
      return response.status === 200 && !!response.data.isFavorite;
    } catch (directCheckError) {
      // API가 없는 경우 목록을 가져와서 확인
      const favorites = await getFavoriteList(nickname);
      return favorites.some((favorite) => favorite.ticker === ticker);
    }
  } catch (error) {
    console.error(`관심 코인 확인 오류 (${ticker}):`, error);
    return false;
  }
};

/**
 * 관심 코인 추가 함수
 * @param ticker 코인 티커
 * @returns 성공 여부 (true/false)
 */
export const addFavorite = async (ticker: string): Promise<boolean> => {
  try {
    const response = await api.post(API_ENDPOINTS.POST_FAVORITE(ticker));
    return response.status === 200 || response.status === 201;
  } catch (error) {
    console.error(`관심 코인 추가 오류 (${ticker}):`, error);
    return false;
  }
};

/**
 * 관심 코인 삭제 함수
 * @param ticker 코인 티커
 * @returns 성공 여부 (true/false)
 */
export const removeFavorite = async (ticker: string): Promise<boolean> => {
  try {
    const response = await api.delete(API_ENDPOINTS.DELETE_FAVORITE(ticker));
    return response.status === 200;
  } catch (error) {
    console.error(`관심 코인 삭제 오류 (${ticker}):`, error);
    return false;
  }
};
