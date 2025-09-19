import React from 'react';
import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';
import { Column } from 'types/column';

interface Props<T> {
  columns: Column<T>[];
  order?: 'asc' | 'desc';
  orderBy?: keyof T;
  onSort?: (property: keyof T) => void;
}

const TableHeadSection = <T,>({
  columns,
  order,
  orderBy,
  onSort,
}: Props<T>) => {
  const createSortHandler = (property: keyof T) => () => {
    if (onSort) {
      onSort(property);
    }
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((col) => (
          <TableCell
            key={col.apiField as string}
            align={col.align ?? 'left'}
            sortDirection={orderBy === col.apiField ? order : false}
            sx={{
              fontWeight: 600,
              backgroundColor: 'background.paper',
              zIndex: 1,
              top: 0,
            }}
          >
            {onSort && col.sort ? (
              <TableSortLabel
                active={orderBy === col.apiField}
                direction={orderBy === col.apiField ? order : 'asc'}
                onClick={createSortHandler(col.apiField)}
              >
                {col.label}
              </TableSortLabel>
            ) : (
              col.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeadSection;
