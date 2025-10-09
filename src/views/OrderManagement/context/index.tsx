import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { useQuery } from '@tanstack/react-query';

import { OrderTransaction, ApiResponse, CommonError } from 'types/api';
import { getOrderTransactions } from 'services/orderTransactionService';

import { useSnackbar, useTableData } from 'hooks';
import { ERROR_MESSAGES } from 'commons/messages';
import { HttpStatusCode } from 'commons/global';

import { formatDateToDefault } from 'utils/dateUtils';

import { OrderTransactionContextType } from './types';

export const OrderTransactionContext =
  createContext<OrderTransactionContextType>({} as OrderTransactionContextType);

interface Props {
  children: React.ReactNode;
}

const getDefaultMonthDates = () => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { firstDay, lastDay };
};

const OrderTransactionProvider = ({ children }: Props) => {
  const { showSnackbar } = useSnackbar();
  const [search, setSearch] = useState('');
  const { firstDay, lastDay } = getDefaultMonthDates();

  const [startDate, setStartDate] = useState<Date>(firstDay);
  const [endDate, setEndDate] = useState<Date>(lastDay);

  const formattedStartDate = useMemo(
    () => formatDateToDefault(startDate),
    [startDate],
  );
  const formattedEndDate = useMemo(
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
  } = useTableData<OrderTransaction>();

  const { data, isLoading, isError, error, refetch } = useQuery<
    ApiResponse<OrderTransaction[]>,
    CommonError
  >({
    queryKey: [
      'orderTransactions',
      pagination.page,
      pagination.pageSize,
      order,
      orderBy,
      search,
      formattedStartDate,
      formattedEndDate,
    ],
    queryFn: () =>
      getOrderTransactions({
        page: pagination.page,
        pageSize: pagination.pageSize,
        order: order ?? 'desc',
        orderBy: orderBy ?? 'orderTransactionId',
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        search,
      }),
  });

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleSearch = useCallback(
    (value: string) => {
      if (value) setPagination(paginationDefault);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (isError) {
      cleanTable();
      if (error?.status !== HttpStatusCode.NotFound) {
        showSnackbar(error?.userMessage || ERROR_MESSAGES.DEFAULT, 'error');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error]);

  const contextValue: OrderTransactionContextType = useMemo(
    () => ({
      search,
      order,
      orderBy,
      transactions: rows,
      isLoading,
      error,
      pagination,
      startDate,
      endDate,
      setStartDate,
      setEndDate,
      handleSort,
      handleSearch,
      handleRefresh,
      handlePageChange,
      handleRowsPerPageChange,
    }),
    [
      search,
      order,
      orderBy,
      rows,
      isLoading,
      error,
      pagination,
      startDate,
      endDate,
      setStartDate,
      setEndDate,
      handleSort,
      handleSearch,
      handleRefresh,
      handlePageChange,
      handleRowsPerPageChange,
    ],
  );

  return (
    <OrderTransactionContext.Provider value={contextValue}>
      {children}
    </OrderTransactionContext.Provider>
  );
};

export default OrderTransactionProvider;
