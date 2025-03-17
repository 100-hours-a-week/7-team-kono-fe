/**
 * 숫자를 통화 형식으로 포맷팅합니다.
 */
export const formatCurrency = (value: number, currency = 'KRW'): string => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * 거래량을 K, M, B 단위로 포맷팅합니다.
 */
export const formatVolume = (value: number): string => {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  } else if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toString();
};

/**
 * 날짜를 한국 형식으로 포맷팅합니다.
 * @param date 포맷팅할 Date 객체
 * @returns 'YYYY-MM-DD HH:MM' 형식의 문자열
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * 가격 변동률을 포맷팅합니다.
 */
export const formatPriceChange = (change: number): string => {
  const sign = change > 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}%`;
};
