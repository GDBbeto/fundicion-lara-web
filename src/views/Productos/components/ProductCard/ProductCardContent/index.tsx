import React from 'react';

import { Box, CardContent, Typography, Divider, Stack } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SellIcon from '@mui/icons-material/Sell';

import { NumericFormat } from 'react-number-format';

import type { Product } from 'types/api';

interface Props {
  product: Product;
}

const ProductCardContent = ({ product }: Props) => {
  return (
    <CardContent>
      {/* Descripción */}
      <Typography variant="body2" color="text.secondary" noWrap sx={{ mb: 1 }}>
        {product.description}
      </Typography>

      <Divider sx={{ mb: 1 }} />

      <Stack spacing={1}>
        {/* Stock */}
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <InventoryIcon fontSize="small" color="action" sx={{ mr: 1 }} />
            <Typography variant="body2" fontWeight={500} noWrap>
              Stock:
            </Typography>
          </Box>
          <Typography
            component="span"
            variant="body2"
            fontWeight={600}
            color="primary"
          >
            {product.stock}&nbsp;{product.unidad || ''}
          </Typography>
        </Box>

        {/* Precio de compra */}
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <AttachMoneyIcon fontSize="small" color="success" sx={{ mr: 1 }} />
            <Typography variant="body2" fontWeight={500} noWrap>
              Compra:&nbsp;
            </Typography>
          </Box>
          <Typography component="span" fontWeight={600}>
            <NumericFormat
              value={product.purchasePrice}
              displayType="text"
              thousandSeparator
              prefix="$"
              decimalScale={2}
              fixedDecimalScale
            />
          </Typography>
        </Box>

        {/* Precio de venta */}
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <SellIcon fontSize="small" color="info" sx={{ mr: 1 }} />
            <Typography variant="body2" fontWeight={500} noWrap>
              Venta:&nbsp;
            </Typography>
          </Box>

          <Typography component="span" fontWeight={600}>
            <NumericFormat
              value={product.sellingPrice}
              displayType="text"
              thousandSeparator
              prefix="$"
              decimalScale={2}
              fixedDecimalScale
            />
          </Typography>
        </Box>
      </Stack>
    </CardContent>
  );
};

export default ProductCardContent;
