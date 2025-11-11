import api from './clients';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import { MESSAGES } from '../config/constants';

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
    console.error(MESSAGES.ERROR.TRANSACTIONS.MARKET_BUY_FAILED, error);
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
    console.error(MESSAGES.ERROR.TRANSACTIONS.MARKET_SELL_FAILED, error);
    return null;
  }
};
