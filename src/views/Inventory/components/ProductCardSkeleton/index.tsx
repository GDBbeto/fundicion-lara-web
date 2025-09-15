import React from 'react';
import { Card, CardContent, Skeleton, Box } from '@mui/material';

const ProductCardSkeleton = () => {
  return (
    <Card sx={{ borderRadius: 2, p: 2 }}>
      <Skeleton variant="rectangular" height={140} animation="wave" />
      <CardContent>
        <Skeleton variant="text" height={30} width="80%" animation="wave" />
        <Skeleton variant="text" height={20} width="60%" animation="wave" />
        <Box mt={2}>
          <Skeleton variant="text" height={20} width="40%" animation="wave" />
          <Skeleton variant="text" height={20} width="30%" animation="wave" />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCardSkeleton;
