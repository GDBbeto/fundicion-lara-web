import {
  ApiResponse,
  RefreshTokenRequest,
  RegisterRequest,
  User,
  LoginRequest,
  AuthResponse,
} from 'types/api';

import api from './api';
import { AUTH_API_BASE } from './apiRoutes';

export const login = async (
  credentials: LoginRequest,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    `${AUTH_API_BASE}/login`,
    credentials,
  );
  return response.data;
};

export const refreshToken = async (
  payload: RefreshTokenRequest,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    `${AUTH_API_BASE}/refresh`,
    payload,
  );
  return response.data;
};

export const register = async (
  user: RegisterRequest,
): Promise<ApiResponse<User>> => {
  const response = await api.post<ApiResponse<User>>(
    `${AUTH_API_BASE}/register`,
    user,
  );
  return response.data;
};
