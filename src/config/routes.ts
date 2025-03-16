// 프론트엔드 라우트 정의
export const ROUTES = {
  // 공통
  HOME: '/',
  NOT_FOUND: '/404',
  
  // 인증
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
  },
  
  // 메인 기능
  WALLET: '/wallet',
  DISCOVER: '/discover',
  FAVORITES: '/favorites',
  RANKINGS: '/rankings',
  SETTINGS: '/settings',
  
  // 거래 관련
  TRADING: (ticker: string) => `/trading/${ticker}`,
  
  // 상세 페이지
  COIN_DETAIL: (ticker: string) => `/coins/${ticker}`,
  USER_PROFILE: (nickname: string) => `/users/${nickname}`,
};

// 네비게이션 메뉴 항목 정의s
export const NAV_ITEMS = [
  { label: '지갑', path: ROUTES.WALLET},
  { label: '탐색', path: ROUTES.DISCOVER},
  { label: '관심', path: ROUTES.FAVORITES},
  { label: '랭킹', path: ROUTES.RANKINGS},
  { label: '설정', path: ROUTES.SETTINGS},
];