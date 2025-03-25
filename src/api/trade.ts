// 주문 정보 인터페이스
export interface OrderRequest {
  ticker: string;
  type: OrderType;
  amount?: number; // 매수 시 사용할 금액 (원화)
  quantity?: number; // 매도 시 사용할 수량
}

// 주문 응답 인터페이스
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

/**
 * 시장가 매수 함수 (현재 가격으로 특정 금액만큼 매수)
 * @param ticker 코인 티커 (예: BTC, ETH)
 * @param amount 구매할 총 금액 (원화)
 * @returns 주문 결과 응답
 */
export const marketBuy = async (
  ticker: string,
  amount: number,
): Promise<OrderResponse | null> => {
  try {
    const orderData: OrderRequest = {
      ticker,
      type: 'buy',
      amount,
    };

    const response = await api.post(API_ENDPOINTS.POST_COIN, orderData);

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error(`시장가 매수 오류 (${ticker}):`, error);
    return null;
  }
};

/**
 * 시장가 매도 함수 (현재 가격으로 특정 수량 매도)
 * @param ticker 코인 티커 (예: BTC, ETH)
 * @param quantity 판매할 수량
 * @returns 주문 결과 응답
 */
export const marketSell = async (
  ticker: string,
  quantity: number,
): Promise<OrderResponse | null> => {
  try {
    const orderData: OrderRequest = {
      ticker,
      type: 'sell',
      quantity,
    };

    const response = await api.post(API_ENDPOINTS.POST_COIN, orderData);

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error(`시장가 매도 오류 (${ticker}):`, error);
    return null;
  }
};

/**
 * 주문 취소 함수
 * @param orderId 취소할 주문 ID
 * @returns 성공 여부 (true/false)
 */
export const cancelOrder = async (orderId: string): Promise<boolean> => {
  try {
    const response = await api.delete(`${API_ENDPOINTS.POST_COIN}/${orderId}`);
    return response.status === 200;
  } catch (error) {
    console.error(`주문 취소 오류 (${orderId}):`, error);
    return false;
  }
};
