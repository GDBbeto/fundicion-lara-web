import React from 'react';

import { Box, Chip, IconButton } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';

import { NumericFormat } from 'react-number-format';

import type { OrderTransaction } from 'types/api';
import type { Column } from 'types/column';

import {
  getDeliveryStatusColor,
  getDeliveryStatusOption,
  getPaymentStatusColor,
  getPaymentStatusOption,
} from 'utils/catalogs';

export const baseColumns: Column<OrderTransaction>[] = [
  {
    label: 'Fecha',
    apiField: 'operationDate',
    sort: true,
    render: (row) => (
      <Box sx={{ fontWeight: 500, whiteSpace: 'nowrap' }}>
        {row.operationDate}
      </Box>
    ),
  },
  {
    label: 'Producto',
    apiField: 'productName',
    sort: true,
    render: (row) => (
      <Box
        sx={{
          maxWidth: 180,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontWeight: 500,
        }}
        title={row.productName}
      >
        {row.productName}
      </Box>
    ),
  },
  {
    label: 'Cliente',
    apiField: 'client',
    sort: true,
    render: (row) => (
      <Box
        sx={{
          maxWidth: 150,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          color: 'text.secondary',
        }}
        title={row.client}
      >
        {row.client || 'Sin cliente'}
      </Box>
    ),
  },
  {
    label: 'Cantidad',
    apiField: 'itemCount',
    align: 'center',
    sort: true,
    render: (row) => (
      <Chip
        label={row.itemCount}
        size="small"
        color="primary"
        variant="outlined"
        sx={{ fontWeight: 600 }}
      />
    ),
  },
  {
    label: 'Monto Pagado',
    apiField: 'amountPaid',
    align: 'right',
    sort: true,
    render: (row) => (
      <Box sx={{ fontWeight: row.paymentStatus === 'PAID' ? 600 : 400 }}>
        <NumericFormat
          id="amountPaid"
          value={row.amountPaid ?? 0}
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
    label: 'Estado Pago',
    apiField: 'paymentStatus',
    align: 'center',
    sort: true,
    render: (row) => {
      return (
        <Chip
          label={
            getPaymentStatusOption(row.paymentStatus)?.label ||
            row.paymentStatus
          }
          size="small"
          color={getPaymentStatusColor(row.paymentStatus)}
          variant="filled"
        />
      );
    },
  },
  {
    label: 'Estado Entrega',
    apiField: 'deliveryStatus',
    align: 'center',
    sort: true,
    render: (row) => {
      return (
        <Chip
          label={
            getDeliveryStatusOption(row.deliveryStatus)?.label ||
            row.deliveryStatus
          }
          size="small"
          color={getDeliveryStatusColor(row.deliveryStatus)}
          variant="outlined"
        />
      );
    },
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

export const createColumns = (
  handleOpenViewModal: (transaction: OrderTransaction) => void,
  handleOpenFormModal: (transaction: OrderTransaction) => void,
  handleOpenDeleteModal: (transaction: OrderTransaction) => void,
): Column<OrderTransaction>[] => {
  return [
    ...baseColumns,
    {
      label: 'Acciones',
      apiField: 'orderTransactionId',
      align: 'center',
      width: 120,
      sticky: 'right',
      render: (row: OrderTransaction) => (
        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
          <IconButton
            size="small"
            onClick={() => handleOpenViewModal(row)}
            color="info"
          >
            <Visibility fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleOpenFormModal(row)}
            color="primary"
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleOpenDeleteModal(row)}
            color="error"
          >
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];
};
