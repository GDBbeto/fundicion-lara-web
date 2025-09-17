import React, { useCallback, useState } from 'react';
import { Pagination } from 'types/api';

const paginationDefault = {
  page: 1,
  pageSize: 10,
  totalElements: 0,
  totalPages: 0,
};

function useTableData<T>() {
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Pagination>(paginationDefault);
  const [rows, setRows] = useState<T[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof T>();

  const handlePageChange = useCallback((_: unknown, value: number) => {
    setPagination((prev) => ({ ...prev, page: value + 1 }));
  }, []);

  const handleRowsPerPageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPagination((prev) => ({
        ...prev,
        page: 1,
        pageSize: parseInt(event.target.value, 10),
      }));
    },
    [],
  );

  const handleSort = (property: keyof T) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const cleanTable = useCallback(() => {
    setLoading(false);
    setPagination(paginationDefault);
    setRows([]);
  }, []);

  const startService = useCallback(() => {
    setLoading(true);
    setRows([]);
  }, []);

  return {
    rows,
    order,
    loading,
    orderBy,
    pagination,
    paginationDefault,
    setRows,
    setLoading,
    setPagination,
    cleanTable,
    startService,
    handleSort,
    handlePageChange,
    handleRowsPerPageChange,
  };
}

export default useTableData;
