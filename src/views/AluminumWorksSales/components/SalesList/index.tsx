import React, { useMemo, useState } from 'react';

import { Box } from '@mui/material';

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

import SaleFormModal from '../SaleFormModal';

import { createSalesColumns } from './Columns';

const SalesList = () => {
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
  } = useTransactions();
  const { isScreenSmall } = useDevice();
  const { showSnackbar } = useSnackbar();
  const { showError } = useErrorHandler();
  const { mutate: deleteTransaction, isPending: isPendingDelete } =
    useDeleteTransaction();
  const { mutate: updateTransaction, isPending: isPendingUpdate } =
    useUpdateTransaction();

  const [showSaleModal, setShowSaleModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const isPending = isPendingDelete || isPendingUpdate;

  const handleOpenSaleModal = (transaction: Transaction) => {
    setShowSaleModal(true);
    setSelectedTransaction(transaction);
  };

  const handleOpenDeleteModal = (transaction: Transaction) => {
    setShowDeleteModal(true);
    setSelectedTransaction(transaction);
  };

  const columns = useMemo(() => {
    return createSalesColumns({
      onEdit: handleOpenSaleModal,
      onDelete: handleOpenDeleteModal,
    }).filter((col) => !(isScreenSmall && col.hiddenOnMobile));
  }, [isScreenSmall]);

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
    setShowSaleModal(false);
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
      {showSaleModal && selectedTransaction ? (
        <SaleFormModal
          open={showSaleModal}
          sale={selectedTransaction}
          handleClose={() => setShowSaleModal(false)}
          onSubmit={handleSubmit}
        />
      ) : null}

      {showDeleteModal ? (
        <DeleteConfirmationModal
          open={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          title={`Eliminar venta`}
          confirmMessage={`¿Est\u00E1s seguro de que deseas eliminar la venta?`}
        />
      ) : null}
      {isPending ? <CustomSpinner open /> : null}
    </Box>
  );
};

export default SalesList;
