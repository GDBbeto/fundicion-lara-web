import React, { useEffect, useRef, useState } from 'react';
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
  const [showShadow, setShowShadow] = useState(false);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = tableContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isEnd =
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 10;
      setShowShadow(!isEnd); // Si no está en el final, mostramos la sombra
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll(); // verificar posición inicial

    // eslint-disable-next-line consistent-return
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
      <TableToolbar
        title={title}
        dense={dense}
        onToggleDense={setDense}
        onRefresh={onRefresh}
      />
      <Box sx={{ position: 'relative' }}>
        {/* Professional Bottom Shadow */}
        {showShadow && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '28px',
              background: `
                linear-gradient(
                  to top,
                  rgba(0, 0, 0, 0.18) 0%,
                  rgba(0, 0, 0, 0.12) 25%,
                  rgba(0, 0, 0, 0.06) 50%,
                  rgba(0, 0, 0, 0.02) 75%,
                  transparent 100%
                )
              `,
              pointerEvents: 'none',
              zIndex: 3,
              borderRadius: '0 0 8px 8px',
              boxShadow: 'inset 0 -2px 4px rgba(0, 0, 0, 0.08)',
              backdropFilter: 'blur(1px)',
            }}
          />
        )}

        <TableContainer
          ref={tableContainerRef}
          sx={{
            maxHeight,
            overflowY: 'auto',
          }}
        >
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
      </Box>
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
