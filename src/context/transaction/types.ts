import type { CommonError, Pagination, Transaction } from 'types/api';

export interface TransactionContextType {
  search: string;
  order: string;
  orderBy?: keyof Transaction;
  transactions: Transaction[];
  isLoading: boolean;
  error: CommonError | null;
  pagination: Pagination;
  handleSort: (property: keyof Transaction) => void;
  handleSearch: (value: string) => void;
  handleRefetch: () => void;
  handlePageChange: (_: unknown, newPage: number) => void;
  handleRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
