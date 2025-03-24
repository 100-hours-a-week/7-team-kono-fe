import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaHistory } from 'react-icons/fa';
import { ROUTES } from '../config/routes';
import useUpbitWebSocket from '../hooks/useUpbitWebSocket';
import {
  getHoldingCoinTickers,
  getQuantityByNicknameAndTicker,
  getHoldingCoins,
} from '../api/wallet';
import axios from 'axios';
import { formatCurrency } from '../utils/formatter';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Coin {
  id?: string;
  nickname: string;
  ticker: string;
  holdingQuantity: number;
  holdingPrice: number;
  name: string;
  price?: number;
  value?: number;
  priceChange24h?: number;
  color?: string;
}

const Wallet = () => {
  const navigate = useNavigate();
  const [holdingCoins, setHoldingCoins] = useState<Coin[]>([]);
  const [tickers, setTickers] = useState<string[]>([]);
  const tickerData = useUpbitWebSocket(tickers);
  const nickname = 'test';
  // 초기 로딩 상태를 추적하기 위한 ref
  const initialLoadRef = useRef(true);

  useEffect(() => {
    const fetchHoldingCoins = async () => {
      try {
        const walletData = await getHoldingCoins(nickname);

        // HoldingCoin 객체 형식으로 변환
        const coins = walletData.map((coin) => ({
          id: coin.ticker.toLowerCase(),
          nickname: coin.nickname,
          name: coin.name,
          ticker: coin.ticker,
          holdingQuantity: coin.holdingQuantity,
          holdingPrice: coin.holdingPrice,
          price: 0,
          value: 0,
          priceChange24h: 0,
          color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.8)`,
        }));

        setHoldingCoins(coins);

        // 티커 목록 추출
        const tickerList = coins.map((coin) => coin.ticker);
        setTickers(tickerList);
      } catch (error) {
        console.error('Error fetching holding coins:', error);
        setHoldingCoins([]);
        setTickers([]);
      }
    };

    fetchHoldingCoins();
    // 컴포넌트 마운트 시에만 실행
  }, []);

  // 웹소켓 데이터 처리 및 상태 관리
  useEffect(() => {
    // 웹소켓 데이터나 보유 코인이 없으면 실행하지 않음
    if (
      !tickerData ||
      !tickerData.tickerData ||
      Object.keys(tickerData.tickerData).length === 0 ||
      holdingCoins.length === 0
    ) {
      return;
    }

    console.log(
      'Available ticker data keys:',
      Object.keys(tickerData.tickerData),
    );

    // 보유 코인 정보 업데이트
    const updatedCoins = holdingCoins.map((coin) => {
      // 티커 데이터에서 해당 코인 정보 찾기
      const marketCode = `KRW-${coin.ticker}`;
      const tickerInfo = tickerData.tickerData[marketCode];

      if (tickerInfo) {
        console.log(`Found data for ${coin.ticker}:`, tickerInfo);

        // trade_price가 현재 가격
        const currentPrice = tickerInfo.trade_price || 0;

        // 현재 총 가치
        const currentValue = coin.holdingQuantity * currentPrice;

        // 매수 평균가로 수익률 계산 (%)
        let profitRate = 0;
        if (
          coin.holdingPrice / coin.holdingQuantity &&
          coin.holdingPrice / coin.holdingQuantity > 0
        ) {
          profitRate =
            ((currentPrice - coin.holdingPrice / coin.holdingQuantity) /
              coin.holdingPrice /
              coin.holdingQuantity) *
            100;
        }

        console.log(
          `${coin.ticker} - 현재가격: ${currentPrice}, 매수평균가: ${coin.holdingPrice / coin.holdingQuantity}, 수익률: ${profitRate}%`,
        );

        return {
          ...coin,
          price: currentPrice,
          value: currentValue,
          priceChange24h: profitRate,
        };
      }

      // 티커 데이터가 없는 경우 로그 출력
      console.log(`No data found for ${marketCode}`);
      return coin;
    });

    // 이전 상태와 비교하여 변경된 경우에만 업데이트
    const hasChanged =
      JSON.stringify(updatedCoins) !== JSON.stringify(holdingCoins);
    if (hasChanged) {
      console.log('Updating holding coins with new values');
      setHoldingCoins(updatedCoins);
    }
  }, [tickerData]); // holdingCoins를 의존성에서 제거

  const initialTotalAsset = 10000000;
  // const initialInvestment = 10000000;

  // 총 자산 가치 계산 (코인만)
  const totalCoinValue = holdingCoins.reduce(
    (sum, coin) => sum + Math.max(0, coin.value || 0), // 음수 값 방지
    0,
  );

  // 투자금 (예시)
  const initialInvestment = holdingCoins.reduce(
    (sum, coin) => sum + coin.holdingPrice,
    0,
  );

  // 현금 잔액 (음수가 되지 않도록)
  const cashBalance = Math.max(0, initialTotalAsset - initialInvestment);

  // 총 자산 (코인 + 현금)
  const totalAsset = cashBalance + totalCoinValue;

  // 수익률 계산 (NaN 방지)
  const profitRate =
    initialInvestment > 0
      ? ((totalAsset - initialInvestment) / initialInvestment) * 100
      : 0;

  // 차트 데이터 준비
  // 양수 값을 가진 코인만 필터링
  const positiveCoins = holdingCoins.filter((coin) => coin.value > 0);

  // 상위 5개 코인 선택
  const topCoins = positiveCoins
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)
    .map((coin) => ({
      name: coin.ticker,
      value: coin.value,
      percent: totalAsset > 0 ? (coin.value / totalAsset) * 100 : 0,
    }));

  // 나머지 코인들의 합
  const otherCoinsValue = positiveCoins
    .sort((a, b) => b.value - a.value)
    .slice(5)
    .reduce((sum, coin) => sum + coin.value, 0);

  // 각 항목의 퍼센트 계산 (총합이 100%가 되도록)
  const topCoinsPercent = topCoins.reduce((sum, coin) => sum + coin.percent, 0);
  const otherCoinsPercent =
    totalAsset > 0 ? (otherCoinsValue / totalAsset) * 100 : 0;
  const cashPercent = totalAsset > 0 ? (cashBalance / totalAsset) * 100 : 0;

  // 모든 퍼센트 값이 양수인지 확인
  console.log('Top coins percent:', topCoinsPercent);
  console.log('Other coins percent:', otherCoinsPercent);
  console.log('Cash percent:', cashPercent);
  console.log(
    'Total percent:',
    topCoinsPercent + otherCoinsPercent + cashPercent,
  );

  // 차트 데이터
  const data = {
    labels: [
      ...topCoins.map((coin) => coin.name),
      otherCoinsValue > 0 ? '기타' : null,
      cashBalance > 0 ? '현금' : null,
    ].filter(Boolean),
    datasets: [
      {
        data: [
          ...topCoins.map((coin) => Math.max(0, coin.percent)),
          otherCoinsValue > 0 ? Math.max(0, otherCoinsPercent) : null,
          cashBalance > 0 ? Math.max(0, cashPercent) : null,
        ].filter(Boolean),
        backgroundColor: [
          ...positiveCoins.slice(0, 5).map((coin) => coin.color),
          otherCoinsValue > 0 ? 'rgba(150, 150, 150, 0.8)' : null,
          cashBalance > 0 ? 'rgba(200, 200, 200, 0.8)' : null,
        ].filter(Boolean),
        borderWidth: 0,
      },
    ],
  };

  // 차트 옵션
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.label}: ${context.raw.toFixed(1)}%`;
          },
        },
      },
    },
    cutout: '70%',
  };

  // 매매 내역 페이지로 이동
  const goToTransaction = () => {
    navigate(ROUTES.TRANSACTION);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        title="지갑"
        rightElement={
          <button onClick={goToTransaction}>
            <FaHistory className="mr-1 text-xl text-gray-500 dark:text-white" />
          </button>
        }
      />

      {/* 잔액 정보 카드 */}
      <div className="mx-4 mt-4 p-4 bg-white rounded-xl shadow-sm dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700">
        <div className="text-2xl font-bold">
          {formatCurrency(totalAsset)}
          <span
            className={`text-${profitRate >= 0 ? 'red' : 'blue'}-500 text-lg ml-2`}
          >
            ({profitRate >= 0 ? '+' : ''}
            {profitRate.toFixed(2)}%)
          </span>
        </div>
        <div className="flex justify-between mt-4 text-gray-600 dark:text-white">
          <div>
            <div>투자금</div>
            <div className="font-medium">{formatCurrency(totalCoinValue)}</div>
          </div>
          <div className="text-left">
            <div>현금</div>
            <div className="font-medium">{formatCurrency(cashBalance)}</div>
          </div>
        </div>
      </div>

      {/* 포트폴리오 차트 섹션 */}
      <div className="flex flex-col mt-6 bg-white mx-4 rounded-xl p-4 dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-bold mb-4">자산 분배</h2>
        <div
          className="w-full max-w-[200px] mx-auto"
          style={{ height: '200px' }}
        >
          <Pie data={data} options={options} />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          {[
            ...topCoins.map((coin) => ({
              name: coin.name,
              value: Math.max(0, coin.percent),
            })),
            otherCoinsValue > 0
              ? { name: '기타', value: Math.max(0, otherCoinsPercent) }
              : null,
            cashBalance > 0
              ? { name: '현금', value: Math.max(0, cashPercent) }
              : null,
          ]
            .filter(Boolean)
            .map((item, index) => (
              <div key={item.name} className="flex items-center">
                <div
                  className="w-4 h-4 rounded-md mr-2 flex-shrink-0"
                  style={{
                    backgroundColor: data.datasets[0].backgroundColor[index],
                  }}
                ></div>
                <div>
                  <div className="text-sm">{item.name}</div>
                  <div className="text-sm font-medium">
                    {item.value.toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* 보유 코인 목록 */}
      <div className="mx-4 mt-6 bg-white rounded-xl mb-4 dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-bold">보유 코인</h2>
        </div>
        {[...holdingCoins]
          .sort((a, b) => (b.value || 0) - (a.value || 0))
          .map((coin) => (
            <div
              key={coin.id}
              className="p-4 border-b dark:border-gray-700 last:border-b-0 flex items-center"
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
                  {coin.holdingQuantity} {coin.ticker}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">
                  {coin.value.toLocaleString()} KRW
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
};

export default Wallet;
