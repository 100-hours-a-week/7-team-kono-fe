import React from 'react';
import { useTranslation } from 'react-i18next';

export type FilterType = '전체' | '매수' | '매도';
export type DataFilterType = 'all' | 'buy' | 'sell';

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
  const { t } = useTranslation();

  if (!isOpen) return null;

  const filterLabels: Record<FilterType, string> = {
    전체: t('transactions.all'),
    매수: t('trade.buy'),
    매도: t('trade.sell'),
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 dark:bg-gray-800 dark:bg-opacity-50">
      <div className="bg-white rounded-xl w-full max-w-[390px] p-4 dark:bg-gray-800">
        <div className="text-lg text-center font-bold mb-4">
          {t('common.filter')}
        </div>

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
            {filterLabels[filter]}
          </button>
        ))}

        <button
          className="w-full py-3 mt-2 rounded-xl bg-gray-200 text-gray-700 font-medium dark:bg-gray-700 dark:text-gray-300"
          onClick={onClose}
        >
          {t('common.cancel')}
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
