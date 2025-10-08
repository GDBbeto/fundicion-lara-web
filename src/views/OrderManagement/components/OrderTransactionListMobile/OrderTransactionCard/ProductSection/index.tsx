import React from 'react';
import { Box, Typography, Stack, Chip, Avatar } from '@mui/material';
import { ShoppingBag, Inventory2 } from '@mui/icons-material';

import type { OrderTransaction } from 'types/api';
import { colors } from 'commons/colors';

interface ProductSectionProps {
  transaction: OrderTransaction;
}

const ProductSection = ({ transaction }: ProductSectionProps) => (
  <Stack direction="row" spacing={2} alignItems="center" mb={1.5}>
    <Avatar
      src={transaction.productImageUrl || undefined}
      alt={transaction.productName}
      variant="rounded"
      sx={{
        width: 64,
        height: 64,
        bgcolor: colors.lightBlue + '20',
        color: colors.darkBlue,
      }}
    >
      <Inventory2 sx={{ fontSize: 32 }} />
    </Avatar>
    <Box flex={1}>
      <Typography
        variant="subtitle1"
        fontWeight={700}
        sx={{
          color: colors.darkText,
          lineHeight: 1.2,
          mb: 0.5,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {transaction.productName}
      </Typography>
      <Chip
        icon={<ShoppingBag sx={{ fontSize: 14 }} />}
        label={`${transaction.itemCount} unidades`}
        size="small"
        color="primary"
        variant="filled"
        sx={{ fontWeight: 600, fontSize: '0.7rem' }}
      />
    </Box>
  </Stack>
);

export default ProductSection;
