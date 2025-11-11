import api from './clients';
import { API_ENDPOINTS } from '../config/apiEndpoints';

export type Transaction = {
  transactionId: string;
  orderType: string;
  coinName: string;
  ticker: string;
  orderQuantity: number;
  orderPrice: number;
  orderAmount: number;
  createdAt: string;
};

export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    const res = await api.get(API_ENDPOINTS.GET_TRANSACTION);
    return res.data.data;
  } catch (error) {
    console.error(`거래 내역 조회 오류:`, error);
    return [];
  }
};

export const getTransactionsByType = async (
  type: 'buy' | 'sell',
): Promise<Transaction[]> => {
  try {
    const transactions = await getTransactions();
    return transactions.filter((transaction) => transaction.orderType === type);
  } catch (error) {
    console.error(`${type} 유형 거래 내역 조회 오류:`, error);
    return [];
  }
};
