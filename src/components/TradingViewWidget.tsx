import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface TradingViewWidgetProps {
  symbol: string;
  interval: string;
  theme?: 'light' | 'dark';
  locale: string;
  hideLegend?: boolean;
  hideTopToolbar?: boolean;
  allowSymbolChange?: boolean;
  saveImage?: boolean;
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({
  symbol,
  interval,
  locale,
  hideLegend = true,
  hideTopToolbar = true,
  allowSymbolChange = false,
  saveImage = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    if (containerRef.current) {
      const script = document.createElement('script');
      script.src =
        'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: symbol,
        interval: interval,
        timezone: 'Asia/Seoul',
        theme: darkMode ? 'dark' : 'light',
        style: '3',
        locale: locale,
        hide_top_toolbar: hideTopToolbar,
        hide_legend: hideLegend,
        allow_symbol_change: allowSymbolChange,
        save_image: saveImage,
        support_host: 'https://www.tradingview.com',
      });

      containerRef.current.appendChild(script);

      return () => {
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }
      };
    }
  }, [
    symbol,
    interval,
    darkMode,
    locale,
    hideLegend,
    hideTopToolbar,
    allowSymbolChange,
    saveImage,
  ]);

  return (
    <div
      className="tradingview-widget-container"
      ref={containerRef}
      style={{ height: '50%', width: '100%' }}
    />
  );
};

export default TradingViewWidget;
