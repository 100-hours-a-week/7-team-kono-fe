import api from './clients';
import { API_ENDPOINTS } from '../config/apiEndpoints';

export type OrderType = 'buy' | 'sell';

export const getCoinName = async (ticker: string): Promise<string | null> => {
  try {
    const response = await api.get(API_ENDPOINTS.GET_COIN_DETAIL(ticker));

    if (response.data) {
      return response.data.kr_coin_name;
    }

    console.error('코인 데이터 형식이 예상과 다릅니다:', response.data);
    return null;
  } catch (err) {
    console.error(`코인 이름 조회 오류 (${ticker}):`, err);
    return null;
  }
};

export const getCoins = async (): Promise<[]> => {
  try {
    const response = await api.get(API_ENDPOINTS.GET_COINS);
    return response.data.data || [];
  } catch (err) {
    console.error(`코인 목록 조회 오류:`, err);
    return [];
  }
};
