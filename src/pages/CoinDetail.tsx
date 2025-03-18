import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Header from '../components/layout/Header';
// TradingViewWidget 컴포넌트 임포트
import TradingViewWidget from '../components/TradingViewWidget';

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  high24h: number;
  low24h: number;
  isFavorite: boolean;
}

// 차트 컴포넌트를 메모이제이션하여 불필요한 리렌더링 방지
const Chart = memo(
  ({ ticker, timeframe }: { ticker: string; timeframe: string }) => {
    // 타임프레임을 TradingView 형식으로 변환
    const getTradingViewInterval = (tf: string) => {
      switch (tf) {
        case '1D':
          return '60'; // 1시간 간격
        case '1W':
          return '240'; // 4시간 간격
        case '1M':
          return 'D'; // 일 간격
        case '1Y':
          return 'W'; // 주 간격
        default:
          return '60';
      }
    };

    // 심볼 형식 변환 (BTC -> UPBIT:BTCKRW)
    const symbol = `UPBIT:${ticker}KRW`;

    return (
      <div className="w-full h-[400px] border-b bg-gray-50">
        <TradingViewWidget
          symbol={symbol}
          theme="light"
          interval={getTradingViewInterval(timeframe)}
          locale="kr"
          width="100%"
        />
      </div>
    );
  },
);

// 가격 정보 컴포넌트를 메모이제이션
const PriceInfo = memo(({ coin }: { coin: CoinData }) => {
  return (
    <div className="p-4 border-b">
      <div className="flex items-center mb-2">
        <img
          src={`https://static.upbit.com/logos/${coin.symbol}.png`}
          alt={coin.name}
          className="w-8 h-8 rounded-full mr-2"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://via.placeholder.com/32';
          }}
        />
        <span className="text-sm text-gray-500">{coin.symbol}</span>
      </div>
      <div className="text-2xl font-bold">{coin.price.toLocaleString()} 원</div>
      <div
        className={`text-sm ${
          coin.priceChange24h >= 0 ? 'text-red-500' : 'text-blue-500'
        }`}
      >
        {coin.priceChange24h >= 0 ? '+' : ''}
        {coin.priceChange24h.toFixed(2)}%
      </div>
    </div>
  );
});

// TradingView 타입 정의
declare global {
  interface Window {
    TradingView: {
      widget: any;
    };
  }
}

export default function CoinDetail() {
  const { ticker } = useParams<{ ticker: string }>();
  const navigate = useNavigate();

  const [coin, setCoin] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '1Y'>('1D');

  // 초기 코인 데이터 로드
  useEffect(() => {
    if (!ticker) return;

    const fetchCoinData = async () => {
      try {
        setLoading(true);
        // 더미 데이터 사용
        const mockData: CoinData = {
          id: '1',
          name:
            ticker === 'BTC'
              ? '비트코인'
              : ticker === 'ETH'
                ? '이더리움'
                : ticker === 'DOGE'
                  ? '도지코인'
                  : ticker,
          symbol: ticker,
          price:
            ticker === 'BTC'
              ? 50000000
              : ticker === 'ETH'
                ? 3200000
                : ticker === 'DOGE'
                  ? 85
                  : 10000,
          priceChange24h: 2.5,
          high24h:
            ticker === 'BTC'
              ? 51000000
              : ticker === 'ETH'
                ? 3300000
                : ticker === 'DOGE'
                  ? 90
                  : 11000,
          low24h:
            ticker === 'BTC'
              ? 49000000
              : ticker === 'ETH'
                ? 3100000
                : ticker === 'DOGE'
                  ? 80
                  : 9000,
          volume24h: 1000000000,
          marketCap: 1000000000000,
          isFavorite: false,
        };

        setCoin(mockData);

        // 가격 변동 시뮬레이션 (웹소켓 대체)
        const simulatePriceChanges = setInterval(() => {
          setCoin((prevCoin) => {
            if (!prevCoin) return null;

            // 랜덤한 가격 변동 (-0.5% ~ +0.5%)
            const priceChange = prevCoin.price * (Math.random() * 0.01 - 0.005);
            const newPrice = Math.max(prevCoin.price + priceChange, 0);

            // 새로운 가격 변동률 계산 (-3% ~ +3%)
            const newPriceChange =
              prevCoin.priceChange24h + (Math.random() * 0.2 - 0.1);

            return {
              ...prevCoin,
              price: newPrice,
              priceChange24h: newPriceChange,
              high24h: Math.max(prevCoin.high24h, newPrice),
              low24h: Math.min(prevCoin.low24h, newPrice),
            };
          });
        }, 5000); // 5초마다 가격 변동

        return () => clearInterval(simulatePriceChanges);
      } catch (err) {
        setError('코인 정보를 불러오는데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [ticker]);

  // 즐겨찾기 토글 함수
  const toggleFavorite = useCallback(() => {
    setCoin((prevCoin) => {
      if (!prevCoin) return null;
      return {
        ...prevCoin,
        isFavorite: !prevCoin.isFavorite,
      };
    });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header title="로딩 중..." />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error || !coin) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header title="오류" />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <p className="text-red-500 mb-4">
              {error || '코인 정보를 불러올 수 없습니다.'}
            </p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => navigate(-1)}
            >
              돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더 */}
      <Header
        title={coin.name}
        rightElement={
          <button onClick={toggleFavorite} className="p-2">
            {coin.isFavorite ? (
              <FaHeart className="text-red-400 text-xl" />
            ) : (
              <FaHeart className="text-gray-400 text-xl" />
            )}
          </button>
        }
      />

      {/* 코인 정보 - 메모이제이션된 컴포넌트 사용 */}
      <PriceInfo coin={coin} />

      {/* 차트 타임프레임 선택 */}
      <div className="p-4 border-b flex">
        {(['1D', '1W', '1M', '1Y'] as const).map((tf) => (
          <button
            key={tf}
            className={`flex-1 py-2 text-center ${
              timeframe === tf
                ? 'text-blue-500 border-b-2 border-blue-500 font-medium'
                : 'text-gray-500'
            }`}
            onClick={() => setTimeframe(tf)}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* 차트 - 메모이제이션된 컴포넌트 사용 */}
      <Chart ticker={ticker} timeframe={timeframe} />

      {/* 코인 상세 정보 */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">코인 정보</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">최고가 (24h)</span>
            <span>{coin.high24h.toLocaleString()} 원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">최저가 (24h)</span>
            <span>{coin.low24h.toLocaleString()} 원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">거래량 (24h)</span>
            <span>{(coin.volume24h / 1000000).toFixed(2)} 백만원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">시가총액</span>
            <span>{(coin.marketCap / 1000000000).toFixed(2)} 십억원</span>
          </div>
        </div>
      </div>

      {/* 매수/매도 버튼 */}
      <div className="p-4 mt-auto">
        <div className="flex space-x-4">
          <button
            className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-medium"
            onClick={() => navigate(`/trade/${ticker}/buy`)}
          >
            매수
          </button>
          <button
            className="flex-1 py-3 bg-red-500 text-white rounded-xl font-medium"
            onClick={() => navigate(`/trade/${ticker}/sell`)}
          >
            매도
          </button>
        </div>
      </div>
    </div>
  );
}
