import api from './clients';
import { API_ENDPOINTS } from '../config/apiEndpoints';

export const getFavoriteList = async (): Promise<[]> => {
  try {
    const res = await api.get(API_ENDPOINTS.GET_FAVORITE);
    return res.data.data;
  } catch (error) {
    console.error('Failed to initialize favorites:', error);
    return [];
  }
};

export const isFavoriteCoin = async (ticker: string): Promise<boolean> => {
  try {
    const res = await api.get(API_ENDPOINTS.GET_IS_FAVORITE(ticker));
    return res.data.data;
  } catch (error) {
    console.error('Failed to fetch favorite status:', error);
    return false;
  }
};

export const addFavorite = async (ticker: string) => {
  try {
    await api.post(API_ENDPOINTS.POST_FAVORITE(ticker));
    return true;
  } catch (error) {
    console.error(`관심 코인 추가 오류 (${ticker}):`, error);
    return false;
  }
};

export const removeFavorite = async (ticker: string) => {
  try {
    await api.delete(API_ENDPOINTS.DELETE_FAVORITE(ticker));
    return true;
  } catch (error) {
    console.error(`관심 코인 삭제 오류 (${ticker}):`, error);
    return false;
  }
};
