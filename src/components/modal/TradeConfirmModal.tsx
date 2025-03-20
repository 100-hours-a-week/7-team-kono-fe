import { Fragment, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Toast from '../common/Toast';
import PurchaseCompleteModal from './PurchaseCompleteModal';
import { useNavigate } from 'react-router-dom';

interface TradeConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticker: string;
  amount: string;
  price: number;
  tradeType: 'buy' | 'sell';
}

export default function TradeConfirmModal({
  isOpen,
  onClose,
  ticker,
  amount,
  price,
  tradeType,
}: TradeConfirmModalProps) {
  const navigate = useNavigate();
  const panelRef = useRef<HTMLDivElement>(null);
  const [showComplete, setShowComplete] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // 값이 없을 때의 기본값 처리
  const safeAmount = amount || 0;
  const safePrice = price || 0;

  const handleTrade = () => {
    onClose();
    setShowComplete(true);
  };

  const handleCompleteConfirm = () => {
    setShowComplete(false);
    // Store toast info in sessionStorage before navigation
    sessionStorage.setItem(
      'tradeToast',
      JSON.stringify({
        show: true,
        message: `${tradeType === 'buy' ? '구매' : '판매'}를 완료했어요.`,
        timestamp: Date.now(),
      }),
    );
    navigate(`/coins/${ticker}`);
  };

  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity dark:bg-white dark:bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 z-10">
            <div className="flex min-h-full items-end justify-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-full"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-full"
              >
                <Dialog.Panel
                  ref={panelRef}
                  className="relative w-full max-w-[410px] transform bg-white rounded-t-3xl transition-all mx-auto overflow-hidden dark:bg-gray-800 dark:text-white"
                >
                  {/* X 버튼 */}
                  <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <XMarkIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  </button>

                  {/* 스크롤 가능한 컨텐츠 영역 */}
                  <div className="max-h-[80vh] overflow-y-auto">
                    <div className="px-6 pb-8">
                      <div className="text-center my-8">
                        <Dialog.Title
                          as="h3"
                          className="text-lg text-gray-500 mb-2 dark:text-gray-400"
                        >
                          비트코인
                        </Dialog.Title>
                        <p className="text-2xl font-bold">
                          {amount} {ticker}{' '}
                          {tradeType === 'buy' ? '구매' : '판매'}
                        </p>
                      </div>

                      <div className="space-y-4 mb-8">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 dark:text-gray-400">
                            1 {ticker} 가격
                          </span>
                          <span>{safePrice.toLocaleString()}원</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 dark:text-gray-400">
                            총 {tradeType === 'buy' ? '구매' : '판매'} 금액
                          </span>
                          <span className="font-medium text-lg">
                            {(safeAmount * safePrice).toLocaleString()}원
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          className="flex-1 py-4 rounded-xl bg-gray-100 font-medium text-gray-900 dark:bg-gray-700 dark:text-gray-100     "
                          onClick={onClose}
                        >
                          닫기
                        </button>
                        <button
                          type="button"
                          className={`flex-1 py-4 rounded-xl font-medium text-white ${
                            tradeType === 'buy'
                              ? 'bg-red-500 dark:bg-red-600 dark:hover:bg-red-700'
                              : 'bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700'
                          }`}
                          onClick={handleTrade}
                        >
                          {tradeType === 'buy' ? '구매' : '판매'}
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <PurchaseCompleteModal
        isOpen={showComplete}
        onClose={() => setShowComplete(false)}
        onConfirm={handleCompleteConfirm}
        ticker={ticker}
        amount={amount}
        price={price}
        tradeType={tradeType}
      />

      <Toast
        show={showToast}
        message={`${tradeType === 'buy' ? '구매' : '판매'}를 완료했어요.`}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
