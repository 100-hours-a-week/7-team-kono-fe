import api from './clients';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import { MESSAGES } from '../config/constants';

export const getFavoriteList = async (): Promise<[]> => {
  try {
    const res = await api.get(API_ENDPOINTS.GET_FAVORITE);
    return res.data.data;
  } catch (error) {
    console.error(MESSAGES.ERROR.FAVORITES.INITIALIZE_FAILED, error);
    return [];
  }
};

export const isFavoriteCoin = async (ticker: string): Promise<boolean> => {
  try {
    const res = await api.get(API_ENDPOINTS.GET_IS_FAVORITE(ticker));
    return res.data.data;
  } catch (error) {
    console.error(MESSAGES.ERROR.FAVORITES.GET_STATUS_FAILED, error);
    return false;
  }
};

export const addFavorite = async (ticker: string) => {
  try {
    await api.post(API_ENDPOINTS.POST_FAVORITE(ticker));
    return true;
  } catch (error) {
    console.error(MESSAGES.ERROR.FAVORITES.ADD_FAILED, error);
    return false;
  }
};

export const removeFavorite = async (ticker: string) => {
  try {
    await api.delete(API_ENDPOINTS.DELETE_FAVORITE(ticker));
    return true;
  } catch (error) {
    console.error(MESSAGES.ERROR.FAVORITES.REMOVE_FAILED, error);
    return false;
  }
};
