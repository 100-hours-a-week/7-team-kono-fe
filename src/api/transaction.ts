import axios from 'axios';
import api from './clients';
import { API_ENDPOINTS } from '../config/apiEndpoints';

type Transaction = {
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

export const getTransactionsByNickname: () => Promise<
  Transaction[]
> = async () => {
  try {
    const res= await api.get(API_ENDPOINTS.GET_TRANSACTION);
    // 응답이 배열인지 확인
    console.log(res.data);
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
};
