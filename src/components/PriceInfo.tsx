import { memo } from 'react';
import { formatCurrency, formatPriceChange } from '../utils/formatter';

// 틱커 데이터 인터페이스
interface TickerDataItem {
  trade_price: number;
  signed_change_rate: number;
  change: string;
  acc_trade_price_24h: number;
  high_price: number;
  low_price: number;
  [key: string]: any;
}

interface TickerDataMap {
  [key: string]: TickerDataItem;
}

interface PriceInfoProps {
  symbol: string;
  tickerData: TickerDataMap | null;
  name?: string; // 코인 이름 (선택 사항)
  onFavoriteToggle?: () => void; // 즐겨찾기 토글 (선택 사항)
  isFavorite?: boolean; // 즐겨찾기 상태 (선택 사항)
}

// 가격 정보 컴포넌트를 메모이제이션
const PriceInfo = memo(
  ({
    symbol,
    tickerData,
    name,
    onFavoriteToggle,
    isFavorite,
  }: PriceInfoProps) => {
    // 티커 데이터가 없거나 해당 심볼에 대한 데이터가 없는 경우 로딩 표시
    if (!tickerData || !tickerData[`KRW-${symbol}`]) {
      return (
        <div className="p-4 border-b flex items-center justify-center h-24">
          <div className="text-center text-gray-500">
            데이터를 불러오는 중...
          </div>
        </div>
      );
    }

    const data = tickerData[`KRW-${symbol}`];

    // 가격 변화율 (퍼센트)
    const priceChange = data.signed_change_rate * 100;

    // 가격 변화 방향에 따른 스타일 클래스
    const priceChangeClass =
      data.change === 'RISE'
        ? 'text-red-500'
        : data.change === 'FALL'
          ? 'text-blue-500'
          : 'text-gray-500';

    return (
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <img
              src={`https://static.upbit.com/logos/${symbol}.png`}
              alt={symbol}
              className="w-10 h-10 rounded-full mr-3"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://via.placeholder.com/40';
              }}
            />
            <div>
              <div className="font-bold">{name || symbol}</div>
              <div className="text-sm text-gray-500">{`KRW-${symbol}`}</div>
            </div>
          </div>

          {/* 즐겨찾기 버튼이 제공된 경우에만 표시 */}
          {/* {onFavoriteToggle && (
            <button
              onClick={onFavoriteToggle}
              className="text-2xl focus:outline-none"
            >
              {isFavorite ? '★' : '☆'}
            </button>
          )} */}
        </div>

        <div className="mt-3">
          <div className="flex items-baseline">
            <div className={`text-2xl font-bold ${priceChangeClass}`}>
              {formatCurrency(data.trade_price)}
            </div>
            <div className={`ml-2 ${priceChangeClass}`}>
              {formatPriceChange(priceChange)}
            </div>
          </div>

          <div className="flex justify-between mt-2 text-sm">
            <div>
              <span className="text-gray-500">고가</span>
              <span className="ml-1 text-red-500">
                {formatCurrency(data.high_price, '', false)}
              </span>
            </div>
            <div>
              <span className="text-gray-500">저가</span>
              <span className="ml-1 text-blue-500">
                {formatCurrency(data.low_price, '', false)}
              </span>
            </div>
            <div>
              <span className="text-gray-500">거래량</span>
              <span className="ml-1">
                {data.acc_trade_volume_24h.toFixed(2)} {symbol}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default PriceInfo;
