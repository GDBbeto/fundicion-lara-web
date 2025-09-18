// src/views/AluminumWorksSales/components/SaleFormModal.tsx
import React from 'react';
import CustomModal from 'components/shared/CustomModal';
import { Transaction } from 'types/api';

import SaleForm from './SaleForm';

interface Props {
  open: boolean;
  sale?: Transaction | null;
  handleClose: () => void;
  onSubmit: (data: Transaction) => void;
}

const SaleFormModal = ({ open, sale, handleClose, onSubmit }: Props) => {
  return (
    <CustomModal
      open={open}
      title={sale ? 'Editar venta' : 'Registrar venta'}
      handleClose={handleClose}
    >
      <SaleForm sale={sale} onSubmit={onSubmit} onCancel={handleClose} />
    </CustomModal>
  );
};

export default SaleFormModal;
