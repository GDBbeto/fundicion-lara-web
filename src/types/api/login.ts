import type { User } from './user';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export type AuthResponse = LoginResponse;

export interface RefreshTokenRequest {
  refreshToken: string;
}
