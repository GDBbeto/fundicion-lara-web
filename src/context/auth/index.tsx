import React, {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { User } from 'types/api';

import { AuthContextType } from './types';

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const getUser = (token: string | null) => {
    const userToke = {
      userId: 1,
      name: 'Roberto',
      lastName: 'Aguilar',
      motherLastName: 'Vazquez',
      email: 'roberto.aav.23@gmail.com',
      role: 'ADMIN' as any,
    };
    return token ? userToke : null;
  };

  const login = useCallback((token: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setUser(getUser(token));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setIsLoading(false);
    setUser(getUser(token));
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
