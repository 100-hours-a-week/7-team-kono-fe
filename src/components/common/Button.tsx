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

  return (
    <button>

    </button>
  );
};

export default Button;