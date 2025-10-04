import { CommonError, OrderTransaction, Pagination } from 'types/api';

export interface OrderTransactionContextType {
  search: string;
  order?: 'asc' | 'desc';
  orderBy?: keyof OrderTransaction;
  transactions: OrderTransaction[];
  isLoading: boolean;
  error: CommonError | null;
  pagination: Pagination;
  startDate: Date;
  endDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  handleSort: (property: keyof OrderTransaction) => void;
  handleSearch: (value: string) => void;
  handleRefresh: () => void;
  handlePageChange: (_: unknown, newPage: number) => void;
  handleRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
