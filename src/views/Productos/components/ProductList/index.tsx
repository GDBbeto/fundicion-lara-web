import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import Inventory2Icon from '@mui/icons-material/Inventory2';

import { colors } from 'commons/colors';

import useProductos from 'views/Productos/hooks/useProductos';
import CustomPagination from 'components/shared/CustomPagination';

import ProductCard from '../ProductCard';

const ProductList = () => {
  const { products, pagination, setPage } = useProductos();

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    //  setPageSize(parseInt(event.target.value, 10));
    setPage(1);
  };

  if (products.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
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
      <Box mt={2} />
      <CustomPagination
        pagination={pagination}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
      />
    </Box>
  );
};

export default ProductList;
