import React, { useState, createContext, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import type { ApiResponse, CommonError, Product } from 'types/api';

import { useTableData } from 'hooks';

import { getProducts } from 'services/productService';

import { ERROR_MESSAGES } from 'commons/messages';

import { ProductContextType } from './types';

export const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType,
);

const paginationDefault = {
  page: 1,
  pageSize: 10,
  totalElements: 0,
  totalPages: 0,
};

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
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
        order: 'asc',
        orderBy: 'name',
        search,
      }),
  });

  const handleSearch = (value: string) => {
    if (value) {
      setPagination(paginationDefault);
    }
    setSearch(value);
  };

  const handleRefetch = () => {
    refetch();
  };

  useEffect(() => {
    if (data) {
      setRows(data.data);
      if (data.pagination) {
        setPagination({ ...data.pagination });
      }
    } else {
      cleanTable();
    }
  }, [data, setRows, setPagination, cleanTable]);

  useEffect(() => {
    if (isError) {
      console.log(error?.userMessage || ERROR_MESSAGES.DEFAULT);
    }
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
        handleRefetch,
        handlePageChange,
        handleRowsPerPageChange,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
