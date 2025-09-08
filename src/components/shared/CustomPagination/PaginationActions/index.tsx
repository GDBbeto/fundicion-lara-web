import React from 'react';
import { Box, Pagination, TablePaginationActionsProps } from '@mui/material';

interface Props {
  count: number;
  page: number;
  rowsPerPage: number;
}

const PaginationActions = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
}: TablePaginationActionsProps & Props) => {
  const countTemp = Math.ceil(count / rowsPerPage);

  return (
    <Box display={'flex'}>
      <Pagination
        shape="circular"
        count={countTemp}
        color="primary"
        page={page + 1}
        showFirstButton
        showLastButton
        onChange={(event: any, newPage) =>
          onPageChange && onPageChange(event, newPage - 1)
        }
        style={{ marginLeft: 16 }}
      />
    </Box>
  );
};

export default PaginationActions;
