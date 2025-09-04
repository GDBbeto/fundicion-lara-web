import React, { useEffect, useState } from 'react';

import { Box, Button, Grid, useMediaQuery, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useDebounce } from 'use-debounce';

import useProductos from 'views/Productos/hooks/useProductos';
import SearchInput from 'components/shared/SearchInput';

const ProductToolbar = () => {
  const theme = useTheme();
  const isExactSm = useMediaQuery(theme.breakpoints.only('sm'));

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const { setSearch, products } = useProductos();

  const handleAddProduct = () => {
    alert('Agregar producto (modal o navegación)');
  };

  useEffect(() => {
    setSearch(debouncedSearch); // Aplica búsqueda al contexto
  }, [debouncedSearch, setSearch]);

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
    </Box>
  );
};

export default ProductToolbar;
