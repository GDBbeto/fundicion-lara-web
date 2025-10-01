import React, { useState, createContext, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import {
  ApiResponse,
  CommonError,
  Transaction,
  TransactionSummary,
} from 'types/api';
import Option from 'types/option';
import {
  getTransactionSummary,
  getTransactions,
} from 'services/transactionService';

import { useDevice } from 'hooks';

import { DashboardContextType } from './types';
import { getCurrentMonth, getMonthDateRange } from './helpers';

export const monthOptions: Option[] = [
  { label: 'Enero', value: '01' },
  { label: 'Febrero', value: '02' },
  { label: 'Marzo', value: '03' },
  { label: 'Abril', value: '04' },
  { label: 'Mayo', value: '05' },
  { label: 'Junio', value: '06' },
  { label: 'Julio', value: '07' },
  { label: 'Agosto', value: '08' },
  { label: 'Septiembre', value: '09' },
  { label: 'Octubre', value: '10' },
  { label: 'Noviembre', value: '11' },
  { label: 'Diciembre', value: '12' },
];

export const yearOptions: Option[] = Array.from({ length: 5 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { label: `${year}`, value: `${year}` };
});

export const DashboardContext = createContext<DashboardContextType>(
  {} as DashboardContextType,
);

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const { isSmallScreen } = useDevice();

  const [selectedMonth, setSelectedMonth] = useState<string>(
    getCurrentMonth(monthOptions),
  );
  const [selectedYear, setSelectedYear] = useState<string>(
    `${new Date().getFullYear()}`,
  );

  const { formattedStartDate, formattedEndDate } = useMemo(
    () => getMonthDateRange(selectedMonth, Number(selectedYear)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedMonth, selectedYear],
  );

  const {
    data: summaryData,
    error: summaryError,
    isLoading: isSummaryLoading,
  } = useQuery<ApiResponse<TransactionSummary>, CommonError>({
    queryKey: ['transactionSummary', formattedStartDate, formattedEndDate],
    queryFn: () => getTransactionSummary(formattedStartDate, formattedEndDate),
  });

  const {
    data: dataSale,
    isLoading: isLoadingSale,
    isError: isErrorSale,
    error: errorSale,
  } = useQuery<ApiResponse<Transaction[]>, CommonError>({
    queryKey: ['transactions-sale', formattedStartDate, formattedEndDate],
    queryFn: () =>
      getTransactions({
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        type: 'SALE',
        page: 1,
        pageSize: 10000,
      }),
    enabled: !isSmallScreen,
  });

  const {
    data: dataPurchase,
    isLoading: isLoadingPurchase,
    isError: isErrorPurchase,
    error: errorPurchase,
  } = useQuery<ApiResponse<Transaction[]>, CommonError>({
    queryKey: ['transactions-purchase', formattedStartDate, formattedEndDate],
    queryFn: () =>
      getTransactions({
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        type: 'PURCHASE',
        page: 1,
        pageSize: 10000,
      }),
    enabled: !isSmallScreen,
  });

  const value = useMemo(
    () => ({
      yearOptions,
      monthOptions,
      selectedMonth,
      setSelectedMonth,
      isSummaryLoading,
      summaryData: summaryData?.data || null,
      summaryError,
      dataSale: dataSale?.data || null,
      isLoadingSale,
      isErrorSale,
      errorSale,
      dataPurchase: dataPurchase?.data || null,
      isLoadingPurchase,
      isErrorPurchase,
      errorPurchase,
      selectedYear,
      setSelectedYear,
    }),
    [
      dataPurchase?.data,
      dataSale?.data,
      errorPurchase,
      errorSale,
      isErrorPurchase,
      isErrorSale,
      isLoadingPurchase,
      isLoadingSale,
      isSummaryLoading,
      selectedMonth,
      summaryData,
      summaryError,
      selectedYear,
    ],
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
