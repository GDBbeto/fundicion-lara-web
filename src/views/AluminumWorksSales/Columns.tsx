// Columns.tsx
import React from 'react';
import { Box, Chip } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import type { Transaction } from 'types/api';
import type { Column } from 'types/column';

interface ColumnsProps {
  onOrderClick?: (orderId: number) => void;
}

export const getColumns = ({
  onOrderClick,
}: ColumnsProps): Column<Transaction>[] => [
  {
    label: 'Fecha',
    apiField: 'operationDate',
    sort: true,
    render: (row) => <Box sx={{ fontWeight: 500 }}>{row.operationDate}</Box>,
  },
  {
    label: 'Monto',
    apiField: 'amount',
    align: 'right',
    sort: true,
    render: (row) => (
      <Box sx={{ fontWeight: 600 }}>
        <NumericFormat
          value={row.amount ?? 0}
          displayType="text"
          thousandSeparator=","
          prefix="$"
          decimalScale={2}
          fixedDecimalScale
        />
      </Box>
    ),
  },
  {
    label: 'RFC emisor',
    apiField: 'issuerRfc',
    sort: true,
    render: (row) => (
      <Box sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
        {row.issuerRfc || 'Sin RFC'}
      </Box>
    ),
  },
  {
    label: 'Folio',
    apiField: 'invoiceNumber',
    sort: true,
    render: (row) =>
      row.invoiceNumber ? (
        <Chip
          label={row.invoiceNumber}
          size="small"
          variant="outlined"
          sx={{ fontWeight: 500 }}
        />
      ) : (
        <Box sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
          Sin folio
        </Box>
      ),
  },
  {
    label: '# Pedido',
    apiField: 'orderTransactionId',
    align: 'center',
    render: (row) =>
      row.orderTransactionId ? (
        <Chip
          label={`#${row.orderTransactionId}`}
          size="small"
          color="primary"
          variant="outlined"
          sx={{ cursor: 'pointer', fontWeight: 500 }}
          onClick={() => onOrderClick?.(row.orderTransactionId || 0)}
        />
      ) : (
        <Box
          sx={{
            color: 'text.secondary',
            fontStyle: 'italic',
            whiteSpace: 'nowrap',
          }}
        >
          Sin # pedido
        </Box>
      ),
  },
  {
    label: 'Descripción',
    apiField: 'description',
    render: (row) => (
      <Box
        sx={{
          maxWidth: 200,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontStyle: row.description ? undefined : 'italic',
        }}
        title={row.description || 'Sin descripción'}
      >
        {row.description || 'Sin descripción'}
      </Box>
    ),
  },
];
