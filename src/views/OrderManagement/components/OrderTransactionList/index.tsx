import React, { useMemo, useState } from 'react';
import { Box } from '@mui/material';

import {
  CustomTable,
  CustomSpinner,
  DeleteConfirmationModal,
  CustomErrorState,
} from 'components/shared';

import {
  useOrderTransactions,
  useUpdateOrderTransaction,
  useDeleteOrderTransaction,
} from 'views/OrderManagement/hooks';

import type { OrderTransaction, OrderTransactionRequest } from 'types/api';
import { useDevice, useSnackbar, useErrorHandler } from 'hooks';

import { ERROR_MESSAGES, SUCCESS_MESSAGES } from 'commons/messages';

import { HttpStatusCode } from 'commons/global';

import OrderTransactionDetailModal from '../OrderTransactionDetailModal';
import OrderTransactionFormModal from '../OrderTransactionFormModal';
import OrderTransactionListMobile from '../OrderTransactionListMobile';
import { createColumns } from './Columns';

const OrderTransactionList = () => {
  const {
    error: errorOrderTransactions,
    transactions,
    isLoading,
    pagination,
    order,
    orderBy,
    handleRefresh,
    handlePageChange,
    handleRowsPerPageChange,
    handleSort,
  } = useOrderTransactions();
  const { isSmallScreen } = useDevice();
  const { showSnackbar } = useSnackbar();
  const { showError } = useErrorHandler();

  const { mutate: updateTransaction, isPending: isPendingUpdate } =
    useUpdateOrderTransaction();
  const { mutate: deleteTransaction, isPending: isPendingDelete } =
    useDeleteOrderTransaction();

  const [selectedTransaction, setSelectedTransaction] =
    useState<OrderTransaction | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isPending = isPendingUpdate || isPendingDelete;

  const processSuccess = (message: string) => {
    handleRefresh();
    showSnackbar(message, 'success');
  };

  const handleOpenFormModal = (transaction: OrderTransaction) => {
    setSelectedTransaction(transaction);
    setShowFormModal(true);
  };

  const handleOpenDeleteModal = (transaction: OrderTransaction) => {
    setSelectedTransaction(transaction);
    setShowDeleteModal(true);
  };

  const handleOpenViewModal = (transaction: OrderTransaction) => {
    setSelectedTransaction(transaction);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedTransaction(null);
  };

  const handleCloseFormModal = () => {
    setShowFormModal(false);
    setSelectedTransaction(null);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedTransaction(null);
  };

  const handleSubmitUpdate = (data: OrderTransactionRequest) => {
    updateTransaction(
      { ...data, registerInSales: data.registerInSales || false },
      {
        onSuccess: () => {
          handleCloseFormModal();
          processSuccess(SUCCESS_MESSAGES.UPDATED);
        },
        onError: (error) => {
          showError(error, ERROR_MESSAGES.UPDATE);
        },
      },
    );
  };

  const handleConfirmDelete = () => {
    if (!selectedTransaction) return;

    deleteTransaction(selectedTransaction.orderTransactionId, {
      onSuccess: () => {
        handleCloseDeleteModal();
        processSuccess(SUCCESS_MESSAGES.DELETED);
      },
      onError: (error) => {
        showError(error, ERROR_MESSAGES.DELETE);
      },
    });
  };

  const columns = useMemo(
    () =>
      createColumns(
        handleOpenViewModal,
        handleOpenFormModal,
        handleOpenDeleteModal,
      ),
    [],
  );

  if (
    errorOrderTransactions &&
    errorOrderTransactions.status !== HttpStatusCode.NotFound
  ) {
    return <CustomErrorState error={errorOrderTransactions} />;
  }

  return (
    <Box sx={{ width: '100%' }}>
      {isSmallScreen ? (
        <OrderTransactionListMobile
          handleOpenFormModal={handleOpenFormModal}
          handleOpenDeleteModal={handleOpenDeleteModal}
        />
      ) : (
        <CustomTable<OrderTransaction>
          columns={columns}
          rows={transactions}
          isLoading={isLoading}
          onRefresh={handleRefresh}
          pagination={pagination}
          maxHeight="70vh"
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowKey="orderTransactionId"
          order={order}
          orderBy={orderBy}
          onSort={handleSort}
        />
      )}

      {selectedTransaction && (
        <OrderTransactionDetailModal
          open={showDetailModal}
          transaction={selectedTransaction}
          onClose={handleCloseDetailModal}
        />
      )}

      <OrderTransactionFormModal
        open={showFormModal}
        orderTransaction={selectedTransaction}
        handleClose={handleCloseFormModal}
        onSubmit={handleSubmitUpdate}
      />

      <DeleteConfirmationModal
        open={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Eliminar pedido"
        confirmMessage={`¿Estás seguro de que deseas eliminar el pedido #${selectedTransaction?.orderTransactionId}?`}
      />

      {isPending && <CustomSpinner open />}
    </Box>
  );
};

export default OrderTransactionList;
