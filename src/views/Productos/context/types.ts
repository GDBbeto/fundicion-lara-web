import type { Pagination } from 'types/api';
import type { Product } from 'types/api/product';

export interface ProductContextType {
  search: string;
  products: Product[];
  pagination: Pagination;
  setPage: (page: number) => void;
  setSearch: (value: string) => void;
}
