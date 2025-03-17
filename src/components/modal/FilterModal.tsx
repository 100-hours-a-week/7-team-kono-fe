import React from 'react';

// 필터 타입 정의
export type FilterType = '전체' | '매수' | '매도';

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-[410px] p-4">
        <div className="text-lg text-center font-bold mb-4">필터</div>

        {(['전체', '매수', '매도'] as FilterType[]).map((filter) => (
          <button
            key={filter}
            className={`w-full text-left p-3 mb-2 rounded-xl ${
              activeFilter === filter
                ? 'bg-blue-50 text-blue-500'
                : 'bg-gray-100'
            }`}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </button>
        ))}

        <button
          className="w-full py-3 mt-2 rounded-xl bg-gray-200 text-gray-700 font-medium"
          onClick={onClose}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
