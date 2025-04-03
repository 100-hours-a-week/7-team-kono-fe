import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/solid';

interface ToastProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

export default function Toast({ show, message, onClose }: ToastProps) {
  return (
    <Transition
      show={show}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0"
      enterTo="translate-y-0 opacity-100"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-x-0 top-4 flex items-center justify-center px-4 z-50">
        <div className="bg-toastBg rounded-full px-6 py-3 shadow-lg flex items-center gap-2">
          <div className="bg-green-500 rounded-full p-1">
            <CheckIcon className="h-4 w-4 text-white" />
          </div>
          <p className="text-white">{message}</p>
        </div>
      </div>
    </Transition>
  );
}
