import React from 'react';

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: () => void;
}

export default function ToggleSwitch({ enabled, onChange }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      className={`${
        enabled ? 'bg-blue-500' : 'bg-gray-300'
      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
      onClick={onChange}
    >
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
      />
    </button>
  );
}
