export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://dev.playkono.com/api';
export const API_TIMEOUT = 30000;

export const TOKEN_KEY = 'kono_access_token';
export const REFRESH_TOKEN_KEY = 'kono_refresh_token';
export const TOKEN_EXPIRY = 'kono_token_expiry';

export const DEFAULT_PAGE_SIZE = 20;
export const DEFAULT_PAGE_NUMBER = 1;

export const THEME_KEY = 'kono_theme';
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const TRADE_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELED: 'canceled',
};

export const LOG = {
  ERR: {
    AUTH: {
      REQUEST: 'Request setup error occurred.',
      NETWORK: 'Network error occurred. No response from server.',
      RESPONSE: 'Server response error occurred.',
    },
    KAKAO: {
      INITIATE: 'Failed to initiate Kakao login',
      SDK_NOT_INITIALIZED: 'Kakao SDK not initialized yet.',
    },
    USER: {
      GET_INFO: 'Failed to load user information.',
      GET_PROFILE: 'Failed to load user profile information.',
      LOGOUT: 'Failed to logout.',
      WITHDRAW: 'Failed to withdraw.',
      DELETE: 'Failed to delete account.',
      UPDATE_PROFILE_IMAGE: 'Failed to update user profile image.',
      UPDATE_NICKNAME: 'Failed to update user nickname.',
    },
    COINS: {
      GET_INFO: 'Failed to fetch coin details.',
      GET_LIST: 'Failed to fetch coin list.',
      GET_NAME: 'Failed to fetch coin name.',
      INVALID_DATA_FORMAT: 'Coin data format is invalid.',
      FETCH_DATA: 'Failed to fetch coin data.',
    },
    FAVORITES: {
      TOGGLE: 'Failed to toggle favorite coin.',
      GET_LIST: 'Failed to retrieve favorite coins.',
      INITIALIZE: 'Failed to initialize favorites.',
      GET_STATUS: 'Failed to fetch favorite status.',
      ADD: 'Failed to add favorite coin.',
      REMOVE: 'Failed to remove favorite coin.',
    },
    WALLETS: {
      GET_HOLDING_COIN: 'Failed to fetch holding coins.',
      GET_DATA: 'Failed to fetch wallet data.',
      GET_TRANSACTIONS: 'Failed to fetch transactions.',
      GET_BALANCE: 'Failed to fetch balance.',
    },
    TRANSACTIONS: {
      TRANSACTION: 'Transaction failed. Please try again.',
      GET_HISTORY: 'Failed to retrieve transaction history.',
      GET_HISTORY_BY_TYPE: 'Failed to retrieve transaction history by type.',
      MARKET_BUY: 'Market buy order failed.',
      MARKET_SELL: 'Market sell order failed.',
    },
    RANKINGS: {
      GET_INFO: 'Failed to get ranking lists.',
      GET_DAILY: 'Failed to get daily ranks.',
      GET_USER_DAILY: 'Failed to get user daily rank.',
      GET_ALL: 'Failed to get ranks.',
      GET_USER_ALL: 'Failed to get user ranks.',
    },
    GENERAL: {
      DEFAULT: 'An error occurred. Please try again.',
      INTERNAL_SERVER: 'Internal server error.',
      TOO_MANY_REQUESTS: 'Too many requests. Please try again later.',
      JSON_PARSE: 'Failed to parse incoming message as JSON.',
      FORMAT_DATE: 'Failed to format date.',
      INVALID_DATE: 'Invalid date.',
      TICKER_MISSING: 'Ticker information is missing.',
      INVALID_TRADE_TYPE: 'Invalid trade type.',
    },
  },
} as const;

export const UI = {
  OK: {
    AUTH: {
      SIGNUP: 'Register success.',
      LOGIN: 'Login success.',
      LOGOUT: '로그아웃 되었습니다.',
    },
    USER: {
      GET_INFO: 'User information retrieved.',
      UPDATE_PROFILE: 'User information updated.',
      UPDATE_NICKNAME: 'Nickname updated successfully.',
      UPDATE_PROFILE_IMAGE: '프로필 이미지가 업데이트되었습니다.',
      DELETE_ACCOUNT: '회원탈퇴가 완료되었습니다.',
    },
    COINS: {
      LIST: 'Coin list retrieved.',
      DETAILS: 'Coin details retrieved.',
    },
    FAVORITES: {
      ADD: 'Favorite coin added.',
      REMOVE: 'Favorite coin removed.',
    },
    WALLETS: {
      CASH: 'Cash data retrieved.',
      COINS: 'Coin holdings retrieved.',
    },
    TRANSACTIONS: {
      HISTORY: 'Transaction history retrieved.',
    },
    RANKINGS: {
      DAILY: 'Daily ranking retrieved.',
      TOTAL: 'Total ranking retrieved.',
    },
  },
  ERR: {
    AUTH: {
      UNAUTHORIZED: '인증에 실패했습니다.',
    },
    USER: {
      LOGOUT: '로그아웃 중 오류가 발생했습니다.',
      WITHDRAW: '회원탈퇴 처리 중 오류가 발생했습니다.',
      WITHDRAW_UNAUTHORIZED: '로그인이 필요합니다.',
      WITHDRAW_FORBIDDEN: '탈퇴 권한이 없습니다.',
      UPDATE_PROFILE_IMAGE: '이미지 업로드에 실패했습니다.',
      UPDATE_PROFILE_IMAGE_INVALID: '이미지 파일만 업로드 가능합니다.',
      UPDATE_NICKNAME_REQUIRED: '닉네임을 입력해주세요.',
      UPDATE_NICKNAME: '닉네임 변경에 실패했습니다.',
    },
    COINS: {
      FETCH: '코인 정보를 불러오는데 실패했습니다.',
    },
    FAVORITES: {
      TOGGLE: '즐겨찾기 변경에 실패했습니다.',
    },
    TRANSACTIONS: {
      TRANSACTION: '거래에 실패했습니다.',
    },
  },
} as const;
