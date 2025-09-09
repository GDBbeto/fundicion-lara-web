import React, { useState } from 'react';
import { Card } from '@mui/material';

import type { Product } from 'types/api';

import DeleteConfirmationModal from 'components/shared/DeleteConfirmationModal';

import ProductFormModal from '../ProductFormModal';

import ProductCardHeader from './ProductCardHeader';
import ProductCardContent from './ProductCardContent';
import ProductCardImage from './ProductCardImage';

import { cardStyles } from './styles';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  /*const handleEdit = () => {
    alert(`Editar producto ${product.name}`);
  };*/

  const handleDelete = () => {
    console.log('Eliminar');
  };

  const handleUpload = async (file: File) => {
    console.log({ file });
  };

  return (
    <Card sx={cardStyles}>
      {/* Encabezado */}
      <ProductCardHeader
        name={product.name}
        onEdit={() => setOpen(true)}
        onDelete={() => setOpenDeleteModal(true)}
      />

      {/* Imagen */}

      <ProductCardImage
        imageUrl={product.avatar}
        name={product.name}
        onUpload={handleUpload}
        loading={false}
      />

      {/* Contenido */}
      <ProductCardContent product={product} />

      {open ? (
        <ProductFormModal
          open={open}
          product={product}
          handleClose={() => setOpen(false)}
          onSubmit={(data) => {
            console.log('Guardar', data);
            setOpen(false);
          }}
        />
      ) : null}
      {openDeleteModal ? (
        <DeleteConfirmationModal
          open={openDeleteModal}
          handleClose={() => setOpenDeleteModal(false)}
          onConfirm={handleDelete}
          title="Eliminar producto"
          confirmMessage={`¿Estás seguro de que deseas eliminar el producto "${product.name}"?`}
        />
      ) : null}
    </Card>
  );
};

export default ProductCard;
