export * from './product';
export * from './transaction';
export * from './transaction-summary';

export interface ApiResponse<T> {
  status: string;
  message: string;
  pagination?: Pagination | null;
  data: T;
}

export interface Pagination {
  page: number;
  pageSize: number;
  totalElements: number;
  totalPages?: number;
}

export interface CommonError {
  userMessage: string;
  message: string;
  status?: number;
}
