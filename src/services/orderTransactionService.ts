import {
  OrderTransaction,
  ApiResponse,
  OrderTransactionRequest,
} from 'types/api';
import api from './api';
import { ORDER_TRANSACTION_API_BASE } from './apiRoutes';

export interface OrderTransactionQueryParams {
  page?: number;
  pageSize?: number;
  order?: 'asc' | 'desc';
  orderBy?: keyof OrderTransaction;
  startDate: string;
  endDate: string;
  search?: string;
}

export const getOrderTransactions = async (
  params: OrderTransactionQueryParams,
): Promise<ApiResponse<OrderTransaction[]>> => {
  const response = await api.get<ApiResponse<OrderTransaction[]>>(
    ORDER_TRANSACTION_API_BASE,
    { params },
  );
  return response.data;
};

export const getOrderTransactionById = async (
  id: number,
): Promise<ApiResponse<OrderTransaction>> => {
  const response = await api.get<ApiResponse<OrderTransaction>>(
    `${ORDER_TRANSACTION_API_BASE}/${id}`,
  );
  return response.data;
};

export const createOrderTransaction = async (
  orderTransaction: OrderTransactionRequest,
): Promise<ApiResponse<OrderTransaction>> => {
  const response = await api.post<ApiResponse<OrderTransaction>>(
    ORDER_TRANSACTION_API_BASE,
    orderTransaction,
  );
  return response.data;
};

export const updateOrderTransaction = async (
  id: number,
  orderTransaction: OrderTransactionRequest,
): Promise<ApiResponse<OrderTransaction>> => {
  const response = await api.put<ApiResponse<OrderTransaction>>(
    `${ORDER_TRANSACTION_API_BASE}/${id}`,
    orderTransaction,
  );
  return response.data;
};

export const deleteOrderTransaction = async (
  id: number,
): Promise<ApiResponse<string>> => {
  const response = await api.delete<ApiResponse<string>>(
    `${ORDER_TRANSACTION_API_BASE}/${id}`,
  );
  return response.data;
};
