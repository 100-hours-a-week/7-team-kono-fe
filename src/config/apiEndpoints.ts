export const API_ENDPOINTS = {
  // 인증 관련
  AUTH: {
    LOGIN: '/api/v1/auth/login',
    SIGNUP: '/api/v1/auth/signup',
  },
  
  // 사용자 관련
  USERS: {
    PROFILE: '/api/v1/users',
    PROFILE_IMAGE: '/api/v1/users/profile',
    NICKNAME: '/api/v1/users/nickname',
    BADGES: '/api/v1/users/badges',
    FAVORITES: '/api/v1/users/favorites',
    FAVORITE_BY_TICKER: (ticker: string) => `/api/v1/users/favorites/${ticker}`,
  },
  
  // 코인 관련
  COINS: {
    LIST: '/api/v1/coins',
    DETAIL: (ticker: string) => `/api/v1/coins/${ticker}`,
    ORDERS: '/api/v1/coins/orders',
  },
  
  // 지갑 관련
  WALLETS: {
    CASH: '/api/v1/wallets/cash',
    COINS: '/api/v1/wallets/coins',
    COIN_BY_TICKER: (ticker: string) => `/api/v1/wallets/coins/${ticker}`,
    TRANSACTIONS: '/api/v1/wallets/transactions',
  },
  
  // 랭킹 관련
  RANKINGS: {
    DAILY: '/api/v1/rankings/daily',
    DAILY_ME: '/api/v1/rankings/daily/me',
    ALL: '/api/v1/rankings',
    ME: '/api/v1/rankings/me',
  },
};