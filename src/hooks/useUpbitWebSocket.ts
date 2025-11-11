import { useState, useEffect, useRef } from 'react';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import { MESSAGES } from '../config/constants';

interface TickerData {
  type: string;
  code: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  prev_closing_price: number;
  change: 'RISE' | 'EVEN' | 'FALL';
  change_price: number;
  signed_change_price: number;
  change_rate: number;
  signed_change_rate: number;
  trade_volume: number;
  acc_trade_volume_24h: number;
  acc_trade_price_24h: number;
  trade_date: string;
  trade_time: string;
  trade_timestamp: number;
  acc_ask_volume: number;
  acc_bid_volume: number;
  highest_52_week_price: number;
  highest_52_week_date: string;
  lowest_52_week_price: number;
  lowest_52_week_date: string;
  timestamp: number;
}

export function useUpbitWebSocket(symbols: string[] = ['BTC']) {
  const [tickerData, setTickerData] = useState<Record<string, TickerData>>({});
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socket = useRef<WebSocket | null>(null);

  const symbolsKey = JSON.stringify(symbols);

  useEffect(() => {
    const symbolsToUse = symbols.length > 0 ? symbols : ['BTC'];

    socket.current = new WebSocket(API_ENDPOINTS.GET_WS_URL);

    socket.current.onopen = function () {
      setIsConnected(true);
      setError(null);

      const message = [
        { ticket: 'test' },
        {
          type: 'ticker',
          codes: symbolsToUse.map((symbol) => `KRW-${symbol}`),
        },
      ];

      if (socket.current && socket.current.readyState === WebSocket.OPEN) {
        socket.current.send(JSON.stringify(message));
      }
    };

    socket.current.onmessage = function (event) {
      const reader = new FileReader();

      reader.onload = function () {
        try {
          const jsonData = JSON.parse(reader.result as string);

          if (jsonData && jsonData.code) {
            setTickerData((prevData) => ({
              ...prevData,
              [jsonData.code]: jsonData,
            }));
          }
        } catch (error) {
          console.error(MESSAGES.ERROR.JSON_PARSE_FAILED, error);
        }
      };

      reader.readAsText(event.data);
    };

    socket.current.onerror = function (_error) {
      setError('웹소켓 연결 오류가 발생했습니다.');
      setIsConnected(false);
    };

    socket.current.onclose = function () {
      setIsConnected(false);
    };

    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, [symbolsKey]);

  return { tickerData, isConnected, error };
}

export default useUpbitWebSocket;
