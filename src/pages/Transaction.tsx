import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa';
import Header from '../components/layout/Header';
import FilterModal, { FilterType } from '../components/modal/FilterModal';
import { formatDate, formatCurrency } from '../utils/formatter';

// 거래 타입 정의
type TransactionType = '매수' | '매도';

// 거래 내역 인터페이스
interface Transaction {
  id: string;
  type: TransactionType;
  coinName: string;
  symbol: string;
  amount: number;
  price: number;
  total: number;
  date: Date;
}

export default function Transaction() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FilterType>('전체');
  const [showFilterModal, setShowFilterModal] = useState(false);

  // 거래 내역 목 데이터
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      type: '매수',
      coinName: '비트코인',
      symbol: 'BTC',
      amount: 0.01,
      price: 68500000,
      total: 685000,
      date: new Date('2023-05-15T09:30:00'),
    },
    {
      id: '2',
      type: '매도',
      coinName: '이더리움',
      symbol: 'ETH',
      amount: 0.5,
      price: 3200000,
      total: 1600000,
      date: new Date('2023-05-14T14:20:00'),
    },
    {
      id: '3',
      type: '매수',
      coinName: '리플',
      symbol: 'XRP',
      amount: 1000,
      price: 580,
      total: 580000,
      date: new Date('2023-05-12T11:45:00'),
    },
    {
      id: '4',
      type: '매수',
      coinName: '카르다노',
      symbol: 'ADA',
      amount: 500,
      price: 420,
      total: 210000,
      date: new Date('2023-05-10T16:30:00'),
    },
    {
      id: '5',
      type: '매도',
      coinName: '솔라나',
      symbol: 'SOL',
      amount: 2,
      price: 98000,
      total: 196000,
      date: new Date('2023-05-08T10:15:00'),
    },
  ]);

  // 필터링된 거래 내역
  const filteredTransactions = transactions.filter((transaction) => {
    if (activeFilter === '전체') return true;
    return transaction.type === activeFilter;
  });

  // 필터 모달 토글
  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  // 필터 변경
  const changeFilter = (filter: FilterType) => {
    setActiveFilter(filter);
    setShowFilterModal(false);
  };

  // 코인 상세 페이지로 이동
  const goToCoinDetail = (symbol: string) => {
    navigate(`/coins/${symbol}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더 */}
      <Header title="매매 내역" />

      {/* 필터 표시 */}
      <div className="mx-4 bg-white p-4 border-b flex justify-between rounded-t-xl dark:bg-gray-800 dark:text-white dark:border-gray-700">
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">필터:</span>
          <span className="text-sm font-medium">{activeFilter}</span>
        </div>
        <button onClick={toggleFilterModal} className="p-1">
          <FaFilter className="text-xl" />
        </button>
      </div>

      {/* 거래 내역 목록 */}
      {filteredTransactions.length > 0 ? (
        <div className="flex-1 rounded-xl mx-4 mb-2">
          {filteredTransactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className={`p-4 border-b bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700     ${
                index === filteredTransactions.length - 1
                  ? 'rounded-b-xl border-b-0'
                  : ''
              }`}
              onClick={() => goToCoinDetail(transaction.symbol)}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <img
                    src={`https://static.upbit.com/logos/${transaction.symbol}.png`}
                    alt={transaction.coinName}
                    className="w-10 h-10 rounded-full mr-3"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://via.placeholder.com/40';
                    }}
                  />
                  <div>
                    <div className="font-medium">{transaction.coinName}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {transaction.symbol}
                    </div>
                  </div>
                </div>
                <div
                  className={`px-2 py-1 rounded-md text-sm font-medium ${
                    transaction.type === '매수'
                      ? 'bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-400'
                      : 'bg-blue-100 text-blue-500 dark:bg-blue-900 dark:text-blue-400'
                  }`}
                >
                  {transaction.type}
                </div>
              </div>

              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500 dark:text-gray-400">수량</span>
                <span>
                  {transaction.amount} {transaction.symbol}
                </span>
              </div>

              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500 dark:text-gray-400">가격</span>
                <span>{formatCurrency(transaction.price)}</span>
              </div>

              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500 dark:text-gray-400">총액</span>
                <span className="font-medium">
                  {formatCurrency(transaction.total)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">날짜</span>
                <span>{formatDate(transaction.date)}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="text-xl font-bold mb-2">거래 내역이 없습니다</div>
          <div className="text-gray-500 text-center mb-6 dark:text-gray-400">
            첫 번째 코인을 구매해보세요
          </div>
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-xl font-medium dark:bg-blue-400"
            onClick={() => navigate('/discover')}
          >
            탐색하러 가기
          </button>
        </div>
      )}

      {/* 필터 모달 */}
      <FilterModal
        isOpen={showFilterModal}
        activeFilter={activeFilter}
        onClose={() => setShowFilterModal(false)}
        onFilterChange={changeFilter}
      />
    </div>
  );
}
