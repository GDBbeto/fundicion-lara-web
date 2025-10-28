import React, {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';

import type { LoginResponse, User } from 'types/api';

import { AuthContextType } from './types';

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((loginResponse: LoginResponse) => {
    localStorage.setItem('token', loginResponse.accessToken);
    localStorage.setItem('refreshToken', loginResponse.refreshToken);
    localStorage.setItem('user', JSON.stringify(loginResponse.user));
    setIsAuthenticated(true);
    setUser(loginResponse.user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setIsLoading(false);
    const userJson = localStorage.getItem('user');
    setUser(userJson ? (JSON.parse(userJson) as User) : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue: AuthContextType = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
      isLoading,
      user,
      setUser,
    }),
    [isAuthenticated, login, logout, isLoading, user],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
