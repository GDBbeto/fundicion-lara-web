// src/views/Transactions/components/TransactionFormModal.tsx
import React from 'react';
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

  return (
    <CustomModal
      open={open}
      title={
        transaction
          ? `Editar ${label.toLowerCase()}`
          : `Registrar ${label.toLowerCase()}`
      }
      handleClose={handleClose}
    >
      <TransactionForm
        transaction={transaction}
        onSubmit={onSubmit}
        onCancel={handleClose}
      />
    </CustomModal>
  );
};

export default TransactionFormModal;
