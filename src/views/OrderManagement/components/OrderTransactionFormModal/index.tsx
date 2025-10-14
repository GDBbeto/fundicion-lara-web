import React from 'react';

import { Button } from '@mui/material';

import CustomModal from 'components/shared/CustomModal';

import type { OrderTransaction, OrderTransactionRequest } from 'types/api';

import OrderTransactionForm from './OrderTransactionForm';

interface Props {
  open: boolean;
  orderTransaction?: OrderTransactionRequest | OrderTransaction | null;
  handleClose: () => void;
  onSubmit: (data: OrderTransactionRequest) => void;
}

const OrderTransactionFormModal = ({
  open,
  handleClose,
  orderTransaction,
  onSubmit,
}: Props) => {
  const formId = 'orderTransactionForm';

  return (
    <CustomModal
      open={open}
      title={orderTransaction ? 'Actualizar pedido' : 'Nuevo pedido'}
      handleClose={handleClose}
      maxWidth="lg"
      scrollable
      actions={() => (
        <>
          <Button id="cancelButton" variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            id="saveButton"
            variant="contained"
            type="submit"
            form={formId}
          >
            Guardar pedido
          </Button>
        </>
      )}
    >
      <OrderTransactionForm
        orderTransaction={orderTransaction}
        onSubmit={onSubmit}
        id={formId}
      />
    </CustomModal>
  );
};

export default OrderTransactionFormModal;
