import type { LoginResponse, User } from 'types/api';

export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (loginResponse: LoginResponse) => void;
  logout: () => void;
  setUser: (value: User) => void;
}
