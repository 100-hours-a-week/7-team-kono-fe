import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import TradeConfirmModal from '../components/modal/TradeConfirmModal';
import useUpbitWebSocket from '../hooks/useUpbitWebSocket';
import { formatAmount, formatCurrency } from '../utils/formatter';
import {getCoinName} from '../api/coin';
import { getBalance } from '../api/wallet';
import { getQuantityByNicknameAndTicker } from '../api/wallet';
// 거래 타입 정의
type TradeType = 'buy' | 'sell';

// 코인 데이터 인터페이스~
interface CoinData {
  name: string;
  ticker: string;
  price: number;
  balance?: number; // 보유 수량 (매도 시 필요)
  quantity?: number; // 보유 수량 (매수 시 필요)
}

export default function Trade() {
  const { ticker, type } = useParams<{ ticker: string; type: TradeType }>();
  const navigate = useNavigate();

  console.log('Trade params:', { ticker, type }); // 디버깅용 로그 추가

  // 상태 관리
  const [coin, setCoin] = useState<CoinData | null>(null);
  const [amount, setAmount] = useState<string>('0');
  const [price, setPrice] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cashBalance, setCashBalance] = useState(5000000); // 보유 현금 (예시)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [maxAmount, setMaxAmount] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);

  // 퍼센트 버튼 옵션
  const percentOptions = [10, 25, 50, 100];

  const { tickerData } = useUpbitWebSocket([ticker || '']);

  // 웹소켓 데이터가 변경될 때 가격 업데이트
  useEffect(() => {
    if (ticker && tickerData[`KRW-${ticker}`]?.trade_price && coin) {
      const currentPrice = tickerData[`KRW-${ticker}`]?.trade_price;

      // 현재 가격이 이전 가격과 다를 때만 업데이트
      if (currentPrice !== price) {
        setPrice(currentPrice);

        // 금액이 입력되어 있으면 수량도 업데이트
        if (amount && amount !== '0') {
          setQuantity(parseFloat(amount) / currentPrice);
        }

        // 코인 객체의 가격만 업데이트 (전체 객체를 교체하지 않음)
        setCoin((prevCoin) =>
            prevCoin ? { ...prevCoin, price: currentPrice } : null,
        );
      }
    }
  }, [tickerData, ticker, amount]);

  // 금액이 변경될 때 수량 업데이트
  useEffect(() => {
    if (coin && amount && amount !== '0') {
      setQuantity(parseFloat(amount) / coin.price);
    } else {
      setQuantity(0);
    }
  }, [amount, coin]);

  // 코인 데이터 초기 로드 (한 번만 실행)
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

    // 비동기 로직을 별도 함수로 분리
    const fetchCoinData = async () => {
      try {
        setLoading(true);

        const coinName = await getCoinName(ticker);
        const balance = await getBalance();
        const quantity = await getQuantityByNicknameAndTicker(ticker);78 

        // 현재 가격 정보를 한 번만 가져옴
        const currentPrice = tickerData[`KRW-${ticker}`]?.trade_price || 0;

        setCoin({
          name: coinName,
          ticker: ticker,
          price: currentPrice,
          balance: balance,
          quantity: quantity,
        });

        // 가격 상태 업데이트
        setPrice(currentPrice);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching coin data:', error);
        setError('코인 정보를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [ticker, type]); // tickerData 의존성 제거

  // 디버깅용 로그 - 파라미터 변경 시에만 로그 출력
  useEffect(() => {
    console.log('Trade params:', { ticker, type });
  }, [ticker, type]);

  // 모달 상태 변경 시에만 로그 출력
  useEffect(() => {
    if (isModalOpen) {
      console.log('Modal props:', {
        amount,
        price: coin?.price,
        tradeType: type,
      });
    }
  }, [isModalOpen]);

  // 금액 입력 처리
  const handleAmountChange = (value: string) => {
    // 숫자만 입력 가능하도록
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setAmount(value);
      // 입력값이 변경될 때 수량 업데이트
      const numValue = parseFloat(value) || 0;
      setQuantity(numValue / (coin?.price || 1));
    }
  };

  // 퍼센트 버튼 클릭 처리
  const handlePercentClick = (percent: number) => {
    if (!coin) return;

    if (type === 'buy') {
      // 매수: 보유 현금 기준
      setMaxAmount(coin.balance || cashBalance);
    } else {
      // 매도: 보유 코인 기준 (코인 수량 * 현재 가격)
      setMaxAmount((coin.quantity || 0) * coin.price);
    }

    const calculatedAmount = (maxAmount * percent) / 100;
    setAmount(calculatedAmount.toFixed(0)); // 원화는 소수점 없이
    setQuantity(calculatedAmount / coin.price);
  };

  // 거래 실행
  const handleOpenModal = () => {
    if (!amount || isNaN(Number(amount)) || !coin || !price) {
      alert('유효한 수량과 가격을 입력해주세요.');
      return;
    }
    setIsModalOpen(true);
  };

  // 로딩 중 표시
  if (loading) {
    return (
        <div className="flex flex-col min-h-screen">
          <div className="p-4 flex items-center">
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
            <h1 className="text-lg font-bold ml-2">오류</h1>
          </div>
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center">
              <p className="text-red-500 mb-4 dark:text-red-400">
                {error || '코인 정보를 불러오는데 실패했습니다.'}
              </p>
              <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg dark:bg-blue-400"
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
                src={`https://static.upbit.com/logos/${coin.ticker}.png`}
                alt={coin.name}
                className="w-10 h-10 rounded-full mr-3"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                      'https://via.placeholder.com/40';
                }}
            />
            <div>
              <div className="font-medium">{coin.name}</div>
              <div className="text-sm text-gray-500">{coin.ticker}</div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">{coin.price} 원</div>
          </div>
        </div>

        {/* 보유 자산 */}
        <div className="p-4 border-b dark:bg-gray-800 dark:text-white dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-500">
                {type === 'buy' ? '보유 원화' : `보유 ${coin.ticker}`}
              </div>
              <div className="font-medium">
                {type === 'buy'
                    ? `${formatCurrency(coin.balance || cashBalance)}`
                    : `${formatAmount(coin.quantity || 0)} ${coin.ticker}`}
              </div>
            </div>
            {type === 'sell' && (
                <div className="text-right">
                  <div className="text-sm text-gray-500">평가 금액</div>
                  <div className="font-medium">
                    {formatCurrency((coin.quantity || 0) * coin.price)}
                  </div>
                </div>
            )}
          </div>
        </div>

        {/* 거래 수량 입력 */}
        <div className="p-4 border-b dark:bg-gray-800 dark:text-white dark:border-gray-700">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              구매 금액
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {type === 'buy' ? '구매가능' : '판매가능'}{' '}
              {formatCurrency(maxAmount)}{' '}
            </div>
          </div>

          <div className="relative mb-4">
            <input
                type="number"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="w-full p-3 border rounded-xl text-right pr-16 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:border-gray-700"
                placeholder="0"
                min={0}
                max={maxAmount}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
            원
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

        {/* 예상 수량 */}
        <div className="p-4 border-b dark:bg-gray-800 dark:text-white dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              예상 수량
            </div>
            <div className="text-xl font-bold">
              {quantity.toFixed(8)} {coin.ticker}
            </div>
          </div>
        </div>

        {/* 총액 */}
        <div className="p-4 border-b dark:bg-gray-800 dark:text-white dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">총액</div>
            <div className="text-xl font-bold">{formatCurrency(amount)}</div>
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
              onClick={handleOpenModal}
          >
            {type === 'buy' ? '구매하기' : '판매하기'}
          </button>
        </div>

        {/* 거래 확인 모달 */}
        <TradeConfirmModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            ticker={coin.ticker || ''}
            amount={amount.toString() || '0'}
            quantity={quantity.toString() || '0'}
            price={coin.price}
            tradeType={type as TradeType}
        />
      </div>
  );
}