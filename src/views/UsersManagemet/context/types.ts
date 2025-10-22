import type { CommonError, Pagination, User } from 'types/api';

export interface UserContextType {
  search: string;
  isLoading: boolean;
  users: User[];
  pagination: Pagination;
  error: CommonError | null;
  order: 'asc' | 'desc' | undefined;
  orderBy: keyof User | undefined;
  handleSearch: (value: string) => void;
  handleRefresh: () => void;
  handlePageChange: (_: unknown, newPage: number) => void;
  handleRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSort: (property: keyof User) => void;
}
