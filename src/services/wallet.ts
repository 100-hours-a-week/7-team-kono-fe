import api from './clients';
import { API_ENDPOINTS } from '../config/apiEndpoints';

export const getQuantityByTicker = async (ticker: string) => {
  try {
    const res = await api.get(API_ENDPOINTS.GET_IS_HOLDING_COIN(ticker));
    return res.data.data.holdingQuantity;
  } catch (error) {
    console.error(`Error fetching wallet data for ${ticker}:`, error);
    return 0;
  }
};

export const getHoldingCoins = async (): Promise<string[]> => {
  try {
    const response = await api.get(API_ENDPOINTS.GET_HOLDING_COIN);

    return response.data.data;
  } catch (error) {
    console.error(`Error fetching holding coins ticker and name:`, error);
    return [];
  }
};

export const getTransactions = async (): Promise<any[]> => {
  try {
    const response = await api.get(API_ENDPOINTS.GET_TRANSACTION);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching transactions:`, error);
    return [];
  }
};

export const getBalance = async (): Promise<number> => {
  try {
    const response = await api.get(API_ENDPOINTS.GET_CASH);

    return response.data.data.cash;
  } catch (error) {
    console.error('잔액 조회 중 오류 발생:', error);
    return 0;
  }
};
