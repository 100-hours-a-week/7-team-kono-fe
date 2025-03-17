import React, { ButtonHTMLAttributes } from 'react';
import styles from '../../styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  // Base styles for all buttons
  let baseStyles = `font-pretendardMedium rounded-lg transition-all ${styles.transition}`;

  // Size variations
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Variant styles
  const variantStyles = {
    primary: `bg-primary text-white hover:opacity-90 ${disabled || isLoading ? 'opacity-70 cursor-not-allowed' : ''}`,
    secondary: `bg-secondary text-white hover:opacity-90 ${disabled || isLoading ? 'opacity-70 cursor-not-allowed' : ''}`,
    outline: `border-2 border-primary text-primary hover:bg-primary hover:text-white ${
      disabled || isLoading ? 'opacity-70 border-opacity-70 cursor-not-allowed hover:bg-transparent hover:text-primary' : ''
    }`,
  };

  // Full width style
  const widthStyle = fullWidth ? 'w-full' : '';

  // Combine all styles
  const buttonStyles = `
    ${baseStyles} 
    ${sizeStyles[size]} 
    ${variantStyles[variant]} 
    ${widthStyle} 
    ${className}
  `;

  return (
    <button
      className={buttonStyles}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          로딩 중...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;