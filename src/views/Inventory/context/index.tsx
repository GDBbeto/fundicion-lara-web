import React, { useState, createContext, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import type { ApiResponse, CommonError, Product } from 'types/api';

import { useSnackbar, useTableData } from 'hooks';

import { getProducts } from 'services/productService';

import { ERROR_MESSAGES } from 'commons/messages';
import { HttpStatusCode } from 'commons/global';

import { ProductContextType } from './types';

export const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType,
);

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const { showSnackbar } = useSnackbar();

  const [search, setSearch] = useState('');

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
    queryKey: ['products', pagination.page, pagination.pageSize, search],
    queryFn: () =>
      getProducts({
        page: pagination.page,
        pageSize: pagination.pageSize,
        order: 'desc',
        orderBy: 'productId',
        search,
      }),
  });

  const handleSearch = (value: string) => {
    if (value) {
      setPagination((prev) => ({ ...prev, page: 1 }));
    }
    setSearch(value);
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
        showSnackbar(error?.userMessage || ERROR_MESSAGES.DEFAULT, 'error');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error]);

  return (
    <ProductContext.Provider
      value={{
        search,
        products: rows,
        isLoading,
        error,
        pagination,
        handleSearch,
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
