import React from 'react';

import type { OrderTransaction } from 'types/api';
import { CustomModal } from 'components/shared';
import OrderTransactionDetail from './OrderTransactionDetail';

interface OrderTransactionDetailModalProps {
  open: boolean;
  transaction: OrderTransaction;
  onClose: () => void;
}

const OrderTransactionDetailModal = ({
  open,
  transaction,
  onClose,
}: OrderTransactionDetailModalProps) => {
  return (
    <CustomModal
      open={open}
      title={`Detalle del Pedido: #${transaction.orderTransactionId}`}
      handleClose={onClose}
      maxWidth="md"
      fullWidth
      scrollable
    >
      <OrderTransactionDetail transaction={transaction} />
    </CustomModal>
  );
};

export default OrderTransactionDetailModal;
