/**
 * 숫자를 통화 형식으로 포맷팅합니다.
 * 데이터 표기 기준에 따라 소수점 여섯번째 자리까지 표기하며, 소수점이 0인 경우 생략합니다.
 * @param value 포맷팅할 숫자
 * @param currency 통화 단위 (기본값: 'KRW')
 * @param showCurrency 통화 단위 표시 여부 (기본값: true)
 * @param showSign 부호 표시 여부 (기본값: false)
 * @returns 형식의 문자열 예: '100.123456 KRW' 또는 '+123,456'
 */
export const formatCurrency = (
  value: number,
  currency: string = 'KRW',
  showCurrency: boolean = true,
  showSign: boolean = false,
): string => {
  // 부호 처리
  const sign = showSign && value > 0 ? '+' : '';
  const absValue = Math.abs(value);

  // 소수점 처리 로직
  let formattedValue: string;
  if (Number.isInteger(absValue)) {
    // 정수인 경우 소수점 표시 안함
    formattedValue = absValue.toLocaleString('ko-KR');
  } else {
    // 소수점이 있는 경우, 필요한 소수점 자리까지만 표시 (최대 6자리)
    const parts = absValue.toString().split('.');
    const integerPart = parseInt(parts[0]).toLocaleString('ko-KR');

    let decimalPart = parts[1] || '';
    if (decimalPart.length > 6) {
      decimalPart = decimalPart.substring(0, 6);
    }

    // 소수점 끝의 불필요한 0 제거
    while (decimalPart.endsWith('0')) {
      decimalPart = decimalPart.slice(0, -1);
    }

    formattedValue =
      decimalPart.length > 0 ? `${integerPart}.${decimalPart}` : integerPart;
  }

  // 부호가 있고 통화 단위 표시가 필요한 경우
  if (sign && showCurrency) {
    return `${sign}${formattedValue}`;
  }
  // 부호가 있고 통화 단위 표시가 필요 없는 경우
  else if (sign) {
    return `${sign}${formattedValue}`;
  }
  // 통화 단위 표시가 필요한 경우
  else if (showCurrency) {
    return `${formattedValue} ${currency}`;
  }
  // 숫자만 표시
  else {
    return formattedValue;
  }
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
 * 날짜를 표기 기준에 맞게 포맷팅합니다. (yy-MM-dd HH:mm)
 * @param date 포맷팅할 Date 객체
 * @returns 'yy-MM-dd HH:mm' 형식의 문자열
 */
export const formatDate = (date: string | Date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  try {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  } catch (error) {
    console.error('날짜 형식 변환 오류:', error);
    return '날짜 형식 오류';
  }
};

/**
 * 가격 변동률을 표기 기준에 맞게 포맷팅합니다. (소수점 둘째 자리까지, 소수점이 0인 경우 생략)
 * @param change 변동률 (%)
 * @returns 형식의 문자열 예: '50%' 또는 '50.45%'
 */
export const formatPriceChange = (change: number): string => {
  const sign = change > 0 ? '+' : '';

  // 정수인지 확인
  if (Number.isInteger(change)) {
    return `${sign}${change}%`;
  }

  // 소수점이 있는 경우 처리
  const fixed = change.toFixed(2);
  const parts = fixed.split('.');
  let decimalPart = parts[1];

  // 소수점 끝의 불필요한 0 제거
  while (decimalPart.endsWith('0')) {
    decimalPart = decimalPart.slice(0, -1);
  }

  // 소수부가 남아있으면 소수점 포함, 아니면 정수만 반환
  return decimalPart.length > 0
    ? `${sign}${parts[0]}.${decimalPart}%`
    : `${sign}${parts[0]}%`;
};

/**
 * 소수점이 있는 숫자를 포맷팅합니다.
 * @param value 포맷팅할 숫자
 * @param decimals 소수점 자릿수 (기본값: 2)
 * @param removeTrailingZeros 소수점 뒤의 0 제거 여부 (기본값: false)
 */
export const formatDecimal = (
  value: number,
  decimals: number = 2,
  removeTrailingZeros: boolean = false,
): string => {
  const fixed = value.toFixed(decimals);

  if (removeTrailingZeros) {
    // 소수점 뒤의 0 제거
    if (fixed.includes('.')) {
      const parts = fixed.split('.');
      let decimalPart = parts[1];

      while (decimalPart.endsWith('0')) {
        decimalPart = decimalPart.slice(0, -1);
      }

      return decimalPart.length > 0 ? `${parts[0]}.${decimalPart}` : parts[0];
    }
  }

  return fixed;
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
    return `${Math.floor(value / 1_000_000_000_000)}${showUnit ? '조' : ''}`;
  } else if (value >= 100_000_000) {
    return `${Math.floor(value / 100_000_000)}${showUnit ? '억' : ''}`;
  } else if (value >= 10_000) {
    return `${Math.floor(value / 10_000)}${showUnit ? '만' : ''}`;
  }
  return value.toLocaleString('ko-KR');
};

/**
 * 퍼센트 값을 표기 기준에 맞게 포맷팅합니다. (소수점 둘째 자리까지)
 * @param value 포맷팅할 퍼센트 값 (0.5 = 50%)
 * @returns 형식의 문자열 예: '50.00%'
 */
export const formatPercent = (value: number): string => {
  // 소수점을 100 곱하고 소수점 둘째 자리까지 표시
  return `${(value * 100).toFixed(2)}%`;
};
