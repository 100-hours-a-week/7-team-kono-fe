import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { formatCurrency } from '../../utils/formatter';
interface PurchaseCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  ticker: string;
  amount: string;
  price: number;
  tradeType: 'buy' | 'sell';
}

export default function PurchaseCompleteModal({
  isOpen,
  onClose,
  onConfirm,
  ticker,
  amount,
  price,
  tradeType,
}: PurchaseCompleteModalProps) {
  return (
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
              <Dialog.Panel className="relative w-full max-w-[410px] bg-white rounded-t-3xl mx-auto dark:bg-gray-800 dark:text-white">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-500 dark:text-gray-400  " />
                </button>

                <div className="px-6 py-8">
                  <div className="flex flex-col items-center mb-8">
                    <CheckCircleIcon className="w-16 h-16 text-green-500 mb-4 dark:text-green-400" />
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-bold text-center"
                    >
                      비트코인 {tradeType === 'buy' ? '구매' : '판매'} 완료
                    </Dialog.Title>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 dark:text-gray-400">
                        1 {ticker} 가격
                      </span>
                      <span>{formatCurrency(price)}원</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 dark:text-gray-400">
                        총 주문 금액
                      </span>
                      <span className="text-lg font-medium">
                        {(Number(amount) * price).toLocaleString()}원
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-full py-4 bg-blue-500 text-white rounded-xl font-medium dark:bg-blue-600 dark:hover:bg-blue-700    "
                    onClick={onConfirm}
                  >
                    확인
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
