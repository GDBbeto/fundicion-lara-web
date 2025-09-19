// src/views/Transactions/components/TransactionList.tsx
import React, { useMemo, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

import {
  CustomSpinner,
  CustomTable,
  DeleteConfirmationModal,
} from 'components/shared';

import {
  useDeleteTransaction,
  useDevice,
  useErrorHandler,
  useSnackbar,
  useTransactions,
  useUpdateTransaction,
} from 'hooks';

import type { Transaction } from 'types/api';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from 'commons/messages';

import { Column } from 'types/column';

import TransactionFormModal from '../TransactionFormModal';

interface TransactionListProps {
  columns: Column<Transaction>[];
}

const TransactionList = (props: TransactionListProps) => {
  const {
    transactions,
    isLoading,
    pagination,
    order,
    orderBy,
    handleRefresh,
    handlePageChange,
    handleRowsPerPageChange,
    handleSort,
    label,
  } = useTransactions();

  const { isScreenSmall } = useDevice();
  const { showSnackbar } = useSnackbar();
  const { showError } = useErrorHandler();
  const { mutate: deleteTransaction, isPending: isPendingDelete } =
    useDeleteTransaction();
  const { mutate: updateTransaction, isPending: isPendingUpdate } =
    useUpdateTransaction();

  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const isPending = isPendingDelete || isPendingUpdate;

  const handleOpenFormModal = (transaction: Transaction) => {
    setShowFormModal(true);
    setSelectedTransaction(transaction);
  };

  const handleOpenDeleteModal = (transaction: Transaction) => {
    setShowDeleteModal(true);
    setSelectedTransaction(transaction);
  };

  const columns = useMemo<Column<Transaction>[]>(() => {
    return [
      ...props.columns,
      {
        label: 'Acciones',
        apiField: 'transactionId',
        align: 'center',
        render: (row: Transaction) => (
          <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
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
      } as Column<Transaction>,
    ].filter((col) => !(isScreenSmall && col.hiddenOnMobile));
  }, [props.columns, isScreenSmall]);

  const processSuccess = (message: string) => {
    handleRefresh();
    showSnackbar(message, 'success');
  };

  const handleDelete = () => {
    if (!selectedTransaction?.transactionId) return;

    deleteTransaction(selectedTransaction.transactionId, {
      onSuccess: () => {
        processSuccess(SUCCESS_MESSAGES.DELETED);
        setShowDeleteModal(false);
        setSelectedTransaction(null);
      },
      onError: (error) => showError(error, ERROR_MESSAGES.DELETE),
    });
  };

  const handleSubmit = (transaction: Transaction) => {
    updateTransaction(transaction, {
      onSuccess: () => {
        processSuccess(SUCCESS_MESSAGES.UPDATED);
      },
      onError: (error) => showError(error, ERROR_MESSAGES.UPDATE),
    });
    setShowFormModal(false);
    setSelectedTransaction(null);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <CustomTable<Transaction>
        key={columns.map((c) => c.apiField).join('-')}
        columns={columns}
        rows={transactions}
        isLoading={isLoading}
        onRefresh={handleRefresh}
        pagination={pagination}
        maxHeight="70vh"
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowKey="transactionId"
        order={order}
        orderBy={orderBy}
        onSort={handleSort}
      />

      {showFormModal && selectedTransaction ? (
        <TransactionFormModal
          open={showFormModal}
          transaction={selectedTransaction}
          handleClose={() => setShowFormModal(false)}
          onSubmit={handleSubmit}
        />
      ) : null}

      {showDeleteModal ? (
        <DeleteConfirmationModal
          open={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          title={`Eliminar ${label.toLowerCase()}`}
          confirmMessage={`¿Est\u00E1s seguro de que deseas eliminar la ${label.toLowerCase()}?`}
        />
      ) : null}

      {isPending ? <CustomSpinner open /> : null}
    </Box>
  );
};

export default TransactionList;
