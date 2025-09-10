import type { CommonError, Pagination, Product } from 'types/api';

export interface ProductContextType {
  search: string;
  isLoading: boolean;
  products: Product[];
  pagination: Pagination;
  error: CommonError | null;
  handleSearch: (value: string) => void;
  handleRefetch: () => void;
  handlePageChange: (_: unknown, newPage: number) => void;
  handleRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
