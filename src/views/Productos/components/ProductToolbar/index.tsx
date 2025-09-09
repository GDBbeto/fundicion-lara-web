import React, { useEffect, useState } from 'react';

import { Box, Button, Grid, useMediaQuery, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useDebounce } from 'use-debounce';

import SearchInput from 'components/shared/SearchInput';

import useProductos from 'views/Productos/hooks/useProductos';
import ProductFormModal from '../ProductFormModal';

const ProductToolbar = () => {
  const theme = useTheme();
  const isExactSm = useMediaQuery(theme.breakpoints.only('sm'));
  const [open, setOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const { handleSearch, products } = useProductos();

  const handleAddProduct = () => {
    setOpen(true);
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
            onChange={setSearchTerm}
            placeholder="Buscar productos..."
            disabled={products.length === 0}
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
          onSubmit={(data) => {
            console.log('Guardar', data);
            setOpen(false);
          }}
        />
      ) : null}
    </Box>
  );
};

export default ProductToolbar;
