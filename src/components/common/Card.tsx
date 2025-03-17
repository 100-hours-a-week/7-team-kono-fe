import React, { ReactNode } from 'react';
import styles from '../../styles';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  footer?: ReactNode;
  hoverEffect?: boolean;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  footer,
  hoverEffect = false,
  className = '',
}) => {
  // Basic card style from styles constant
  const baseCardStyle = styles.cardStyle;
  
  // Additional styles based on props
  const hoverStyle = hoverEffect ? styles.hoverEffect : '';

  return (
    <div className={`${baseCardStyle} ${hoverStyle} ${className}`}>
      {/* Card Header */}
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="font-pretendardBold text-lg text-mainText">{title}</h3>}
          {subtitle && <p className="text-subText text-sm mt-1">{subtitle}</p>}
        </div>
      )}
      
      {/* Card Content */}
      <div className="mb-4">{children}</div>
      
      {/* Card Footer */}
      {footer && (
        <div className="pt-4 border-t border-gray-200 mt-auto">{footer}</div>
      )}
    </div>
  );
};

export default Card;