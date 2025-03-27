import axios from 'axios';
import api from './clients';
import { API_ENDPOINTS } from '../config/apiEndpoints';
/**
 * 특정 사용자의 특정 코인 보유량을 조회하는 함수
 * @param nickname 사용자 닉네임
 * @param ticker 코인 티커 (예: BTC, ETH)
 * @returns 해당 코인의 보유량, 없으면 0 반환
 */
export const getQuantityByNicknameAndTicker = async (
  ticker: string,
) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/data/wallet.json`,
    );

    // Make sure res.data is an array before using find
    if (Array.isArray(res.data)) {
      const wallet = res.data.find(
        (wallet: { ticker: string }) =>
          wallet.ticker === ticker,
      );

      return wallet ? wallet.holding_quantity : 0;
    } else {
      console.error('Wallet data is not an array:', res.data);
      return 0;
    }
  } catch (err) {
    console.error(`Error fetching wallet data for ${ticker}:`, err);
    return 0;
  }
};

export const getHoldingCoinTickers = async (nickname: string) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/data/wallet.json`,
    );

    if (Array.isArray(res.data)) {
      const wallets = res.data.filter(
        (wallet: { nickname: string }) => wallet.nickname === nickname,
      );

      // 티커 목록만 추출하여 반환
      return wallets.map((wallet) => wallet.ticker);
    } else {
      console.error('Wallet data is not an array:', res.data);
      return [];
    }
  } catch (err) {
    console.error(`get data/wallet.json error:`, err);
    return [];
  }
};

export const getHoldingCoins = async (nickname: string) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/data/wallet.json`,
    );

    if (Array.isArray(res.data)) {
      const wallets = res.data.filter(
        (wallet: { nickname: string }) => wallet.nickname === nickname,
      );

      // 티커 목록만 추출하여 반환
      return wallets;
    } else {
      console.error('Wallet data is not an array:', res.data);
      return [];
    }
  } catch (err) {
    console.error(`get data/wallet.json error:`, err);
    return [];
  }
};
// 잔액 조회
export const getBalance = async (): Promise<number> => {
  try {
    const response = await api.get(API_ENDPOINTS.GET_CASH);
    
    return response.data.data.cash;
  } catch (error) {
    console.error('잔액 조회 중 오류 발생:', error);
    return 0;
  }
};
