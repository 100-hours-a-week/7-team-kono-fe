import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import TradeConfirmModal from '../components/modal/TradeConfirmModal';

// 거래 타입 정의
type TradeType = 'buy' | 'sell';

// 코인 데이터 인터페이스
interface CoinData {
  name: string;
  symbol: string;
  price: number;
  balance?: number; // 보유 수량 (매도 시 필요)
}

export default function Trade() {
  const { ticker, type } = useParams<{ ticker: string; type: TradeType }>();
  const navigate = useNavigate();

  console.log('Trade params:', { ticker, type }); // 디버깅용 로그 추가

  // 상태 관리
  const [coin, setCoin] = useState<CoinData | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cashBalance, setCashBalance] = useState(5000000); // 보유 현금 (예시)
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 퍼센트 버튼 옵션
  const percentOptions = [10, 25, 50, 100];

  // 코인 데이터 가져오기 (목 데이터)
  useEffect(() => {
    // 파라미터 검증 로직 수정
    if (!ticker) {
      console.error('ticker is missing');
      setError('코인 정보가 없습니다.');
      setLoading(false);
      return;
    }

    if (type !== 'buy' && type !== 'sell') {
      console.error('Invalid type:', type);
      setError('잘못된 거래 유형입니다.');
      setLoading(false);
      return;
    }

    console.log('Fetching coin data for:', ticker, type);

    // 실제 구현 시 API 호출로 대체
    setTimeout(() => {
      const coinData: CoinData = {
        name:
          ticker === 'BTC'
            ? '비트코인'
            : ticker === 'ETH'
              ? '이더리움'
              : '리플',
        symbol: ticker,
        price: ticker === 'BTC' ? 68500000 : ticker === 'ETH' ? 3200000 : 580,
      };

      // 매도인 경우 보유 수량 추가
      if (type === 'sell') {
        coinData.balance =
          ticker === 'BTC' ? 0.01 : ticker === 'ETH' ? 0.5 : 1000;
      }

      setCoin(coinData);
      setLoading(false);
    }, 500);
  }, [ticker, type]);

  // 금액 입력 처리
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 숫자와 소수점만 허용
    if (/^[0-9]*\.?[0-9]*$/.test(value) || value === '') {
      setAmount(value);

      // 총액 계산
      if (coin && value) {
        const numValue = parseFloat(value);
        setTotal(numValue * coin.price);
      } else {
        setTotal(0);
      }
    }
  };

  // 퍼센트 버튼 클릭 처리
  const handlePercentClick = (percent: number) => {
    if (!coin) return;

    let maxAmount: number;

    if (type === 'buy') {
      // 매수: 보유 현금 기준
      maxAmount = cashBalance / coin.price;
    } else {
      // 매도: 보유 코인 기준
      maxAmount = coin.balance || 0;
    }

    const calculatedAmount = (maxAmount * percent) / 100;
    setAmount(calculatedAmount.toFixed(8));
    setTotal(calculatedAmount * coin.price);
  };

  // 거래 실행
  const executeTransaction = () => {
    if (!coin || !amount) {
      setError('수량을 입력해주세요.');
      return;
    }

    const numAmount = parseFloat(amount);

    if (numAmount <= 0) {
      setError('0보다 큰 수량을 입력해주세요.');
      return;
    }

    if (type === 'buy') {
      // 매수: 현금 잔액 확인
      if (total > cashBalance) {
        setError('잔액이 부족합니다.');
        return;
      }
    } else {
      // 매도: 보유 코인 확인
      if (numAmount > (coin.balance || 0)) {
        setError('보유 수량이 부족합니다.');
        return;
      }
    }

    // 실제 구현 시 API 호출로 거래 처리

    // 성공 시 코인 상세 페이지로 이동
    navigate(`/coins/${ticker}`, {
      state: {
        transactionSuccess: true,
        type,
        coin: coin.symbol,
        amount: numAmount,
        price: coin.price,
        total,
      },
    });
  };

  // 로딩 중 표시
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="p-4 flex items-center">
          <button onClick={() => navigate(-1)} className="p-1">
            <IoIosArrowBack className="text-2xl" />
          </button>
          <h1 className="text-lg font-bold ml-2">로딩 중...</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
        </div>
      </div>
    );
  }

  // 에러 표시
  if (error || !coin) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="p-4 flex items-center">
          <button onClick={() => navigate(-1)} className="p-1">
            <IoIosArrowBack className="text-2xl" />
          </button>
          <h1 className="text-lg font-bold ml-2">오류</h1>
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <p className="text-red-500 mb-4">
              {error || '코인 정보를 불러오는데 실패했습니다.'}
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
      <div className="p-4 flex items-center">
        <button onClick={() => navigate(-1)} className="p-1">
          <IoIosArrowBack className="text-2xl" />
        </button>
        <h1 className="text-lg font-bold ml-2">
          {type === 'buy' ? '매수하기' : '매도하기'}
        </h1>
      </div>

      {/* 코인 정보 */}
      <div className="p-4 border-b dark:bg-gray-800 dark:text-white dark:border-gray-700">
        <div className="flex items-center mb-4">
          <img
            src={`https://static.upbit.com/logos/${coin.symbol}.png`}
            alt={coin.name}
            className="w-10 h-10 rounded-full mr-3"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://via.placeholder.com/40';
            }}
          />
          <div>
            <div className="font-medium">{coin.name}</div>
            <div className="text-sm text-gray-500">{coin.symbol}</div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">
            {coin.price.toLocaleString()} 원
          </div>
        </div>
      </div>

      {/* 보유 자산 */}
      <div className="p-4 border-b dark:bg-gray-800 dark:text-white dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-500">
              {type === 'buy' ? '보유 원화' : `보유 ${coin.symbol}`}
            </div>
            <div className="font-medium">
              {type === 'buy'
                ? `${cashBalance.toLocaleString()} 원`
                : `${coin.balance} ${coin.symbol}`}
            </div>
          </div>
          {type === 'sell' && (
            <div className="text-right">
              <div className="text-sm text-gray-500">평가 금액</div>
              <div className="font-medium">
                {((coin.balance || 0) * coin.price).toLocaleString()} 원
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 거래 수량 입력 */}
      <div className="p-4 border-b dark:bg-gray-800 dark:text-white dark:border-gray-700    ">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-gray-500">수량</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            최대:{' '}
            {type === 'buy'
              ? (cashBalance / coin.price).toFixed(8)
              : coin.balance}{' '}
            {coin.symbol}
          </div>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            className="w-full p-3 border rounded-xl text-right pr-16 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:border-gray-700"
            placeholder="0"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
            {coin.symbol}
          </span>
        </div>

        {/* 퍼센트 버튼 */}
        <div className="grid grid-cols-4 gap-2">
          {percentOptions.map((percent) => (
            <button
              key={percent}
              className="py-2 border rounded-lg text-sm dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              onClick={() => handlePercentClick(percent)}
            >
              {percent}%
            </button>
          ))}
        </div>
      </div>

      {/* 총액 */}
      <div className="p-4 border-b dark:bg-gray-800 dark:text-white dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">총액</div>
          <div className="text-xl font-bold">{total.toLocaleString()} 원</div>
        </div>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="p-4">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}

      {/* 거래 버튼 */}
      <div className="fixed bottom-16 left-0 right-0 max-w-[430px] mx-auto p-4">
        <button
          className={`w-full py-4 rounded-xl font-bold text-white ${
            type === 'buy' ? 'bg-konoRed' : 'bg-konoBlue'
          }`}
          onClick={() => setIsModalOpen(true)}
        >
          {type === 'buy' ? '구매하기' : '판매하기'}
        </button>
      </div>

      {/* 거래 확인 모달 */}
      <TradeConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ticker={coin.symbol || ''}
        amount={amount}
        price={coin.price}
        tradeType={type}
      />
    </div>
  );
}
