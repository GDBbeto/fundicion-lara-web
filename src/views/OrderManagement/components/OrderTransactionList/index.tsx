import React, { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { CustomTable } from 'components/shared';

import useOrderTransactions from 'views/OrderManagement/hooks/useOrderTransactios';
import type { OrderTransaction } from 'types/api';
import { useDevice } from 'hooks';
import OrderTransactionDetailModal from '../OrderTransactionDetailModal';
import OrderTransactionListMobile from '../OrderTransactionListMobile';
import { createColumns } from './Columns';

const OrderTransactionList = () => {
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
  } = useOrderTransactions();
  const { isSmallScreen } = useDevice();

  const [selectedTransaction, setSelectedTransaction] =
    useState<OrderTransaction | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleOpenFormModal = (transaction: OrderTransaction) => {
    // TODO: Implement form modal
    console.log('Edit transaction:', transaction);
  };

  const handleOpenDeleteModal = (transaction: OrderTransaction) => {
    // TODO: Implement delete modal
    console.log('Delete transaction:', transaction);
  };

  const handleOpenViewModal = (transaction: OrderTransaction) => {
    setSelectedTransaction(transaction);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedTransaction(null);
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
          onClose={handleCloseModal}
        />
      )}
    </Box>
  );
};

export default OrderTransactionList;
