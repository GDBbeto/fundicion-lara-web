import React, { useState, createContext, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import type { ApiResponse, CommonError, Pagination, Product } from 'types/api';

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
  totalPages: 1,
};

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination>(paginationDefault);

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
    setPagination(paginationDefault);
    setSearch(value);
  };

  const handleRefetch = () => {
    refetch();
  };

  const setPage = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  useEffect(() => {
    if (data) {
      setProducts(data.data);
      setPagination(data.pagination ?? paginationDefault);
    } else {
      setProducts([]);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      console.log(error?.userMessage || ERROR_MESSAGES.DEFAULT);
    }
  }, [isError, error]);

  return (
    <ProductContext.Provider
      value={{
        search,
        products,
        isLoading,
        pagination,
        setPage,
        handleSearch,
        handleRefetch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
