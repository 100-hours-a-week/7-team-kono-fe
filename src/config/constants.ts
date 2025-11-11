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

export const SUCCESS_MESSAGES = {
  AUTH: {
    SIGNUP: 'Register success.',
    LOGIN: 'Login success.',
  },
  USER: {
    GET_INFO: 'User information retrieved.',
    UPDATE_PROFILE: 'User information updated.',
    UPDATE_NICKNAME: 'Nickname updated successfully.',
  },
  COINS: {
    LIST_RETRIEVED: 'Coin list retrieved.',
    DETAILS_RETRIEVED: 'Coin details retrieved.',
  },
  FAVORITES: {
    ADDED: 'Favorite coin added.',
    REMOVED: 'Favorite coin removed.',
  },
  WALLETS: {
    CASH_RETRIEVED: 'Cash data retrieved.',
    COINS_RETRIEVED: 'Coin holdings retrieved.',
  },
  TRANSACTIONS: {
    HISTORY_RETRIEVED: 'Transaction history retrieved.',
  },
  RANKINGS: {
    DAILY_RETRIEVED: 'Daily ranking retrieved.',
    TOTAL_RETRIEVED: 'Total ranking retrieved.',
  },
} as const;

export const ERROR_MESSAGES = {
  AUTH: {
    REQUEST_ERROR: 'Request setup error occurred.',
    NETWORK_ERROR: 'Network error occurred. No response from server.',
    RESPONSE_ERROR: 'Server response error occurred.',
  },
  KAKAO: {
    INITIATE_FAILED: 'Failed to initiate Kakao login',
    SDK_NOT_INITIALIZED: 'Kakao SDK not initialized yet.',
  },
  USER: {
    GET_INFO_FAILED: 'Failed to load user information.',
    GET_PROFILE_FAILED: 'Failed to load user profile information.',
    LOGOUT_FAILED: 'Failed to logout.',
    WITHDRAW_FAILED: 'Failed to withdraw.',
    UPDATE_PROFILE_IMAGE_FAILED: 'Failed to update user profile image.',
    UPDATE_NICKNAME_FAILED: 'Failed to update user nickname.',
    DELETE_USER_FAILED: 'Failed to delete account.',
  },
  COINS: {
    GET_INFO_FAILED: 'Failed to fetch coin details.',
    GET_LIST_FAILED: 'Failed to fetch coin list.',
    GET_NAME_FAILED: 'Failed to fetch coin name.',
    INVALID_DATA_FORMAT: 'Coin data format is invalid.',
    FETCH_DATA_FAILED: 'Failed to fetch coin data.',
  },
  FAVORITES: {
    TOGGLE_FAILED: 'Failed to toggle favorite coin.',
    GET_LIST_FAILED: 'Failed to retrieve favorite coins.',
    INITIALIZE_FAILED: 'Failed to initialize favorites.',
    GET_STATUS_FAILED: 'Failed to fetch favorite status.',
    ADD_FAILED: 'Failed to add favorite coin.',
    REMOVE_FAILED: 'Failed to remove favorite coin.',
  },
  WALLETS: {
    GET_HOLDING_COIN_FAILED: 'Failed to fetch holding coins.',
    GET_WALLET_DATA_FAILED: 'Failed to fetch wallet data.',
    GET_TRANSACTIONS_FAILED: 'Failed to fetch transactions.',
    GET_BALANCE_FAILED: 'Failed to fetch balance.',
  },
  TRANSACTIONS: {
    TRANSACTION_FAILED: 'Transaction failed. Please try again.',
    GET_HISTORY_FAILED: 'Failed to retrieve transaction history.',
    GET_HISTORY_BY_TYPE_FAILED:
      'Failed to retrieve transaction history by type.',
    MARKET_BUY_FAILED: 'Market buy order failed.',
    MARKET_SELL_FAILED: 'Market sell order failed.',
  },
  RANKINGS: {
    GET_INFO_FAILED: 'Failed to get ranking lists.',
    GET_DAILY_FAILED: 'Failed to get daily ranks.',
    GET_USER_DAILY_FAILED: 'Failed to get user daily rank.',
    GET_ALL_FAILED: 'Failed to get ranks.',
    GET_USER_ALL_FAILED: 'Failed to get user ranks.',
  },
  GENERAL: 'An error occurred. Please try again.',
  INTERNAL_SERVER_ERROR: 'Internal server error.',
  TOO_MANY_REQUESTS: 'Too many requests. Please try again later.',
  JSON_PARSE_FAILED: 'Failed to parse incoming message as JSON.',
  FORMAT_DATE_FAILED: 'Failed to format date.',
  INVALID_DATE: 'Invalid date.',
  TICKER_MISSING: 'Ticker information is missing.',
  INVALID_TRADE_TYPE: 'Invalid trade type.',
} as const;

export type SuccessMessages = typeof SUCCESS_MESSAGES;
export type ErrorMessages = typeof ERROR_MESSAGES;

export const MESSAGES = {
  SUCCESS: SUCCESS_MESSAGES,
  ERROR: ERROR_MESSAGES,
} as const;
