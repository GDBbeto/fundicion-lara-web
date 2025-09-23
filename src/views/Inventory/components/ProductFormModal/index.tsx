import React from 'react';

import { Button } from '@mui/material';

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
  const formId = 'productForm';

  return (
    <CustomModal
      open={open}
      title={product ? 'Actualizar producto' : 'Agregar producto'}
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
      <ProductForm product={product} onSubmit={onSubmit} id={formId} />
    </CustomModal>
  );
};

export default ProductFormModal;
