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
    loading,
    pagination,
    rows,
    setLoading,
    setPagination,
    setRows,
    cleanTable,
    startService,
    paginationDefault,
    handlePageChange,
    handleRowsPerPageChange,
  };
}

export default useTableData;
