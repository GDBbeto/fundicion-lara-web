import React, { useState } from 'react';
import { Card, CardMedia } from '@mui/material';

import type { Product } from 'types/api';

import fallbackImage from 'assets/images/product-placeholder.png';

import { cardStyles, cardMediaStyles } from './styles';
import ProductCardHeader from './ProductCardHeader';
import ProductCardContent from './ProductCardContent';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const [imageError, setImageError] = useState(false);

  const handleEdit = () => {
    alert(`Editar producto ${product.name}`);
  };

  const handleDelete = () => {
    alert(`Eliminar producto ${product.name}`);
  };

  return (
    <Card sx={cardStyles}>
      {/* Encabezado */}
      <ProductCardHeader
        name={product.name}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Imagen */}
      <CardMedia
        component="img"
        image={imageError || !product.avatar ? fallbackImage : product.avatar}
        alt={product.name}
        onError={() => setImageError(true)}
        sx={cardMediaStyles}
      />

      {/* Contenido */}
      <ProductCardContent product={product} />
    </Card>
  );
};

export default ProductCard;
