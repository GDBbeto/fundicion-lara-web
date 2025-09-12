import React, { useState } from 'react';
import { Paper, Box, Table, TableContainer } from '@mui/material';

import type { Pagination } from 'types/api';
import type { Column } from 'types/column';

import CustomPagination from '../CustomPagination';

import TableToolbar from './TableToolbar';
import TableHeadSection from './TableHeadSection';
import TableBodySection from './TableBodySection';

interface Props<T> {
  columns: Column<T>[];
  rows: T[];
  isLoading?: boolean;
  title?: string;
  rowKey?: keyof T;
  maxHeight: string;
  order?: 'asc' | 'desc';
  orderBy?: keyof T;
  onSort?: (property: keyof T) => void;
  onRefresh?: () => void;
  pagination?: Pagination;
  onPageChange?: (_: unknown, newPage: number) => void;
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomTable = <T,>({
  columns,
  rows,
  isLoading = false,
  title = '',
  rowKey,
  order,
  orderBy,
  onSort,
  maxHeight,
  onRefresh,
  pagination,
  onPageChange,
  onRowsPerPageChange,
}: Props<T>) => {
  const [dense, setDense] = useState(false);

  return (
    <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
      <TableToolbar
        title={title}
        dense={dense}
        onToggleDense={setDense}
        onRefresh={onRefresh}
      />

      <TableContainer sx={{ maxHeight, overflowY: 'auto' }}>
        <Table size={dense ? 'small' : 'medium'} stickyHeader>
          <TableHeadSection
            columns={columns}
            order={order}
            orderBy={orderBy}
            onSort={onSort}
          />
          <TableBodySection
            columns={columns}
            rows={rows}
            isLoading={isLoading}
            rowKey={rowKey}
          />
        </Table>
      </TableContainer>

      {pagination && onPageChange && onRowsPerPageChange && (
        <Box mt={2}>
          <CustomPagination
            pagination={pagination}
            handlePageChange={onPageChange}
            handleRowsPerPageChange={onRowsPerPageChange}
          />
        </Box>
      )}
    </Paper>
  );
};

export default CustomTable;
