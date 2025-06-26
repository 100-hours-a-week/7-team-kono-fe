import api from './clients';
import { API_ENDPOINTS } from '../config/apiEndpoints';

export type OrderType = 'sell' | 'buy';

export interface OrderRequest {
  ticker: string;
  orderType: OrderType;
  orderAmount?: number;
  orderQuantity?: number;
}

export interface OrderResponse {
  id: string;
  ticker: string;
  type: OrderType;
  price: number;
  quantity: number;
  total: number;
  fee?: number;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
}

export const marketBuy = async (
  ticker: string,
  amount: number,
): Promise<OrderResponse | null> => {
  try {
    const orderData: OrderRequest = {
      ticker,
      orderType: 'buy',
      orderAmount: amount,
    };

    const response = await api.post(API_ENDPOINTS.POST_ORDER, orderData);

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error(`시장가 매수 오류 (${ticker}):`, error);
    return null;
  }
};

export const marketSell = async (
  ticker: string,
  amount: number,
  orderQuantity?: number,
): Promise<OrderResponse | null> => {
  try {
    const orderData: OrderRequest = {
      ticker,
      orderType: 'sell',
      orderAmount: amount || undefined,
      orderQuantity: orderQuantity || undefined,
    };

    const response = await api.post(API_ENDPOINTS.POST_ORDER, orderData);

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error(`시장가 매도 오류 (${ticker}):`, error);
    return null;
  }
};
