import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosClose } from 'react-icons/io';
import Header from '../components/layout/Header';
import useUpbitWebSocket from '../hooks/useUpbitWebSocket';
import { formatAmount } from '../utils/formatter';
import { getCoins } from '../api/coin';

type SortType = '거래대금' | '가격' | '등락률';

interface Coin {
  id: string;
  name: string;
  ticker: string;
  accPrice: number;
  price: number;
  priceChange24h: number;
  rateChange24h: number;
}

interface CoinInfo {
  ticker: string;
  coinName: string;
}

export default function Discover() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<SortType>('거래대금');
  const [coinInfo, setCoinInfo] = useState<CoinInfo[]>([]);
  const [tickers, setTickers] = useState<string[]>([]);
  const [coinName, setCoinNmae] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCoins()
      .then((res) => {
        const data: CoinInfo[] = res.data;
        console.log('Fetched coin data:', data);
        console.log('Data type:', Array.isArray(data) ? 'Array' : typeof data);
        setCoinInfo(data);
        // 티커 목록 추출
        const tickerList = data.map((coin) => coin.ticker);
        const nameList = data.map((coin) => coin.coinName);
        setTickers(tickerList);
        setCoinNmae(nameList);
        console.log(`get data/coin.json : ${JSON.stringify(data)}`);
      })
      .catch((err) => {
        console.log(`get coins data error: ${err}`);
      });
  }, []);

  // 티커 목록이 준비된 후 웹소켓 연결
  const { tickerData } = useUpbitWebSocket(tickers);

  // 웹소켓 데이터와 코인 정보 결합
  const coins = useMemo(() => {
    console.log('Running coins useMemo');
    console.log('tickerData available:', !!tickerData);
    console.log(
      'tickerData keys:',
      tickerData ? Object.keys(tickerData).length : 0,
    );
    console.log('coinInfo available:', !!coinInfo);
    console.log('coinInfo length:', coinInfo.length);

    if (
      !tickerData ||
      Object.keys(tickerData).length === 0 ||
      coinInfo.length === 0
    ) {
      console.log('Returning empty array from useMemo');
      return [];
    }

    const result = Object.entries(tickerData)
      .map(([code, data]) => {
        // KRW-BTC 형식에서 BTC만 추출
        const ticker = code.split('-')[1];
        // coinInfo에서 해당 티커의 정보 찾기
        const info = coinInfo.find((coin) => coin.ticker === ticker);

        if (!info) {
          console.log(`No info found for ticker: ${ticker}`);
          return null;
        }

        return {
          id: code,
          name: info.coinName,
          ticker: ticker,
          accPrice: data.acc_trade_price_24h || 0,
          price: data.trade_price || 0,
          priceChange24h: data.signed_change_price || 0,
          rateChange24h: data.signed_change_rate * 100 || 0,
        };
      })
      .filter(Boolean);

    console.log('Processed coins result length:', result.length);
    return result;
  }, [tickerData, coinInfo]);

  // 검색 필터링
  const filteredCoins = Array.isArray(coins)
    ? coins.filter(
        (coin: Coin) =>
          coin.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          coin.ticker?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  // 정렬 로직
  const sortedCoins = [...filteredCoins].sort((a, b) => {
    if (activeTab === '거래대금') {
      return b.accPrice - a.accPrice;
    } else if (activeTab === '가격') {
      return b.price - a.price;
    } else {
      return b.rateChange24h - a.rateChange24h;
    }
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="탐색" />
      <div className="p-4 sticky top-0 z-10 rounded-xl mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="코인 검색"
            className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-full px-6"
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
      <div className="flex mx-4 border-b bg-white sticky top-[116px] z-10 rounded-t-xl shadow-sm dark:bg-gray-800 dark:text-white dark:border-gray-700">
        {(['거래대금', '가격', '등락률'] as SortType[]).map((tab) => (
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
      <div className="mx-4 flex-1 rounded-b-xl overflow-hidden mb-4 shadow-lg">
        {sortedCoins.map((coin) => (
          <div
            key={coin.id}
            className={`p-4 border-b border-gray-200 bg-white flex items-center dark:border-gray-700 dark:bg-gray-800 dark:text-white last:border-0
            `}
            onClick={() => navigate(`/coins/${coin.ticker}`)}
          >
            <img
              src={`https://static.upbit.com/logos/${coin.ticker}.png`}
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
                  {coin.ticker}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                거래대금 {formatAmount(coin.accPrice)}
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium">
                {coin.price.toLocaleString()} 원
              </div>
              <div
                className={`text-sm ${
                  coin.rateChange24h >= 0 ? 'text-red-500' : 'text-blue-500'
                }`}
              >
                {coin.rateChange24h >= 0 ? '+' : ''}
                {coin.rateChange24h.toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}