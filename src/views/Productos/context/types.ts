import type { Pagination, Product } from 'types/api';

export interface ProductContextType {
  search: string;
  isLoading: boolean;
  products: Product[];
  pagination: Pagination;
  setPage: (page: number) => void;
  handleSearch: (value: string) => void;
  handleRefetch: () => void;
}
