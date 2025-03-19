/**
 * 숫자를 통화 형식으로 포맷팅합니다.
 * @param value 포맷팅할 숫자
 * @param currency 통화 단위 (기본값: '원')
 * @param showCurrency 통화 단위 표시 여부 (기본값: true)
 * @returns '1,234 원' 형식의 문자열
 */
export const formatCurrency = (
  value: number,
  currency: string = '원',
  showCurrency: boolean = true,
): string => {
  const formatted = value.toLocaleString('ko-KR');
  return showCurrency ? `${formatted} ${currency}` : formatted;
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

/**
 * 소수점이 있는 숫자를 포맷팅합니다.
 * @param value 포맷팅할 숫자
 * @param decimals 소수점 자릿수 (기본값: 2)
 */
export const formatDecimal = (value: number, decimals: number = 2): string => {
  return value.toFixed(decimals);
};

/**
 * 금액에 단위를 붙여 읽기 쉬운 형태로 변환합니다.
 * @param value 변환할 금액
 * @param showUnit 단위 표시 여부 (기본값: true)
 */
export const formatAmount = (
  value: number,
  showUnit: boolean = true,
): string => {
  if (value >= 1_000_000_000_000) {
    return `${(value / 1_000_000_000_000).toFixed(1)}${showUnit ? '조' : ''}`;
  } else if (value >= 100_000_000) {
    return `${(value / 100_000_000).toFixed(1)}${showUnit ? '억' : ''}`;
  } else if (value >= 10_000) {
    return `${(value / 10_000).toFixed(1)}${showUnit ? '만' : ''}`;
  }
  return value.toLocaleString('ko-KR');
};
