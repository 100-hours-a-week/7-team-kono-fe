import api from './clients';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import { MESSAGES } from '../config/constants';

export type OrderType = 'buy' | 'sell';

export const getCoinName = async (ticker: string): Promise<string | null> => {
  try {
    const response = await api.get(API_ENDPOINTS.GET_COIN_DETAIL(ticker));
    if (response.data) {
      return response.data.kr_coin_name;
    }
    console.error(MESSAGES.ERROR.COINS.INVALID_DATA_FORMAT, response.data);
    return null;
  } catch (error) {
    console.error(MESSAGES.ERROR.COINS.GET_NAME_FAILED, error);
    return null;
  }
};

export const getCoins = async (): Promise<[]> => {
  try {
    const response = await api.get(API_ENDPOINTS.GET_COINS);
    return response.data.data || [];
  } catch (error) {
    console.error(MESSAGES.ERROR.COINS.GET_LIST_FAILED, error);
    return [];
  }
};
