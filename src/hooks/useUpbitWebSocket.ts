import { useState, useEffect, useRef } from 'react';

interface TickerData {
  type: string;
  code: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  prev_closing_price: number;
  acc_trade_price: number;
  change: 'RISE' | 'EVEN' | 'FALL';
  change_price: number;
  signed_change_price: number;
  change_rate: number;
  signed_change_rate: number;
  trade_volume: number;
  acc_trade_volume: number;
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

export function useUpbitWebSocket(symbols: string[] = []) {
  const [tickerData, setTickerData] = useState<Record<string, TickerData>>({});
  const socket = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectCountRef = useRef(0);
  const isConnectedRef = useRef(false);
  const mockIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastDataRef = useRef<Record<string, TickerData>>({});

  // 모의 데이터 사용 (개발 환경에서만)
  const useMockData = true; // 실제 API 사용 시 false로 변경

  // 모의 데이터 업데이트 함수 - 최적화 버전
  const updateMockData = () => {
    const safeSymbols = symbols || [];
    if (safeSymbols.length === 0) return;

    const newData: Record<string, TickerData> = {};
    let hasChanges = false;

    safeSymbols.forEach((symbol) => {
      const mockData = generateMockData(symbol);

      // 이전 데이터와 비교하여 중요한 변경사항이 있는지 확인
      const prevData = lastDataRef.current[symbol];
      if (
        !prevData ||
        Math.abs(prevData.trade_price - mockData.trade_price) >
          prevData.trade_price * 0.001 || // 0.1% 이상 변경
        Math.abs(prevData.signed_change_rate - mockData.signed_change_rate) >
          0.001
      ) {
        // 0.1% 이상 변경

        newData[symbol] = mockData;
        hasChanges = true;
      } else {
        // 변경사항이 없으면 이전 데이터 유지
        newData[symbol] = prevData;
      }
    });

    // 중요한 변경사항이 있을 때만 상태 업데이트
    if (hasChanges) {
      lastDataRef.current = { ...lastDataRef.current, ...newData };
      setTickerData((prev) => ({ ...prev, ...newData }));
    }
  };

  // 웹소켓 연결 함수
  const connect = () => {
    const safeSymbols = symbols || [];

    // 모의 데이터 사용 시 웹소켓 연결 대신 타이머 설정
    if (useMockData) {
      if (mockIntervalRef.current) {
        clearInterval(mockIntervalRef.current);
      }

      if (safeSymbols.length === 0) return;

      // 초기 데이터 생성 (처음 한 번만)
      if (Object.keys(lastDataRef.current).length === 0) {
        updateMockData();
      }

      // 10초마다 데이터 업데이트 (3초에서 10초로 변경)
      mockIntervalRef.current = setInterval(updateMockData, 10000);
      return;
    }

    if (socket.current?.readyState === WebSocket.OPEN) {
      socket.current.close();
    }

    socket.current = new WebSocket('wss://api.upbit.com/websocket/v1');

    socket.current.onopen = () => {
      console.log('WebSocket Connected');
      if (socket.current?.readyState === WebSocket.OPEN) {
        // 웹소켓 연결 후 구독 메시지 전송
        const codes = safeSymbols.map((symbol) => `KRW-${symbol}`);
        const msg = [{ ticket: 'UNIQUE_TICKET' }, { type: 'ticker', codes }];
        socket.current.send(JSON.stringify(msg));
      }
    };

    socket.current.onmessage = (event) => {
      // 바이너리 데이터를 JSON으로 변환
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string) as TickerData;
          if (data.type === 'ticker') {
            setTickerData((prev) => ({
              ...prev,
              [data.code.replace('KRW-', '')]: data,
            }));
          }
        } catch (error) {
          console.error('Error parsing WebSocket data:', error);
        }
      };
      reader.readAsText(event.data);
    };

    socket.current.onclose = (event) => {
      console.log('WebSocket Disconnected:', event.code, event.reason);

      // 자동 재연결 (5초 후)
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      reconnectTimeoutRef.current = setTimeout(() => {
        console.log('Attempting to reconnect...');
        connect();
      }, 30000);
    };

    socket.current.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };
  };

  useEffect(() => {
    connect();

    // 컴포넌트 언마운트 시 웹소켓 연결 종료
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (socket.current) {
        socket.current.close();
      }
    };
  }, [symbols.join(',')]);

  return tickerData;
}
