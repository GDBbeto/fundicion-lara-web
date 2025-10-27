import React, { useCallback, useEffect, useState } from 'react';

import { Box, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useDebounce } from 'use-debounce';

import { useDevice, usePermissions, useSnackbar } from 'hooks';

import { CustomSpinner, SearchInput } from 'components/shared';

import { useProductos, useSaveProduct } from 'views/Inventory/hooks';

import type { Product } from 'types/api';

import { ERROR_MESSAGES, SUCCESS_MESSAGES } from 'commons/messages';
import { HttpStatusCode } from 'commons/global';

import ProductFormModal from '../ProductFormModal';

const ProductToolbar = () => {
  const { isXs } = useDevice();
  const { isReadOnly } = usePermissions();
  const [open, setOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const { showSnackbar, showSnackbarError } = useSnackbar();

  const { handleSearch, error, handleRefresh } = useProductos();
  const { mutate: saveProduct, isPending } = useSaveProduct();

  const handleAddProduct = () => {
    setOpen(true);
  };

  const handleSearchInputChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const handleSubmit = (productData: Product) => {
    saveProduct(productData, {
      onSuccess: () => {
        setOpen(false);
        handleRefresh();
        showSnackbar(SUCCESS_MESSAGES.CREATED, 'success');
      },
      onError: (customError) => {
        showSnackbarError(customError, ERROR_MESSAGES.DEFAULT);
      },
    });
  };

  useEffect(() => {
    handleSearch(debouncedSearch);
  }, [debouncedSearch, handleSearch]);

  return (
    <Box mb={3}>
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12, sm: 8 }}>
          <SearchInput
            id="searchTerm"
            value={searchTerm}
            onChange={handleSearchInputChange}
            placeholder="Buscar productos..."
            disabled={!!error && error.status !== HttpStatusCode.NotFound}
          />
        </Grid>

        <Grid
          size={{ xs: 12, sm: 4 }}
          textAlign={{ xs: 'center', sm: 'right' }}
        >
          <Button
            id="addButton"
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddProduct}
            disabled={
              isReadOnly ||
              (!!error && error.status !== HttpStatusCode.NotFound)
            }
          >
            {isXs ? 'Agregar' : ' Agregar producto'}
          </Button>
        </Grid>
      </Grid>
      {open ? (
        <ProductFormModal
          open={open}
          product={null}
          handleClose={() => setOpen(false)}
          onSubmit={handleSubmit}
        />
      ) : null}
      {isPending ? <CustomSpinner open /> : null}
    </Box>
  );
};

export default ProductToolbar;
