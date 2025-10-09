import React from 'react';

import { Button } from '@mui/material';

import CustomModal from 'components/shared/CustomModal';

import type { OrderTransactionRequest } from 'types/api';

import OrderTransactionForm from './OrderTransactionForm';

interface Props {
  open: boolean;
  orderTransaction?: OrderTransactionRequest | null;
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
      title={orderTransaction ? 'Actualizar pedido' : 'Agregar pedido'}
      handleClose={handleClose}
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
            Guardar
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
