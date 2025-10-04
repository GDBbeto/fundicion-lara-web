import React from 'react';
import {
  TableBody,
  TableCell,
  TableRow,
  Skeleton,
  Box,
  Typography,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';

import type { Column } from 'types/column';
import { colors } from 'commons/colors';
import { getTableBodySectionStyles } from '../styles';

interface Props<T> {
  columns: Column<T>[];
  rows: T[];
  isLoading: boolean;
  rowKey?: keyof T;
}

const TableBodySection = <T,>({
  columns,
  rows,
  isLoading,
  rowKey,
}: Props<T>) => {
  if (isLoading) {
    return (
      <TableBody>
        {Array.from({ length: 5 }).map((_, rowIdx) => (
          <TableRow key={rowIdx}>
            {columns.map((col, columnIndx) => (
              <TableCell
                key={`${col.apiField as string}-${columnIndx}`}
                sx={getTableBodySectionStyles(col)}
              >
                <Skeleton variant="text" width="80%" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );
  }

  if (!isLoading && rows.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={columns.length} align="center">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              py={4}
              sx={{ opacity: 0.75 }}
            >
              <InboxIcon sx={{ fontSize: 48, color: colors.blueGreyLight }} />
              <Typography
                variant="body1"
                sx={{ mt: 1, color: colors.darkText }}
              >
                No hay informaci&oacute;n para mostrar
              </Typography>
            </Box>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {rows.map((row, rowIdx) => (
        <TableRow
          hover
          key={rowKey ? (row[rowKey] as React.Key) : rowIdx}
          sx={{
            '&.MuiTableRow-hover:hover': {
              backgroundColor: colors.lightSurface,
            },
          }}
        >
          {columns.map((col, columnIndx) => (
            <TableCell
              key={`${col.apiField as string}-${columnIndx}`}
              align={col.align ?? 'left'}
              sx={getTableBodySectionStyles(col)}
            >
              {col.render
                ? col.render(row)
                : (row[col.apiField] as React.ReactNode)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableBodySection;
