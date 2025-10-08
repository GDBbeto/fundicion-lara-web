import React from 'react';
import { Box, Grid, Divider } from '@mui/material';

import type { OrderTransaction } from 'types/api';

import ProductHeader from './ProductHeader';
import GeneralInfoSection from './GeneralInfoSection';
import PricesSection from './PricesSection';
import PaymentStatusSection from './PaymentStatusSection';
import DescriptionSection from './DescriptionSection';

interface OrderTransactionDetailProps {
  transaction: OrderTransaction;
}

const OrderTransactionDetail = ({
  transaction,
}: OrderTransactionDetailProps) => {
  return (
    <Box>
      {/* Header con producto */}
      <ProductHeader transaction={transaction} />

      {/* Grid de información en 3 columnas (desktop) / stack (móvil) */}
      <Grid container spacing={{ xs: 1.5, sm: 1.5 }} mb={{ xs: 1.5, sm: 2 }}>
        {/* Información General */}
        <Grid size={{ xs: 12, md: 4 }}>
          <GeneralInfoSection transaction={transaction} />
        </Grid>

        {/* Montos y Precios */}
        <Grid size={{ xs: 12, md: 4 }}>
          <PricesSection transaction={transaction} />
        </Grid>

        {/* Estados y Monto Pagado */}
        <Grid size={{ xs: 12, md: 4 }}>
          <PaymentStatusSection transaction={transaction} />
        </Grid>
      </Grid>

      {/* Divider sutil antes de la descripción (solo si hay descripción) */}
      {transaction.description && (
        <Divider sx={{ mb: { xs: 1.5, sm: 2 }, opacity: 0.2 }} />
      )}

      {/* Descripción (si existe) */}
      {transaction.description && (
        <DescriptionSection description={transaction.description} />
      )}
    </Box>
  );
};

export default OrderTransactionDetail;
