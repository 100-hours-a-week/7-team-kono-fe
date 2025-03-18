import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosClose } from 'react-icons/io';
import Header from '../components/layout/Header';

interface FavoriteCoin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  marketCap: number;
}

// CoinLogo 컴포넌트 추가
const CoinLogo = ({ symbol, name }: { symbol: string; name: string }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  if (imageError) {
    // 이미지 로드 실패시 기본 원형 배경 표시
    return (
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500 font-medium">{symbol.slice(0, 2)}</span>
      </div>
    );
  }

  return (
    <img
      src={`https://static.upbit.com/logos/${symbol}.png`}
      alt={name}
      className="w-10 h-10 rounded-full"
      onError={handleImageError}
    />
  );
};

export default function Favorites() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // 관심 코인 목 데이터
  const [favoriteCoins] = useState<FavoriteCoin[]>([
    {
      id: 'bitcoin',
      name: '비트코인',
      symbol: 'BTC',
      price: 68500000,
      priceChange24h: 2.5,
      marketCap: 100000000000,
    },
    {
      id: 'ethereum',
      name: '이더리움',
      symbol: 'ETH',
      price: 3200000,
      priceChange24h: -1.2,
      marketCap: 50000000000,
    },
    {
      id: 'ripple',
      name: '리플',
      symbol: 'XRP',
      price: 580,
      priceChange24h: 5.8,
      marketCap: 10000000000,
    },
    {
      id: 'cardano',
      name: '카르다노',
      symbol: 'ADA',
      price: 420,
      priceChange24h: -3.2,
      marketCap: 5000000000,
    },
    {
      id: 'solana',
      name: '솔라나',
      symbol: 'SOL',
      price: 98000,
      priceChange24h: 8.7,
      marketCap: 10000000000,
    },
    {
      id: 'statusnetwork',
      name: '스테이터스네트워크토큰',
      symbol: 'SNT',
      price: 105,
      priceChange24h: 12.4,
      marketCap: 1000000000,
    },
  ]);

  // 검색 필터링
  const filteredCoins = favoriteCoins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // 코인 상세 페이지로 이동
  const handleCoinClick = (symbol: string) => {
    navigate(`/coins/${symbol}`);
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    } else if (marketCap >= 1e3) {
      return `$${(marketCap / 1e3).toFixed(2)}K`;
    } else {
      return `$${marketCap.toFixed(2)}`;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="관심종목" />
      <div className="p-4 sticky top-0 z-10 rounded-full mx-2 mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="코인 검색"
            className="w-full p-3 bg-white dark:bg-gray-800 rounded-full px-6 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setSearchTerm('')}
            >
              <IoIosClose className="text-2xl" />
            </button>
          )}
        </div>
      </div>

      {/* 코인 리스트 */}
      <div className="flex-1 mx-4 rounded-2xl overflow-hidden mb-4">
        {filteredCoins.length > 0 ? (
          filteredCoins.map((coin) => (
            <div
              key={coin.id}
              className={`p-4 border-b border-gray-200 bg-white flex items-center last:border-0 dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
              onClick={() => navigate(`/coins/${coin.symbol}`)}
            >
              <img
                src={`https://static.upbit.com/logos/${coin.symbol}.png`}
                alt={coin.name}
                className="w-10 h-10 rounded-full mr-4"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://via.placeholder.com/40';
                }}
              />
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="font-medium">{coin.name}</span>
                  <span className="text-gray-500 text-sm ml-2">
                    {coin.symbol}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  시가총액: {formatMarketCap(coin.marketCap)}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">
                  {coin.price.toLocaleString()} 원
                </div>
                <div
                  className={`text-sm ${
                    coin.priceChange24h >= 0 ? 'text-red-500' : 'text-blue-500'
                  }`}
                >
                  {coin.priceChange24h >= 0 ? '+' : ''}
                  {coin.priceChange24h.toFixed(2)}%
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center bg-white rounded-xl">
            <div className="text-gray-500 mb-2">관심 종목이 없습니다</div>
            <button
              className="text-blue-500 font-medium"
              onClick={() => navigate('/discover')}
            >
              코인 탐색하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
