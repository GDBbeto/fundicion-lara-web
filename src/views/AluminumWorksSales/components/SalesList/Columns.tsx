import React from 'react';

import { Box, Chip, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

import { NumericFormat } from 'react-number-format';

import type { Transaction } from 'types/api';
import type { Column } from 'types/column';

interface CreateSalesColumnsProps {
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

export const createSalesColumns = ({
  onEdit,
  onDelete,
}: CreateSalesColumnsProps): Column<Transaction>[] => [
  {
    label: 'ID',
    apiField: 'transactionId',
    align: 'center',
    sort: true,
    hiddenOnMobile: true,
  },
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
      <Box sx={{ fontFamily: 'monospace' }}>{row.issuerRfc || 'Sin RFC'}</Box>
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
    label: '# pedido',
    apiField: 'orderTransactionId',
    align: 'center',
    render: (row) =>
      row.orderTransactionId ? (
        <Chip
          label={`#${row.orderTransactionId}`}
          size="small"
          color="primary"
          variant="outlined"
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
    hiddenOnMobile: true,
    render: (row) => (
      <Box
        sx={{
          maxWidth: 200,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
        title={row.description || 'Sin descripción'}
      >
        {row.description || 'Sin descripción'}
      </Box>
    ),
  },
  {
    label: 'Acciones',
    apiField: 'transactionId',
    align: 'center',
    render: (row) => (
      <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
        <IconButton size="small" onClick={() => onEdit(row)} color="primary">
          <Edit fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={() => onDelete(row)} color="error">
          <Delete fontSize="small" />
        </IconButton>
      </Box>
    ),
  },
];
