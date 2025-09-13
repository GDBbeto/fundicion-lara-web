import React, { useState, useEffect, createContext } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Transaction, ApiResponse, CommonError } from 'types/api';
import { getTransactions } from 'services/transactionService';

import { useSnackbar, useTableData } from 'hooks';
import { ERROR_MESSAGES } from 'commons/messages';
import { HttpStatusCode } from 'commons/global';

import { TransactionContextType } from './types';

export const TransactionContext = createContext<TransactionContextType>(
  {} as TransactionContextType,
);

interface TransactionProviderProps {
  children: React.ReactNode;
  type: 'SALE' | 'PURCHASE' | 'EXPENSE';
}

const TransactionProvider = ({ children, type }: TransactionProviderProps) => {
  const { showSnackbar } = useSnackbar();
  const [search, setSearch] = useState('');

  const {
    order,
    orderBy,
    pagination,
    rows,
    setPagination,
    setRows,
    cleanTable,
    handleSort,
    handlePageChange,
    handleRowsPerPageChange,
  } = useTableData<Transaction>();

  const { data, isLoading, isError, error, refetch } = useQuery<
    ApiResponse<Transaction[]>,
    CommonError
  >({
    queryKey: [
      'transactions',
      type,
      pagination.page,
      pagination.pageSize,
      order,
      orderBy,
    ],
    queryFn: () =>
      getTransactions({
        page: pagination.page,
        pageSize: pagination.pageSize,
        order,
        orderBy,
        startDate: '2025-01-01',
        endDate: '2025-12-01',
        type,
      }),
  });

  const handleRefetch = () => refetch();

  useEffect(() => {
    if (data) {
      setRows(data.data);
      if (data.pagination) {
        setPagination({ ...data.pagination });
      }
    }
  }, [data, setRows, setPagination]);

  useEffect(() => {
    if (isError) {
      cleanTable();
      if (error.status !== HttpStatusCode.NotFound) {
        showSnackbar(error?.userMessage || ERROR_MESSAGES.DEFAULT, 'error');
      }
    }
  }, [isError, error, cleanTable, showSnackbar]);

  return (
    <TransactionContext.Provider
      value={{
        order,
        orderBy,
        search,
        transactions: rows,
        isLoading,
        error,
        pagination,
        handleSearch: setSearch,
        handleRefetch,
        handlePageChange,
        handleSort,
        handleRowsPerPageChange,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
