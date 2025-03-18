import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosClose } from 'react-icons/io';
import Header from '../components/layout/Header';

type SortType = '시가총액' | '가격' | '등락률';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  marketCap: number;
  price: number;
  priceChange24h: number;
}

export default function Discover() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<SortType>('시가총액');
  const navigate = useNavigate();

  // 더 많은 코인 데이터 추가
  const coins: Coin[] = [
    {
      id: 'bitcoin',
      name: '비트코인',
      symbol: 'BTC',
      marketCap: 1258000000000,
      price: 68500000,
      priceChange24h: 2.5,
    },
    {
      id: 'ethereum',
      name: '이더리움',
      symbol: 'ETH',
      marketCap: 358000000000,
      price: 3200000,
      priceChange24h: -1.2,
    },
    {
      id: 'ripple',
      name: '리플',
      symbol: 'XRP',
      marketCap: 28000000000,
      price: 580,
      priceChange24h: 5.8,
    },
    {
      id: 'cardano',
      name: '카르다노',
      symbol: 'ADA',
      marketCap: 15000000000,
      price: 420,
      priceChange24h: -3.2,
    },
    {
      id: 'solana',
      name: '솔라나',
      symbol: 'SOL',
      marketCap: 42000000000,
      price: 98000,
      priceChange24h: 8.7,
    },
    {
      id: 'dogecoin',
      name: '도지코인',
      symbol: 'DOGE',
      marketCap: 12000000000,
      price: 85,
      priceChange24h: -0.5,
    },
    {
      id: 'polkadot',
      name: '폴카닷',
      symbol: 'DOT',
      marketCap: 8500000000,
      price: 7200,
      priceChange24h: 1.3,
    },
    {
      id: 'statusnetwork',
      name: '스테이터스네트워크토큰',
      symbol: 'SNT',
      marketCap: 350000000,
      price: 105,
      priceChange24h: 12.4,
    },
  ];

  // 검색 필터링
  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // 정렬 로직
  const sortedCoins = [...filteredCoins].sort((a, b) => {
    if (activeTab === '시가총액') {
      return b.marketCap - a.marketCap;
    } else if (activeTab === '가격') {
      return b.price - a.price;
    } else {
      return b.priceChange24h - a.priceChange24h;
    }
  });

  // 가격 포맷팅
  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(2)}M`;
    } else if (price >= 1000) {
      return `${(price / 1000).toFixed(2)}K`;
    } else {
      return price.toFixed(2);
    }
  };

  // 시가총액 포맷팅
  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1000000000000) {
      return `${(marketCap / 1000000000000).toFixed(2)}T`;
    } else if (marketCap >= 1000000000) {
      return `${(marketCap / 1000000000).toFixed(2)}B`;
    } else if (marketCap >= 1000000) {
      return `${(marketCap / 1000000).toFixed(2)}M`;
    } else {
      return marketCap.toLocaleString();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="탐색" />
      <div className="p-4 sticky top-0 z-10 rounded-xl mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="코인 검색"
            className="w-full p-3 bg-white dark:bg-gray-800 rounded-full px-6"
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

      {/* 정렬 탭 */}
      <div className="flex mx-4 border-b bg-white sticky top-[116px] z-10 rounded-t-xl dark:bg-gray-800 dark:text-white dark:border-gray-700">
        {(['시가총액', '가격', '등락률'] as SortType[]).map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-3 text-center ${
              activeTab === tab
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 코인 리스트 */}
      <div className="mx-4 flex-1 rounded-b-xl overflow-hidden mb-4">
        {sortedCoins.map((coin) => (
          <div
            key={coin.id}
            className={`p-4 border-b border-gray-200 bg-white flex items-center dark:border-gray-700 dark:bg-gray-800 dark:text-white last:border-0
            `}
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
        ))}
      </div>
    </div>
  );
}
