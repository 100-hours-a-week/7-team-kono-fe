import axios from 'axios';

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
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/data/transaction.json`,
    );
    // 응답이 배열인지 확인
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
};
