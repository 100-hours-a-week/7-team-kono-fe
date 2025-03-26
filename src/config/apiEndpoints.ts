export const API_ENDPOINTS = {
  // 인증 관련
  LOGIN: '/api/v1/auth/login',
  SIGNUP: '/api/v1/auth/signup',
  LOGOUT: '/api/v1/auth/logout',

  // 인증 관련
  KAKAO_LOGIN: '/oauth2/authorization/kakao',
  AUTH_KAKAO_CALLBACK: '/api/v1/auth/kakao/callback',

  // 사용자 관련
  GET_USER: '/api/v1/users',
  POST_PROFILE_IMAGE: '/api/vi1/users/profile',
  PUT_NICKNAME: '/api/v1/users/nickname',
  DELETE_USER: '/api/v1/users',

  // 코인 관련
  GET_FAVORITE: '/api/v1/users/favorites',
  GET_IS_FAVORITE: (ticker: string) => `/api/v1/users/favorites/${ticker}`,

  POST_FAVORITE: (ticker: string) => `/api/v1/users/favorites/${ticker}`,
  DELETE_FAVORITE: (ticker: string) => `/api/v1/users/favorites/${ticker}`,
  GET_COINS: '/api/v1/coins',
  GET_COIN_DETAIL: (ticker: string) => `/api/v1/coins/${ticker}`,
  POST_COIN: '/api/v1/coins/orders',

  // 지갑 관련
  GET_CASH: '/api/v1/wallets/cash',
  GET_HOLDING_COIN: '/api/v1/wallets/coins',
  GET_IS_HOLDING_COIN: (ticker: string) => `/api/v1/wallets/coins/${ticker}`,
  GET_TRANSACTION: '/api/v1/wallets/transactions',
};