import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { useQuery } from '@tanstack/react-query';

import { ApiResponse, CommonError, User } from 'types/api';

import { getUsers } from 'services/userService';

import { useSnackbar, useTableData } from 'hooks';
import { ERROR_MESSAGES } from 'commons/messages';
import { HttpStatusCode } from 'commons/global';

import { UserContextType } from './types';

export const UserContext = createContext<UserContextType>(
  {} as UserContextType,
);

interface Props {
  children: React.ReactNode;
}

const UserProvider = ({ children }: Props) => {
  const { showSnackbarError } = useSnackbar();
  const [search, setSearch] = useState('');

  const {
    order,
    orderBy,
    pagination,
    rows,
    setPagination,
    setRows,
    paginationDefault,
    cleanTable,
    handleSort,
    handlePageChange,
    handleRowsPerPageChange,
  } = useTableData<User>();

  const { data, isLoading, isError, error, refetch } = useQuery<
    ApiResponse<User[]>,
    CommonError
  >({
    queryKey: [
      'users',
      pagination.page,
      pagination.pageSize,
      order,
      orderBy,
      search,
    ],
    queryFn: () =>
      getUsers({
        page: pagination.page,
        pageSize: pagination.pageSize,
        order: order ?? 'desc',
        orderBy: orderBy ?? 'userId',
        search,
      }),
  });

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleSearch = useCallback(
    (value: string) => {
      if (value) setPagination(paginationDefault);
      setSearch(value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setPagination, setSearch],
  );

  useEffect(() => {
    if (data) {
      setRows(data.data);
      if (data.pagination) {
        setPagination({ ...data.pagination });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (isError) {
      cleanTable();
      if (error?.status !== HttpStatusCode.NotFound) {
        showSnackbarError(error, ERROR_MESSAGES.DEFAULT);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error]);

  const contextValue: UserContextType = useMemo(
    () => ({
      search,
      order,
      orderBy,
      users: rows,
      isLoading,
      error,
      pagination,
      handleSort,
      handleSearch,
      handleRefresh,
      handlePageChange,
      handleRowsPerPageChange,
    }),
    [
      search,
      order,
      orderBy,
      rows,
      isLoading,
      error,
      pagination,
      handleSort,
      handleSearch,
      handleRefresh,
      handlePageChange,
      handleRowsPerPageChange,
    ],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
