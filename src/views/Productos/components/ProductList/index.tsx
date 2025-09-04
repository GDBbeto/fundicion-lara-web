import React from 'react';
import { Grid, Pagination, Typography, Box } from '@mui/material';
import Inventory2Icon from '@mui/icons-material/Inventory2'; // Icono caja vacía

import useProductos from 'views/Productos/hooks/useProductos';

import { colors } from 'commons/colors';

import ProductCard from '../ProductCard';

const ProductList = () => {
  const { products, pagination, setPage } = useProductos();

  if (products.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh" // Ocupa buena parte de la pantalla
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          mt={10}
          mb={10}
          sx={{
            backgroundColor: colors.veryLightGray,
            borderRadius: 2,
            p: 5,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            maxWidth: 500,
            mx: 'auto',
            textAlign: 'center',
          }}
        >
          <Inventory2Icon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            No hay productos disponibles
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            mb={3}
            display="block"
          >
            Parece que aún no has agregado productos. ¡Comienza agregando uno
            para verlos aquí!
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.productId}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={pagination.totalPages}
          page={pagination.page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default ProductList;
