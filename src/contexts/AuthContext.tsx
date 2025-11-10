import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import axios from 'axios';
import api from '../api/clients';
import { API_ENDPOINTS } from '../config/apiEndpoints';

axios.defaults.withCredentials = true;

interface User {
  id: number;
  nickname: string;
  profileImageUrl: string;
  kakaoId?: number;
  cashBalance?: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: () => void;
  logout: () => void;
  withdraw: () => void;
  isAuthenticated: boolean;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);

  const loadUserInfo = async (isInitialLoad = true) => {
    try {
      setLoading(true);

      const res = await api.get(API_ENDPOINTS.GET_USER);

      if (res.data) {
        const userData = {
          id: res.data.id,
          nickname: res.data.nickname,
          profileImageUrl: res.data.profileImageUrl,
          cashBalance: res.data.cashBalance,
        };
        setUser(userData);
      } else {
        setUser(null);
      }
      setError(null);
    } catch (err) {
      console.error('사용자 정보 로드 실패:', err);

      if (axios.isAxiosError(err)) {
        if (err.response) {
          console.error('오류 상태 코드:', err.response.status);
          console.error('오류 응답 데이터:', err.response.data);

          if (err.response.status === 401 || err.response.status === 403) {
            setUser(null);
          }
        } else if (err.request) {
          console.error('서버에서 응답이 없음:', err.request);
          console.error('요청 내용:', {
            method: 'GET',
            url: '/api/v1/users/me',
            withCredentials: true,
          });
        } else {
          console.error('요청 설정 중 오류 발생:', err.message);
        }

        if (err.code === 'ERR_NETWORK' && isInitialLoad && !isRetrying) {
          setIsRetrying(true);
          setTimeout(() => {
            loadUserInfo(false);
            setIsRetrying(false);
          }, 3000);
        }
      }

      setError('Failed to load user info');
      if (!isRetrying) {
        setLoading(false);
      }
    } finally {
      if (!isRetrying) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const isLoginPage = window.location.pathname === '/login';

    const params = new URLSearchParams(window.location.search);
    const hasAuthCode = params.has('code');

    if (isLoginPage && !hasAuthCode) {
      setLoading(false);
      return;
    }

    if (hasAuthCode) {
      const cleanUrl = window.location.pathname;

      setTimeout(() => {
        loadUserInfo(false).then(() => {
          const redirectTo = localStorage.getItem('redirectAfterLogin') || '/';
          window.location.replace(redirectTo);
          localStorage.removeItem('redirectAfterLogin');
        });
      }, 2000);
      window.history.replaceState({}, document.title, cleanUrl);
    } else {
      loadUserInfo();
    }

    if (hasAuthCode) {
      const currentUrl = window.location.href;
      const baseUrl = currentUrl.split('?')[0];
      const cleanUrl = baseUrl;

      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);

  const login = () => {
    const kakaoLoginPath = '/oauth2/authorization/kakao';
    window.location.href = kakaoLoginPath;
  };

  const logout = async () => {
    try {
      setUser(null);

      await api.post(API_ENDPOINTS.LOGOUT);
    } catch (err) {
      console.error('서버 로그아웃 요청 실패:', err);
    } finally {
      window.location.href = '/login';
    }
  };

  const withdraw = async () => {
    try {
      await api.delete(API_ENDPOINTS.WITHDRAW);

      setUser(null);

      window.location.href = '/login';
    } catch (err) {
      console.error('회원탈퇴 요청 실패:', err);
      throw err;
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        withdraw,
        isAuthenticated: !!user,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
