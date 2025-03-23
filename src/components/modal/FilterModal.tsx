import React from 'react';

// 필터 타입 정의
export type FilterType = '전체' | '매수' | '매도';
export type DataFilterType = 'all' | 'buy' | 'sell';

// 데이터 타입과 표시 타입 간의 매핑
export const dataToDisplayMap: Record<DataFilterType, FilterType> = {
  all: '전체',
  buy: '매수',
  sell: '매도',
};

export const displayToDataMap: Record<FilterType, DataFilterType> = {
  전체: 'all',
  매수: 'buy',
  매도: 'sell',
};

interface FilterModalProps {
  isOpen: boolean;
  activeFilter: FilterType;
  onClose: () => void;
  onFilterChange: (filter: FilterType) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  activeFilter,
  onClose,
  onFilterChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 dark:bg-gray-800 dark:bg-opacity-50">
      <div className="bg-white rounded-xl w-full max-w-[390px] p-4 dark:bg-gray-800">
        <div className="text-lg text-center font-bold mb-4">필터</div>

        {(['전체', '매수', '매도'] as FilterType[]).map((filter) => (
          <button
            key={filter}
            className={`w-full text-left p-3 mb-2 rounded-xl ${
              activeFilter === filter
                ? 'bg-blue-50 text-blue-500 dark:bg-blue-900 dark:text-blue-400'
                : 'bg-gray-100 dark:bg-gray-700'
            }`}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </button>
        ))}

        <button
          className="w-full py-3 mt-2 rounded-xl bg-gray-200 text-gray-700 font-medium dark:bg-gray-700 dark:text-gray-300"
          onClick={onClose}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
