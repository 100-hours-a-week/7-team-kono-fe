import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa';
import Header from '../components/layout/Header';
import FilterModal, {
  FilterType,
  displayToDataMap,
  dataToDisplayMap,
  DataFilterType,
} from '../components/modal/FilterModal';
import { formatDate, formatCurrency } from '../utils/formatter';
import { getTransactionsByNickname } from '../api/transaction';

// 거래 타입 정의
type TransactionType = 'buy' | 'sell';

// 거래 내역 인터페이스
// interface Transaction {
//   id: string;
//   type: TransactionType;
//   coinName: string;
//   ticker: string;
//   amount: number;
//   price: number;
//   total: number;
//   date: Date;
// }

type Transaction = {
  id: string;
  nickname: string;
  type: TransactionType;
  coinName: string;
  ticker: string;
  amount: number;
  price: number;
  total: number;
  date: string;
};

export default function Transaction() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FilterType>('전체');
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const nickname = 'test'; // 실제 구현에서는 로그인된 사용자의 닉네임을 사용

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactionsByNickname(nickname);
        setTransactions(data);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
        setTransactions([]);
      }
    };

    fetchTransactions();
  }, [nickname]);

  // 필터링된 거래 내역
  const filteredTransactions = transactions.filter((transaction) => {
    if (activeFilter === '전체') return true;
    return (
      transaction.type === (displayToDataMap[activeFilter] as TransactionType)
    );
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
  const goToCoinDetail = (ticker: string) => {
    navigate(`/coins/${ticker}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더 */}
      <Header title="매매 내역" />

      {/* 필터 표시 */}
      <div className="mx-4 bg-white p-4 border-b flex justify-between rounded-t-xl shadow-sm dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">필터</span>
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
              className={`p-4 border-b bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 shadow-sm last:rounded-b-xl last:border-b-0`}
              onClick={() => goToCoinDetail(transaction.ticker)}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <img
                    src={`https://static.upbit.com/logos/${transaction.ticker}.png`}
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
                      {transaction.ticker}
                    </div>
                  </div>
                </div>
                <div
                  className={`px-2 py-1 rounded-md text-sm font-medium ${
                    transaction.type === 'buy'
                      ? 'bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-400'
                      : 'bg-blue-100 text-blue-500 dark:bg-blue-900 dark:text-blue-400'
                  }`}
                >
                  {
                    dataToDisplayMap[
                      transaction.type as unknown as DataFilterType
                    ]
                  }
                </div>
              </div>

              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500 dark:text-gray-400">수량</span>
                <span>
                  {transaction.amount} {transaction.ticker}
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
                <span>{formatDate(new Date(transaction.date))}</span>
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
