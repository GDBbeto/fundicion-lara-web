import React, { useMemo } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import Inventory2Icon from '@mui/icons-material/Inventory2';

import { colors } from 'commons/colors';

import { useDevice } from 'hooks';

import useProductos from 'views/Productos/hooks/useProductos';

import CustomPagination from 'components/shared/CustomPagination';

import ProductCard from '../ProductCard';
import ProductCardSkeleton from '../ProductCardSkeleton';

const ProductList = () => {
  const { products, isLoading, pagination, setPage } = useProductos();

  const { isXs, isSm, isMd, isLg } = useDevice();

  const isEmpty = useMemo(() => products.length === 0, [products]);

  const skeletonCount = useMemo(() => {
    if (isXs) return 2;
    if (isSm) return 4;
    if (isMd) return 8;
    if (isLg) return 10;
    return 8; // fallback
  }, [isXs, isSm, isMd, isLg]);

  const skeletonArray = useMemo(
    () => Array.from({ length: skeletonCount }),
    [skeletonCount],
  );

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    //  setPageSize(parseInt(event.target.value, 10));
    setPage(1);
  };

  if (isLoading) {
    return (
      <Grid container spacing={2}>
        {skeletonArray.map((_, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <ProductCardSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (isEmpty) {
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
