import { useEffect, useRef } from 'react';

interface TradingViewWidgetProps {
  symbol: string;
  theme: 'light' | 'dark';
  interval: string;
  locale: string;
  width: string;
  height: string;
}

let tvScriptLoadingPromise: Promise<void>;

export default function TradingViewWidget({
  symbol,
  theme,
  interval,
  locale,
  width,
  height,
}: TradingViewWidgetProps) {
  const onLoadScriptRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement('script');
        script.id = 'tradingview-widget-loading-script';
        script.src = 'https://s3.tradingview.com/tv.js';
        script.type = 'text/javascript';
        script.onload = resolve as () => void;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current(),
    );

    return () => {
      onLoadScriptRef.current = null;
    };

    function createWidget() {
      if (
        document.getElementById('tradingview-widget') &&
        'TradingView' in window
      ) {
        new (window as any).TradingView.widget({
          container_id: 'tradingview-widget',
          symbol: symbol,
          interval: interval,
          theme: theme,
          locale: locale,
          width: width,
          height: height,
          timezone: 'Asia/Seoul',
          style: '1',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          save_image: false,
          studies: ['Volume@tv-basicstudies'],
          show_popup_button: true,
          popup_width: '1000',
          popup_height: '650',
        });
      }
    }
  }, [symbol, theme, interval, locale, width, height]);

  return <div id="tradingview-widget" />;
}
