import React, { useState, createContext, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import type { ApiResponse, CommonError, Product } from 'types/api';

import { useSnackbar, useTableData } from 'hooks';

import { getClients, getProducts } from 'services/productService';

import { ERROR_MESSAGES } from 'commons/messages';
import { HttpStatusCode } from 'commons/global';

import { ProductContextType } from './types';

export const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType,
);

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const { showSnackbarError } = useSnackbar();

  const [search, setSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState('');

  const {
    pagination,
    rows,
    setPagination,
    setRows,
    cleanTable,
    handlePageChange,
    handleRowsPerPageChange,
  } = useTableData<Product>();

  const { data, isLoading, isError, error, refetch } = useQuery<
    ApiResponse<Product[]>,
    CommonError
  >({
    queryKey: [
      'products',
      {
        page: pagination.page,
        pageSize: pagination.pageSize,
        search,
        client: selectedClient,
      },
    ],
    queryFn: () =>
      getProducts({
        page: pagination.page,
        pageSize: pagination.pageSize,
        order: 'desc',
        orderBy: 'productId',
        search,
        client: selectedClient || undefined,
      }),
  });

  const { data: clientsData } = useQuery<ApiResponse<string[]>, CommonError>({
    queryKey: ['clients'],
    queryFn: () => getClients(),
  });

  const handleSearch = (value: string) => {
    if (value) {
      setPagination((prev) => ({ ...prev, page: 1 }));
    }
    setSearch(value);
  };

  const handleClientChange = (value: string) => {
    setPagination((prev) => ({ ...prev, page: 1 }));
    setSelectedClient(value);
  };

  const handleRefresh = () => {
    refetch();
  };

  useEffect(() => {
    if (data) {
      setRows(data.data);
      if (data.pagination) {
        setPagination((prev) => ({ ...prev, ...data.pagination }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (isError) {
      cleanTable();
      if (error.status !== HttpStatusCode.NotFound) {
        showSnackbarError(error, ERROR_MESSAGES.DEFAULT);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error]);

  return (
    <ProductContext.Provider
      value={{
        search,
        selectedClient,
        products: rows,
        clients: clientsData?.data ?? [],
        isLoading,
        error,
        pagination,
        handleSearch,
        handleClientChange,
        handleRefresh,
        handlePageChange,
        handleRowsPerPageChange,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
