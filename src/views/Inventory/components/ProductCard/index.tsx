import React, { useState } from 'react';
import { Card } from '@mui/material';

import type { Product } from 'types/api';

import { CustomSpinner, DeleteConfirmationModal } from 'components/shared';

import {
  useUpdateProduct,
  useProductos,
  useDeleteProduct,
  useUploadProductImage,
} from 'views/Inventory/hooks';

import { useErrorHandler, useSnackbar } from 'hooks';

import { ERROR_MESSAGES, SUCCESS_MESSAGES } from 'commons/messages';

import ProductFormModal from '../ProductFormModal';

import ProductCardHeader from './ProductCardHeader';
import ProductCardContent from './ProductCardContent';
import ProductCardImage from './ProductCardImage';

import { cardStyles } from './styles';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { showSnackbar } = useSnackbar();
  const { showError } = useErrorHandler();

  const { handleRefresh } = useProductos();
  const { mutate: updateProduct, isPending: isPendingUpdate } =
    useUpdateProduct();
  const { mutate: deleteProduct, isPending: isPendingDelete } =
    useDeleteProduct();
  const { mutate: uploadImage, isPending: isPendingUpload } =
    useUploadProductImage();

  const [showProductModal, setShowProductModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isPending = isPendingUpdate || isPendingDelete || isPendingUpload;

  const processSuccess = (message: string) => {
    handleRefresh();
    showSnackbar(message, 'success');
  };

  const handleUpload = async (file: File) => {
    uploadImage({ productId: product.productId, file } as any, {
      onSuccess: () => processSuccess(SUCCESS_MESSAGES.IMAGE_UPLOADED),
      onError: (error) => showError(error, ERROR_MESSAGES.UPLOAD_IMAGE),
    });
  };

  const handleSubmit = (updatedProduct: Product) => {
    updateProduct(updatedProduct, {
      onSuccess: () => {
        setShowProductModal(false);
        processSuccess(SUCCESS_MESSAGES.UPDATED);
      },
      onError: (error) => showError(error, ERROR_MESSAGES.UPDATE),
    });
  };

  const handleDelete = () => {
    deleteProduct(product.productId, {
      onSuccess: () => {
        processSuccess(SUCCESS_MESSAGES.DELETED);
        setShowDeleteModal(false);
      },
      onError: (error) => showError(error, ERROR_MESSAGES.DELETE),
    });
  };

  return (
    <Card sx={cardStyles}>
      {/* Encabezado */}
      <ProductCardHeader
        name={product.name}
        client={product.client}
        onEdit={() => setShowProductModal(true)}
        onDelete={() => setShowDeleteModal(true)}
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

      {showProductModal ? (
        <ProductFormModal
          open={showProductModal}
          product={product}
          handleClose={() => setShowProductModal(false)}
          onSubmit={handleSubmit}
        />
      ) : null}
      {showDeleteModal ? (
        <DeleteConfirmationModal
          open={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          title="Eliminar producto"
          confirmMessage={`¿Est\u00E1s seguro de que deseas eliminar el producto "${product.name}"?`}
        />
      ) : null}

      {isPending ? <CustomSpinner open /> : null}
    </Card>
  );
};

export default ProductCard;
