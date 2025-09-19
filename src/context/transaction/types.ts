import type { CommonError, Pagination, Transaction } from 'types/api';

export interface TransactionContextType {
  type: 'SALE' | 'PURCHASE' | 'EXPENSE';
  search: string;
  order: 'asc' | 'desc';
  orderBy?: keyof Transaction;
  transactions: Transaction[];
  isLoading: boolean;
  error: CommonError | null;
  isSummaryError: boolean;
  totalAmount: number;
  isSummaryLoading: boolean;
  pagination: Pagination;
  startDate: Date;
  endDate: Date;
  label: string;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  handleSort: (property: keyof Transaction) => void;
  handleSearch: (value: string) => void;
  handleRefresh: () => void;
  handlePageChange: (_: unknown, newPage: number) => void;
  handleRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
