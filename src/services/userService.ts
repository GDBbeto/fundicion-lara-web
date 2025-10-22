import { ApiResponse, User } from 'types/api';
import api from './api';
import { USER_API_BASE } from './apiRoutes';

export interface UserQueryParams {
  page?: number; // número de página, por defecto 1
  pageSize?: number; // tamaño de página, por defecto 10
  order?: 'asc' | 'desc'; // orden
  orderBy?: keyof User; // campo por el cual ordenar
  search?: string; // búsqueda por nombre o email
}

export const getUsers = async (
  params?: UserQueryParams,
): Promise<ApiResponse<User[]>> => {
  const response = await api.get<ApiResponse<User[]>>(USER_API_BASE, {
    params,
  });
  return response.data;
};

export const getUserById = async (id: number): Promise<ApiResponse<User>> => {
  const response = await api.get<ApiResponse<User>>(`${USER_API_BASE}/${id}`);
  return response.data;
};

export const getUserByEmail = async (
  email: string,
): Promise<ApiResponse<User>> => {
  const response = await api.get<ApiResponse<User>>(
    `${USER_API_BASE}/email/${encodeURIComponent(email)}`,
  );
  return response.data;
};

export const updateUser = async (
  id: number,
  user: User,
): Promise<ApiResponse<User>> => {
  const response = await api.put<ApiResponse<User>>(
    `${USER_API_BASE}/${id}`,
    user,
  );
  return response.data;
};

export const deleteUser = async (id: number): Promise<ApiResponse<string>> => {
  const response = await api.delete<ApiResponse<string>>(
    `${USER_API_BASE}/${id}`,
  );
  return response.data;
};
