import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaHistory } from 'react-icons/fa';
import { ROUTES } from '../config/routes';
ChartJS.register(ArcElement, Tooltip, Legend);

interface HoldingCoin {
  id: string;
  name: string;
  symbol: string;
  quantity: number;
  price: number;
  value: number;
  priceChange24h: number;
  color: string;
}

const Wallet = () => {
  const navigate = useNavigate();

  // 보유 코인 목 데이터
  const [holdingCoins] = useState<HoldingCoin[]>([
    {
      id: 'bitcoin',
      name: '비트코인',
      symbol: 'BTC',
      quantity: 0.0158,
      price: 68500000,
      value: 1082300,
      priceChange24h: 2.5,
      color: 'rgba(247, 147, 26, 0.8)',
    },
    {
      id: 'ethereum',
      name: '이더리움',
      symbol: 'ETH',
      quantity: 1.5,
      price: 3200000,
      value: 4800000,
      priceChange24h: -1.2,
      color: 'rgba(98, 126, 234, 0.8)',
    },
    {
      id: 'ripple',
      name: '리플',
      symbol: 'XRP',
      quantity: 5000,
      price: 580,
      value: 2900000,
      priceChange24h: 5.8,
      color: 'rgba(35, 41, 47, 0.8)',
    },
    {
      id: 'cardano',
      name: '카르다노',
      symbol: 'ADA',
      quantity: 3200,
      price: 420,
      value: 1344000,
      priceChange24h: -3.2,
      color: 'rgba(0, 51, 173, 0.8)',
    },
    {
      id: 'solana',
      name: '솔라나',
      symbol: 'SOL',
      quantity: 12,
      price: 98000,
      value: 1176000,
      priceChange24h: 8.7,
      color: 'rgba(0, 255, 163, 0.8)',
    },
    {
      id: 'statusnetwork',
      name: '스테이터스네트워크토큰',
      symbol: 'SNT',
      quantity: 15000,
      price: 105,
      value: 1575000,
      priceChange24h: 12.4,
      color: 'rgba(91, 203, 245, 0.8)',
    },
  ]);

  // 총 자산 가치 계산
  const totalValue = holdingCoins.reduce((sum, coin) => sum + coin.value, 0);

  // 현금 잔액
  const cashBalance = 2500000;

  // 총 자산 (코인 + 현금)
  const totalAsset = totalValue + cashBalance;

  // 투자금 (예시)
  const initialInvestment = 10000000;

  // 수익률 계산
  const profitRate =
    ((totalAsset - initialInvestment) / initialInvestment) * 100;

  // 차트 데이터 준비
  const coinValues = holdingCoins.map(
    (coin) => (coin.value / totalAsset) * 100,
  );
  const cashPercent = (cashBalance / totalAsset) * 100;

  // 상위 5개 코인 + 기타로 분류
  const topCoins = holdingCoins
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)
    .map((coin) => ({
      name: coin.symbol,
      value: (coin.value / totalAsset) * 100,
    }));

  // 나머지 코인들의 합
  const otherCoinsValue = holdingCoins
    .sort((a, b) => b.value - a.value)
    .slice(5)
    .reduce((sum, coin) => sum + coin.value, 0);

  const otherCoinsPercent = (otherCoinsValue / totalAsset) * 100;

  // 차트 데이터
  const data = {
    labels: [
      ...topCoins.map((coin) => coin.name),
      '현금',
      otherCoinsValue > 0 ? '기타' : null,
    ].filter(Boolean),
    datasets: [
      {
        data: [
          ...topCoins.map((coin) => coin.value),
          cashPercent,
          otherCoinsValue > 0 ? otherCoinsPercent : null,
        ].filter(Boolean),
        backgroundColor: [
          ...holdingCoins.slice(0, 5).map((coin) => coin.color),
          'rgba(200, 200, 200, 0.8)',
          'rgba(150, 150, 150, 0.8)',
        ],
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
      <div className="mx-4 mt-4 p-4 bg-white rounded-xl shadow-sm dark:bg-gray-800 dark:text-white">
        <div className="text-2xl font-bold">
          {totalAsset.toLocaleString()} KRW
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
            <div className="font-medium">
              {initialInvestment.toLocaleString()} KRW
            </div>
          </div>
          <div className="text-left">
            <div>현금</div>
            <div className="font-medium">
              {cashBalance.toLocaleString()} KRW
            </div>
          </div>
        </div>
      </div>

      {/* 포트폴리오 차트 섹션 */}
      <div className="flex flex-col mt-6 bg-white mx-4 rounded-xl p-4 dark:bg-gray-800 dark:text-white">
        <h2 className="text-lg font-bold mb-4">자산 분배</h2>
        <div
          className="w-full max-w-[200px] mx-auto"
          style={{ height: '200px' }}
        >
          <Pie data={data} options={options} />
        </div>

        {/* 자산 분배 범례 */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          {[
            ...topCoins,
            { name: '현금', value: cashPercent },
            otherCoinsValue > 0
              ? { name: '기타', value: otherCoinsPercent }
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
      <div className="mx-4 mt-6 bg-white rounded-xl mb-4 dark:bg-gray-800 dark:text-white">
        <div className="p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-bold">보유 코인</h2>
        </div>
        {holdingCoins.map((coin) => (
          <div
            key={coin.id}
            className="p-4 border-b dark:border-gray-700 last:border-b-0 flex items-center"
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
                {coin.quantity} {coin.symbol}
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
