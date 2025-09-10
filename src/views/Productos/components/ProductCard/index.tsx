import React, { useState } from 'react';
import { Card } from '@mui/material';

import type { CommonError, Product } from 'types/api';

import { CustomSpinner, DeleteConfirmationModal } from 'components/shared';

import {
  useUpdateProduct,
  useProductos,
  useDeleteProduct,
  useUploadProductImage,
} from 'views/Productos/hooks';

import { useSnackbar } from 'hooks';

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
  const { handleRefetch } = useProductos();
  const { mutate: updateProduct, isPending: isPendingUpdate } =
    useUpdateProduct();
  const { mutate: deleteProduct, isPending: isPendingDelete } =
    useDeleteProduct();
  const { mutate: uploadImage, isPending: isPendingUpload } =
    useUploadProductImage();

  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const isPending = isPendingUpdate || isPendingDelete || isPendingUpload;

  const processError = (error: CommonError, defaultError: string) => {
    showSnackbar(error.userMessage || defaultError, 'error');
  };

  const processSuccess = (message: string) => {
    handleRefetch();
    showSnackbar(message, 'success');
  };

  const handleUpload = async (file: File) => {
    uploadImage({ productId: product.productId, file } as any, {
      onSuccess: () => processSuccess(SUCCESS_MESSAGES.IMAGE_UPLOADED),
      onError: (error) => processError(error, ERROR_MESSAGES.UPLOAD_IMAGE),
    });
  };

  const handleSubmit = (updatedProduct: Product) => {
    updateProduct(updatedProduct, {
      onSuccess: () => {
        setOpen(false);
        processSuccess(SUCCESS_MESSAGES.UPDATED);
      },
      onError: (error) => processError(error, ERROR_MESSAGES.UPDATE),
    });
  };

  const handleDelete = () => {
    deleteProduct(product.productId, {
      onSuccess: () => {
        processSuccess(SUCCESS_MESSAGES.DELETED);
        setOpenDeleteModal(false);
      },
      onError: (error) => processError(error, ERROR_MESSAGES.DELETE),
    });
  };

  return (
    <Card sx={cardStyles}>
      {/* Encabezado */}
      <ProductCardHeader
        name={product.name}
        client={product.client}
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
          onSubmit={handleSubmit}
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

      {isPending ? <CustomSpinner open /> : null}
    </Card>
  );
};

export default ProductCard;
