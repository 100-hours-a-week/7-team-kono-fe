import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TradeConfirmModal from '../components/modal/TradeConfirmModal';
import useUpbitWebSocket from '../hooks/useUpbitWebSocket';
import { formatAmount, formatCurrency } from '../utils/formatter';
import { getCoinName } from '../api/coin';
import { getBalance } from '../api/wallet';
import { getQuantityByTicker } from '../api/wallet';
import Header from '../components/layout/Header.tsx';

type TradeType = 'buy' | 'sell';

interface CoinData {
  name: string;
  ticker: string;
  price: number;
  balance?: number;
  quantity?: number;
}

export default function Trade() {
  const { ticker, type } = useParams<{ ticker: string; type: TradeType }>();
  const navigate = useNavigate();

  const [coin, setCoin] = useState<CoinData | null>(null);
  const [displayAmount, setDisplayAmount] = useState<number | '최대'>(0);
  const [submitAmount, setSubmitAmount] = useState<number | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cashBalance] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [maxAmount, setMaxAmount] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);

  const percentOptions = [10, 25, 50, 100];
  const MIN_AMOUNT = 5000;

  const { tickerData } = useUpbitWebSocket([ticker || '']);

  useEffect(() => {
    if (ticker && tickerData[`KRW-${ticker}`]?.trade_price) {
      const currentPrice = tickerData[`KRW-${ticker}`]?.trade_price;
      setPrice(currentPrice);

      setCoin((prevCoin) =>
        prevCoin ? { ...prevCoin, price: currentPrice } : null,
      );

      if (type === 'sell' && displayAmount === '최대') {
        setQuantity(coin?.quantity || 0);
      } else if (displayAmount && displayAmount !== '최대') {
        const amount = Number(displayAmount);
        if (!isNaN(amount)) {
          setQuantity(amount / currentPrice);
        }
      }

      if (type === 'buy') {
        setMaxAmount(coin?.balance || cashBalance);
      } else {
        setMaxAmount((coin?.quantity || 0) * currentPrice);
      }
    }
  }, [tickerData, ticker, type, displayAmount, coin?.quantity, coin?.balance]);

  useEffect(() => {
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

    const fetchCoinData = async () => {
      try {
        setLoading(true);

        const coinName = await getCoinName(ticker);
        const balance = await getBalance();
        const quantity = await getQuantityByTicker(ticker);

        const currentPrice = tickerData[`KRW-${ticker}`]?.trade_price || 0;

        setCoin({
          name: coinName || ticker,
          ticker: ticker,
          price: currentPrice,
          balance: balance,
          quantity: quantity,
        });

        setPrice(currentPrice);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching coin data:', error);
        setError('코인 정보를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [ticker, type]);

  const handleAmountChange = (value: string) => {
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      const numValue = value ? Number(value) : 0;

      const validatedValue = numValue > maxAmount ? maxAmount : numValue;

      setDisplayAmount(validatedValue);

      if (value && coin?.price) {
        if (!isNaN(numValue)) {
          setQuantity(numValue / coin.price);
          setSubmitAmount(numValue);
        }
      } else {
        setQuantity(0);
        setSubmitAmount(0);
      }
    }
  };

  const validateAmount = () => {
    if (displayAmount !== '최대') {
      const currentAmount = Number(displayAmount);

      if (currentAmount > 0 && currentAmount < MIN_AMOUNT) {
        setDisplayAmount(MIN_AMOUNT);
        setSubmitAmount(MIN_AMOUNT);
        setQuantity(MIN_AMOUNT / price);
      }

      if (currentAmount > maxAmount) {
        setDisplayAmount(maxAmount);
        setSubmitAmount(maxAmount);
        setQuantity(maxAmount / price);
      }
    }
  };

  const handlePercentChange = (percent: number) => {
    if (type === 'sell' && percent === 100) {
      setDisplayAmount('최대');
      setSubmitAmount(null);
      setQuantity(coin?.quantity || 0);
    } else {
      const currentMaxAmount =
        type === 'buy'
          ? coin?.balance || cashBalance
          : (coin?.quantity || 0) * price;

      const calculatedAmount = (currentMaxAmount * percent) / 100;

      const finalAmount =
        calculatedAmount < MIN_AMOUNT && calculatedAmount > 0
          ? MIN_AMOUNT
          : calculatedAmount;

      setDisplayAmount(finalAmount);
      setSubmitAmount(finalAmount);
      setQuantity(finalAmount / price);
    }
  };

  const handleOpenModal = () => {
    validateAmount();
    if (!displayAmount || !coin || !price) {
      alert('유효한 수량과 가격을 입력해주세요.');
      return;
    }

    if (displayAmount !== '최대' && Number(displayAmount) < MIN_AMOUNT) {
      alert(`최소 거래 금액은 ${formatCurrency(MIN_AMOUNT)}입니다.`);
      setDisplayAmount(MIN_AMOUNT);
      setSubmitAmount(MIN_AMOUNT);
      setQuantity(MIN_AMOUNT / price);
      return;
    }
    setIsModalOpen(true);
  };

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
      <Header
        title={type === 'buy' ? '매수하기' : '매도하기'}
        centerTitle={false}
      />

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
          <div className="text-2xl font-bold">{formatCurrency(price)}</div>
        </div>
      </div>

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
            value={displayAmount}
            onChange={(e) => handleAmountChange(e.target.value)}
            onBlur={validateAmount}
            className="w-full p-3 border rounded-xl text-right pr-16 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:border-gray-700"
            placeholder="0"
            min={MIN_AMOUNT}
            max={maxAmount}
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
            원
          </span>
        </div>

        <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
          최소 거래 금액: {formatCurrency(MIN_AMOUNT)}
        </div>

        <div className="grid grid-cols-4 gap-2">
          {percentOptions.map((percent) => (
            <button
              key={percent}
              className="py-2 border rounded-lg text-sm dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              onClick={() => handlePercentChange(percent)}
            >
              {percent}%
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-b dark:bg-gray-800 dark:text-white dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            예상 수량
          </div>
          <div className="text-xl font-bold">
            {type === 'sell' && displayAmount === '최대'
              ? '최대'
              : `${quantity.toFixed(8)} ${coin?.ticker}`}
          </div>
        </div>
      </div>

      <div className="p-4 border-b dark:bg-gray-800 dark:text-white dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">총액</div>
          <div className="text-xl font-bold">
            {type === 'sell' && displayAmount === '최대'
              ? '최대'
              : formatCurrency(Number(displayAmount) || 0)}
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}

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

      <TradeConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ticker={coin.ticker || ''}
        amount={
          type === 'sell' && displayAmount === '최대'
            ? Number(maxAmount)
            : Number(submitAmount)
        }
        quantity={quantity}
        price={
          type === 'sell' && displayAmount === '최대' ? coin.price : coin.price
        }
        tradeType={type as TradeType}
        name={coin.name}
      />
    </div>
  );
}
