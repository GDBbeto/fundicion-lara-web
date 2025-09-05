import React from 'react';
import CustomModal from 'components/shared/CustomModal';

import type { Product } from 'types/api';

import ProductForm from './ProductForm';

interface Props {
  open: boolean;
  product?: Product | null;
  handleClose: () => void;
  onSubmit: (data: Product) => void;
}

const ProductFormModal = ({ open, handleClose, product, onSubmit }: Props) => {
  return (
    <CustomModal
      open={open}
      title={product ? 'Actualizar producto' : 'Agregar producto'}
      handleClose={handleClose}
    >
      <ProductForm
        product={product}
        onSubmit={onSubmit}
        onCancel={handleClose}
      />
    </CustomModal>
  );
};

export default ProductFormModal;
