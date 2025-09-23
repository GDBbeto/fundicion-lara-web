import React, { useState, useEffect, createContext, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import {
  Transaction,
  ApiResponse,
  CommonError,
  TransactionSummary,
} from 'types/api';
import {
  getTransactionSummary,
  getTransactions,
} from 'services/transactionService';

import { useSnackbar, useTableData } from 'hooks';
import { ERROR_MESSAGES } from 'commons/messages';
import { HttpStatusCode } from 'commons/global';

import { formatDateToDefault } from 'utils/dateUtils';

import { TransactionContextType } from './types';

export const TransactionContext = createContext<TransactionContextType>(
  {} as TransactionContextType,
);

interface TransactionProviderProps {
  children: React.ReactNode;
  type: 'SALE' | 'PURCHASE' | 'EXPENSE';
  label: string;
}

const getDefaultMonthDates = () => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Ultimo dia del mes
  return { firstDay, lastDay };
};

const TransactionProvider = ({
  children,
  type,
  label,
}: TransactionProviderProps) => {
  const { showSnackbar } = useSnackbar();
  const [search, setSearch] = useState('');
  const { firstDay, lastDay } = getDefaultMonthDates();

  const [startDate, setStartDate] = useState<Date>(firstDay);
  const [endDate, setEndDate] = useState<Date>(lastDay);

  const [totalAmount, setTotalAmount] = useState<number>(0);

  const formattedStartDate = React.useMemo(
    () => formatDateToDefault(startDate),
    [startDate],
  );
  const formattedEndDate = React.useMemo(
    () => formatDateToDefault(endDate),
    [endDate],
  );

  const {
    order,
    orderBy,
    pagination,
    rows,
    setPagination,
    setRows,
    paginationDefault,
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
      search,
      formattedStartDate,
      formattedEndDate,
    ],
    queryFn: () =>
      getTransactions({
        page: pagination.page,
        pageSize: pagination.pageSize,
        order: order ?? 'desc',
        orderBy: orderBy ?? 'transactionId',
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        type,
        search,
      }),
  });

  const {
    data: summaryData,
    isError: isSummaryError,
    isLoading: isSummaryLoading,
    refetch: refetchSummary,
  } = useQuery<ApiResponse<TransactionSummary>, CommonError>({
    queryKey: ['transactionSummary', formattedStartDate, formattedEndDate],
    queryFn: () => getTransactionSummary(formattedStartDate, formattedEndDate),
  });

  const handleRefresh = useCallback(() => {
    refetch();
    refetchSummary();
  }, [refetch, refetchSummary]);

  const handleSearch = useCallback(
    (value: string) => {
      if (value) {
        setPagination(paginationDefault);
      }
      setSearch(value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setPagination, setSearch],
  );

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error]);

  useEffect(() => {
    if (summaryData?.data) {
      const { totalSales, totalPurchases, totalExpenses } = summaryData.data;
      switch (type) {
        case 'SALE':
          setTotalAmount(totalSales);
          break;
        case 'PURCHASE':
          setTotalAmount(totalPurchases);
          break;
        case 'EXPENSE':
          setTotalAmount(totalExpenses);
          break;
        default:
          setTotalAmount(0);
      }
    }
  }, [summaryData, type]);

  const contextValue: TransactionContextType = React.useMemo(
    () => ({
      type,
      order,
      orderBy,
      search,
      transactions: rows,
      isLoading,
      totalAmount,
      isSummaryLoading,
      error,
      label,
      isSummaryError,
      pagination,
      startDate,
      endDate,
      setStartDate,
      setEndDate,
      handleSearch,
      handleRefresh,
      handlePageChange,
      handleSort,
      handleRowsPerPageChange,
    }),
    [
      type,
      order,
      orderBy,
      search,
      rows,
      isLoading,
      error,
      label,
      isSummaryError,
      totalAmount,
      isSummaryLoading,
      pagination,
      startDate,
      endDate,
      setStartDate,
      setEndDate,
      handleRefresh,
      handlePageChange,
      handleSort,
      handleRowsPerPageChange,
      handleSearch,
    ],
  );

  return (
    <TransactionContext.Provider value={contextValue}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
