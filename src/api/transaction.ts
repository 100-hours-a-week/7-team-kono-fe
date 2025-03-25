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
    const response = await api.get(API_ENDPOINTS.GET_TRANSACTION);

    // 백엔드가 이미 필터링된 데이터를 제공하는 경우
    if (Array.isArray(response.data)) {
      return response.data;
    }

    // 백엔드가 필터링되지 않은 데이터를 제공하는 경우 클라이언트에서 필터링
    if (Array.isArray(response.data.transactions)) {
      return response.data.transactions.filter(
        (transaction: Transaction) => transaction.nickname === nickname,
      );
    }

    return [];
  } catch (error) {
    console.error('거래 내역 조회 오류:', error);
    return [];
  }
};

/**
 * 특정 코인에 대한 거래 내역을 조회하는 함수
 * @param nickname 사용자 닉네임 (기본값: 'test')
 * @param ticker 코인 티커 (예: BTC, ETH)
 * @returns 해당 코인의 거래 내역 배열
 */
export const getTransactionsByTickerAndNickname = async (
  nickname: string = 'test',
  ticker: string,
): Promise<Transaction[]> => {
  try {
    const transactions = await getTransactionsByNickname(nickname);
    return transactions.filter((transaction) => transaction.ticker === ticker);
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

// /**
//  * 특정 날짜 범위의 거래 내역을 조회하는 함수
//  * @param nickname 사용자 닉네임 (기본값: 'test')
//  * @param startDate 시작 날짜 (YYYY-MM-DD 형식)
//  * @param endDate 종료 날짜 (YYYY-MM-DD 형식)
//  * @returns 해당 날짜 범위의 거래 내역 배열
//  */
// export const getTransactionsByDateRange = async (
//   nickname: string = 'test',
//   startDate: string,
//   endDate: string
// ): Promise<Transaction[]> => {
//   try {
//     const transactions = await getTransactionsByNickname(nickname);
//     const startTime = new Date(startDate).getTime();
//     const endTime = new Date(endDate).getTime();

//     return transactions.filter(transaction => {
//       const transactionTime = new Date(transaction.date).getTime();
//       return transactionTime >= startTime && transactionTime <= endTime;
//     });
//   } catch (error) {
//     console.error(`날짜 범위 거래 내역 조회 오류:`, error);
//     return [];
//   }
// };
