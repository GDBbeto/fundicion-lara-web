import React, { useState } from 'react';
import { Card } from '@mui/material';

import type { Product } from 'types/api';

import ProductCardHeader from './ProductCardHeader';
import ProductCardContent from './ProductCardContent';
import ProductCardImage from './ProductCardImage';
import ProductFormModal from '../ProductFormModal';

import { cardStyles } from './styles';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  console.log({ product });
  const [open, setOpen] = useState(false);

  /*const handleEdit = () => {
    alert(`Editar producto ${product.name}`);
  };*/

  const handleDelete = () => {
    alert(`Eliminar producto ${product.name}`);
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
        onDelete={handleDelete}
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
    </Card>
  );
};

export default ProductCard;
