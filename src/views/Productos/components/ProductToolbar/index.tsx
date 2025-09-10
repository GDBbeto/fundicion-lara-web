import React, { useCallback, useEffect, useState } from 'react';

import { Box, Button, Grid, useMediaQuery, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useDebounce } from 'use-debounce';

import { useSnackbar } from 'hooks';

import { CustomSpinner, SearchInput } from 'components/shared';

import { useProductos, useSaveProduct } from 'views/Productos/hooks';

import type { Product } from 'types/api';

import ProductFormModal from '../ProductFormModal';

const ProductToolbar = () => {
  const theme = useTheme();

  const isExactSm = useMediaQuery(theme.breakpoints.only('sm'));
  const [open, setOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const { showSnackbar } = useSnackbar();

  const { handleSearch, error, handleRefetch } = useProductos();
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
        handleRefetch();
        showSnackbar('Se guardó corretamente', 'success');
      },
      onError: (customError) => {
        showSnackbar(
          customError?.userMessage || 'Ocurrió un error inesperado.',
          'error',
        );
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
            value={searchTerm}
            onChange={handleSearchInputChange}
            placeholder="Buscar productos..."
            disabled={!!error && error.status !== 404}
          />
        </Grid>

        <Grid
          size={{ xs: 12, sm: 4 }}
          textAlign={{ xs: 'center', sm: 'right' }}
        >
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddProduct}
            disabled={!!error && error.status !== 404}
          >
            {isExactSm ? 'Agregar' : ' Agregar producto'}
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
