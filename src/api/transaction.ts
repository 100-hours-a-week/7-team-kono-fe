import api from './clients';
import { API_ENDPOINTS } from '../config/apiEndpoints';

export type Transaction = {
  id: string;
  nickname: string;
  type: string;
  coinName: string;
  ticker: string;
  amount: number;
  price: number;
  total: number;
  date: string;
};

/**
 * 특정 사용자의 거래 내역을 조회하는 함수
 * @param nickname 사용자 닉네임 (기본값: 'test')
 * @returns 사용자의 거래 내역 배열
 */
export const getTransactionsByNickname = async (
  nickname: string = 'test',
): Promise<Transaction[]> => {
  try {
    const res= await api.get(API_ENDPOINTS.GET_TRANSACTION);
    // 응답이 배열인지 확인
    console.log(res.data);
    return Array.isArray(res.data) ? res.data : [];

  } catch (error) {
    console.error(`${ticker} 코인 거래 내역 조회 오류:`, error);
    return [];
  }
};

/**
 * 특정 유형의 거래 내역을 조회하는 함수 (예: 매수, 매도)
 * @param nickname 사용자 닉네임 (기본값: 'test')
 * @param type 거래 유형 ('buy' 또는 'sell')
 * @returns 해당 유형의 거래 내역 배열
 */
export const getTransactionsByType = async (
  nickname: string = 'test',
  type: 'buy' | 'sell',
): Promise<Transaction[]> => {
  try {
    const transactions = await getTransactionsByNickname(nickname);
    return transactions.filter((transaction) => transaction.type === type);
  } catch (error) {
    console.error(`${type} 유형 거래 내역 조회 오류:`, error);
    return [];
  }
};