import type { CommonError, Pagination, Transaction } from 'types/api';

export interface TransactionContextType {
  search: string;
  order: string;
  orderBy?: keyof Transaction;
  transactions: Transaction[];
  isLoading: boolean;
  error: CommonError | null;
  pagination: Pagination;
  startDate: Date;
  endDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  handleSort: (property: keyof Transaction) => void;
  handleSearch: (value: string) => void;
  handleRefetch: () => void;
  handlePageChange: (_: unknown, newPage: number) => void;
  handleRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
