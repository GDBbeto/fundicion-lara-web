// src/views/Transactions/components/TransactionFormModal.tsx
import React from 'react';

import { Button } from '@mui/material';

import CustomModal from 'components/shared/CustomModal';

import { Transaction } from 'types/api';
import { useTransactions } from 'hooks';

import TransactionForm from './TransactionForm';

interface Props {
  open: boolean;
  transaction?: Transaction | null;
  handleClose: () => void;
  onSubmit: (data: Transaction) => void;
}

const TransactionFormModal = ({
  open,
  transaction,
  handleClose,
  onSubmit,
}: Props) => {
  const { label } = useTransactions();
  const formId = 'transactionForm';
  return (
    <CustomModal
      open={open}
      title={
        transaction
          ? `Editar ${label.toLowerCase()}`
          : `Registrar ${label.toLowerCase()}`
      }
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
      <TransactionForm
        transaction={transaction}
        onSubmit={onSubmit}
        id={formId}
      />
    </CustomModal>
  );
};

export default TransactionFormModal;
