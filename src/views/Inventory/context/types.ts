import type { CommonError, Pagination, Product } from 'types/api';

export interface ProductContextType {
  search: string;
  selectedClient: string;
  isLoading: boolean;
  products: Product[];
  clients: string[];
  pagination: Pagination;
  error: CommonError | null;
  handleSearch: (value: string) => void;
  handleClientChange: (value: string) => void;
  handleRefresh: () => void;
  handlePageChange: (_: unknown, newPage: number) => void;
  handleRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
