// API 관련 상수
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://dev.playkono.com/api';
export const API_TIMEOUT = 30000;

// 인증 관련 상수
export const TOKEN_KEY = 'kono_access_token';
export const REFRESH_TOKEN_KEY = 'kono_refresh_token';
export const TOKEN_EXPIRY = 'kono_token_expiry';

// 페이지네이션 관련 상수
export const DEFAULT_PAGE_SIZE = 20;
export const DEFAULT_PAGE_NUMBER = 1;

// 테마 관련 상수
export const THEME_KEY = 'kono_theme';
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

// 에러 메시지
export const ERROR_MESSAGES = {
  GENERAL: '오류가 발생했습니다. 다시 시도해주세요.',
  NETWORK: '네트워크 연결을 확인해주세요.',
  UNAUTHORIZED: '로그인이 필요합니다.',
  FORBIDDEN: '접근 권한이 없습니다.',
  NOT_FOUND: '요청하신 정보를 찾을 수 없습니다.',
};

// 거래 상태 코드
export const TRADE_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELED: 'canceled',
};