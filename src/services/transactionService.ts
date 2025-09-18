import { Transaction, TransactionSummary, ApiResponse } from 'types/api';
import api from './api';
import { TRANSACTION_API_BASE } from './apiRoutes';

export interface TransactionQueryParams {
  page?: number;
  pageSize?: number;
  order?: 'asc' | 'desc';
  orderBy?: keyof Transaction;
  startDate: string; // ISO date string (YYYY-MM-DD)
  endDate: string;
  type: 'SALE' | 'PURCHASE' | 'EXPENSE';
  search?: string;
}

export const getTransactions = async (
  params: TransactionQueryParams,
): Promise<ApiResponse<Transaction[]>> => {
  const response = await api.get<ApiResponse<Transaction[]>>(
    TRANSACTION_API_BASE,
    {
      params,
    },
  );
  return response.data;
};

export const getTransactionById = async (
  transactionId: number,
): Promise<ApiResponse<Transaction>> => {
  const response = await api.get<ApiResponse<Transaction>>(
    `${TRANSACTION_API_BASE}/${transactionId}`,
  );
  return response.data;
};

export const createTransaction = async (
  transaction: Transaction,
): Promise<ApiResponse<Transaction>> => {
  const response = await api.post<ApiResponse<Transaction>>(
    TRANSACTION_API_BASE,
    transaction,
  );
  return response.data;
};

export const updateTransaction = async (
  transactionId: number,
  transaction: Transaction,
): Promise<ApiResponse<Transaction>> => {
  const response = await api.put<ApiResponse<Transaction>>(
    `${TRANSACTION_API_BASE}/${transactionId}`,
    transaction,
  );
  return response.data;
};

export const deleteTransaction = async (
  transactionId: number,
): Promise<ApiResponse<string>> => {
  const response = await api.delete<ApiResponse<string>>(
    `${TRANSACTION_API_BASE}/${transactionId}`,
  );
  return response.data;
};

export const getTransactionSummary = async (
  startDate: string,
  endDate: string,
): Promise<ApiResponse<TransactionSummary>> => {
  const response = await api.get<ApiResponse<TransactionSummary>>(
    `${TRANSACTION_API_BASE}/summary`,
    {
      params: { startDate, endDate },
    },
  );
  return response.data;
};
