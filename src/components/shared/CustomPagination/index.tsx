import React from 'react';
import { Paper, TablePagination } from '@mui/material';
import { Pagination } from 'types/api';
import PaginationActions from './PaginationActions';

interface Props {
  pagination: Pagination;
  handlePageChange: (_: unknown, newPage: number) => void;
  handleRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomPagination = ({
  pagination,
  handlePageChange,
  handleRowsPerPageChange,
}: Props) => {
  return (
    <Paper
      elevation={2}
      sx={{
        py: 0,
        px: { xs: 1, sm: 2 },
        borderRadius: 2,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: { xs: 2, sm: '0px' },
      }}
    >
      <TablePagination
        component="div"
        count={pagination.totalElements}
        page={pagination.page - 1}
        onPageChange={handlePageChange}
        rowsPerPage={pagination.pageSize}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[10, 20, 50]}
        labelRowsPerPage={'Filas por p\u00E1gina:'}
        showFirstButton
        showLastButton
        ActionsComponent={PaginationActions as any}
        labelDisplayedRows={({ from, to, count: total }) =>
          `${from}–${to} de ${total !== -1 ? total : `m\u00E1s de ${to}`}`
        }
        sx={{
          '.MuiTablePagination-toolbar': {
            flexWrap: 'wrap',
            justifyContent: 'center',
          },
          '.MuiTablePagination-selectRoot': {
            borderRadius: 1,
          },
          '.MuiTablePagination-actions': {},
        }}
      />
    </Paper>
  );
};

export default CustomPagination;
