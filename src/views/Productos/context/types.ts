import type { Pagination, Product } from 'types/api';

export interface ProductContextType {
  search: string;
  isLoading: boolean;
  products: Product[];
  pagination: Pagination;
  setPage: (page: number) => void;
  setSearch: (value: string) => void;
}
