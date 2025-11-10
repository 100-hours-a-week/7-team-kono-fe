export const ROUTES = {
  HOME: '/',
  NOT_FOUND: '/404',

  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
  },

  USER: {
    PROFILE: (nickname: string) => `/users/${nickname}`,
  },

  COIN: {
    TRADE: (ticker: string, type: string) => `/coins/${ticker}/${type}`,
    DETAIL: (ticker: string) => `/coins/${ticker}`,
  },

  WALLET: '/wallet',
  TRANSACTION: '/transaction',
  DISCOVER: '/discover',
  FAVORITE: '/favorite',
  RANKING: '/ranking',
  SETTINGS: '/settings',
};

export const NAV_ITEMS = [
  { label: '지갑', path: ROUTES.WALLET },
  { label: '탐색', path: ROUTES.DISCOVER },
  { label: '관심', path: ROUTES.FAVORITE },
  { label: '랭킹', path: ROUTES.RANKING },
  { label: '설정', path: ROUTES.SETTINGS },
];
