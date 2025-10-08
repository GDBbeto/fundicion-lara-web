import React from 'react';
import { Paper, Stack, Avatar, Box, Typography, Chip } from '@mui/material';
import { ShoppingBag, Inventory2 } from '@mui/icons-material';

import type { OrderTransaction } from 'types/api';
import { colors } from 'commons/colors';

interface ProductHeaderProps {
  transaction: OrderTransaction;
}

const ProductHeader = ({ transaction }: ProductHeaderProps) => (
  <Paper
    elevation={0}
    sx={{
      p: { xs: 1.5, sm: 1.5 },
      mb: { xs: 1.5, sm: 2 },
      background: `linear-gradient(135deg, ${colors.lightBlue}15 0%, ${colors.darkBlue}10 100%)`,
      border: `1px solid ${colors.lightBlue}40`,
      borderRadius: 2,
    }}
  >
    <Stack direction="row" spacing={{ xs: 1.5, sm: 1.5 }} alignItems="center">
      <Avatar
        src={transaction.productImageUrl || undefined}
        alt={transaction.productName}
        variant="rounded"
        sx={{
          width: { xs: 50, sm: 56 },
          height: { xs: 50, sm: 56 },
          bgcolor: colors.lightBlue,
          color: colors.darkBlue,
        }}
      >
        <Inventory2 sx={{ fontSize: { xs: 24, sm: 28 } }} />
      </Avatar>
      <Box flex={1}>
        <Typography
          variant="subtitle1"
          fontWeight={700}
          sx={{
            color: colors.darkText,
            mb: 0.3,
            lineHeight: 1.2,
            fontSize: { xs: '0.95rem', sm: '1rem' },
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
          sx={{
            fontWeight: 600,
            height: 20,
            fontSize: '0.7rem',
          }}
        />
      </Box>
    </Stack>
  </Paper>
);

export default ProductHeader;
