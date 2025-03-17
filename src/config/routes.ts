// 프론트엔드 라우트 정의
export const ROUTES = {
  // 공통
  HOME: '/',
  NOT_FOUND: '/404',

  // 인증
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

  // 메인 기능
  WALLET: '/wallet',
  TRANSACTION: '/transaction',
  DISCOVER: '/discover',
  FAVORITE: '/favorite',
  RANKING: '/ranking',
  SETTINGS: '/settings',
};

// 네비게이션 메뉴 항목 정의s
export const NAV_ITEMS = [
  { label: '지갑', path: ROUTES.WALLET },
  { label: '탐색', path: ROUTES.DISCOVER },
  { label: '관심', path: ROUTES.FAVORITE },
  { label: '랭킹', path: ROUTES.RANKING },
  { label: '설정', path: ROUTES.SETTINGS },
];
