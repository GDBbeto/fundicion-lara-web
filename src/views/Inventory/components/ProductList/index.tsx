import React, { useMemo } from 'react';
import { Grid, Typography, Box, Fade } from '@mui/material';
import Inventory2Icon from '@mui/icons-material/Inventory2';

import { colors } from 'commons/colors';
import { HttpStatusCode } from 'commons/global';

import { useDevice } from 'hooks';

import useProductos from 'views/Inventory/hooks/useProductos';

import {
  CustomSpinner,
  CustomPagination,
  CustomErrorState,
} from 'components/shared';

import ProductCard from '../ProductCard';
import ProductCardSkeleton from '../ProductCardSkeleton';

const ProductList = () => {
  const {
    error,
    search,
    products,
    isLoading,
    pagination,
    handlePageChange,
    handleRowsPerPageChange,
  } = useProductos();

  const { isXs, isSm, isMd, isLg } = useDevice();

  const isEmpty = useMemo(() => products.length === 0, [products]);

  const skeletonCount = useMemo(() => {
    if (isXs) return 2;
    if (isSm) return 4;
    if (isMd) return 8;
    if (isLg) return 10;
    return 8;
  }, [isXs, isSm, isMd, isLg]);

  const skeletonArray = useMemo(
    () => Array.from({ length: skeletonCount }),
    [skeletonCount],
  );

  if (isLoading && search) {
    return (
      <Fade in timeout={300}>
        <CustomSpinner open />
      </Fade>
    );
  }

  if (isLoading) {
    return (
      <Fade in timeout={300}>
        <Grid container spacing={2}>
          {skeletonArray.map((_, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <ProductCardSkeleton />
            </Grid>
          ))}
        </Grid>
      </Fade>
    );
  }

  if (search && error && error.status === HttpStatusCode.NotFound) {
    return (
      <Fade in timeout={300}>
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
            <Inventory2Icon
              sx={{ fontSize: 80, color: 'primary.main', mb: 2 }}
            />
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              No encontramos productos que coincidan con tu b&uacute;squeda.
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              mb={3}
              display="block"
            >
              Prueba ajustando los filtros o el t&eacute;rmino.
            </Typography>
          </Box>
        </Box>
      </Fade>
    );
  }

  if (error && error.status !== HttpStatusCode.NotFound) {
    return <CustomErrorState error={error} />;
  }

  if (isEmpty) {
    return (
      <Fade in timeout={300}>
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
            <Inventory2Icon
              sx={{ fontSize: 80, color: 'primary.main', mb: 2 }}
            />
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              No hay productos disponibles
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              mb={3}
              display="block"
            >
              Parece que a&uacute;n no has agregado productos. ¡Comienza
              agregando uno para verlos aqu&iacute;!
            </Typography>
          </Box>
        </Box>
      </Fade>
    );
  }

  return (
    <Fade in timeout={300}>
      <Box>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              key={product.productId}
            >
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
    </Fade>
  );
};

export default ProductList;
