import React from 'react';
import { Box, Typography } from '@mui/material';

import type { OrderTransaction } from 'types/api';
import { CustomModal } from 'components/shared';
import { colors } from 'commons/colors';
import OrderTransactionDetail from '../OrderTransactionDetail';

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
      title="Detalle del Pedido"
      handleClose={onClose}
      maxWidth="md"
      fullWidth
      scrollable
    >
      <Box sx={{ mb: 2 }}>
        {transaction.orderTransactionId && (
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            ID: #{transaction.orderTransactionId}
          </Typography>
        )}
      </Box>
      <OrderTransactionDetail transaction={transaction} />
    </CustomModal>
  );
};

export default OrderTransactionDetailModal;
