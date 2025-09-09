import React, { useState } from 'react';
import { Pagination } from 'types/api';

const paginationDefault = {
  page: 1,
  pageSize: 50,
  totalElements: 0,
};

function useTableData<T>() {
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Pagination>(paginationDefault);
  const [rows, setRows] = useState<T[]>([]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    value: number,
  ) => {
    setPagination({ ...pagination, page: value + 1 });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<any>) => {
    setPagination({
      ...pagination,
      page: 1,
      pageSize: event.target.value,
    });
  };

  const cleanTable = () => {
    setLoading(false);
    setPagination(paginationDefault);
    setRows([]);
  };

  const startService = () => {
    setLoading(true);
    setRows([]);
  };

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
    handleChangePage,
    handleChangeRowsPerPage,
  };
}

export default useTableData;
