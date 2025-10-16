import React from 'react';

import TransactionProvider from 'context/transaction/TransactionContext';
import {
  TransactionList,
  TransactionToolbar,
  TransactionTotalCard,
} from 'components/Transactions';

import { getColumns } from './Columns';
import OrderTransactionDetailModal from './components/OrderTransactionDetailModal';

const AluminumWorksSales = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedOrderId, setSelectedOrderId] = React.useState<number | null>(
    null,
  );

  const handleOrderClick = (orderId: number) => {
    setSelectedOrderId(orderId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOrderId(null);
  };

  return (
    <TransactionProvider type="SALE" label="Venta">
      <TransactionTotalCard />
      <TransactionToolbar />
      <TransactionList
        columns={getColumns({ onOrderClick: handleOrderClick })}
      />

      {selectedOrderId && (
        <OrderTransactionDetailModal
          open={openModal}
          transactionId={selectedOrderId}
          onClose={handleCloseModal}
        />
      )}
    </TransactionProvider>
  );
};

export default AluminumWorksSales;
