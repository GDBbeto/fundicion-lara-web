export * from './product';
export * from './transaction';
export * from './transaction-summary';
export * from './invoice';
export * from './order-transaction';
export * from './user';
export * from './login';

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
