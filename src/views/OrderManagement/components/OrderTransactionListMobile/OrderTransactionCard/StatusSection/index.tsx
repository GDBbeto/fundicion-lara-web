import React from 'react';
import { Box, Typography, Stack, Chip, Grid } from '@mui/material';
import { Payment, LocalShipping } from '@mui/icons-material';

import type { OrderTransaction } from 'types/api';
import {
  getDeliveryStatusOption,
  getPaymentStatusOption,
  getPaymentStatusColor,
  getDeliveryStatusColor,
} from 'utils/catalogs';
import { colors } from 'commons/colors';

interface StatusSectionProps {
  transaction: OrderTransaction;
}

const StatusSection = ({ transaction }: StatusSectionProps) => (
  <Grid container spacing={1.5} mb={1.5}>
    {/* Estado de Pago */}
    <Grid size={{ xs: 6 }}>
      <Box
        sx={{
          bgcolor: colors.lightBlue + '08',
          border: `1px solid ${colors.lightBlue}30`,
          borderRadius: 2,
          p: 1.5,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.8,
        }}
      >
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Payment sx={{ fontSize: 16, color: colors.darkBlue }} />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              fontSize: '0.7rem',
              fontWeight: 600,
            }}
          >
            Pago
          </Typography>
        </Stack>
        <Chip
          label={
            getPaymentStatusOption(transaction.paymentStatus)?.label ||
            transaction.paymentStatus
          }
          size="small"
          color={getPaymentStatusColor(transaction.paymentStatus) as any}
          variant="filled"
          sx={{
            fontWeight: 600,
            fontSize: '0.7rem',
            width: '100%',
          }}
        />
      </Box>
    </Grid>

    {/* Estado de Entrega */}
    <Grid size={{ xs: 6 }}>
      <Box
        sx={{
          bgcolor: colors.lightBlue + '08',
          border: `1px solid ${colors.lightBlue}30`,
          borderRadius: 2,
          p: 1.5,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.8,
        }}
      >
        <Stack direction="row" spacing={0.5} alignItems="center">
          <LocalShipping sx={{ fontSize: 16, color: colors.darkBlue }} />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              fontSize: '0.7rem',
              fontWeight: 600,
            }}
          >
            Entrega
          </Typography>
        </Stack>
        <Chip
          label={
            getDeliveryStatusOption(transaction.deliveryStatus)?.label ||
            transaction.deliveryStatus
          }
          size="small"
          color={getDeliveryStatusColor(transaction.deliveryStatus)}
          variant="outlined"
          sx={{
            fontWeight: 600,
            fontSize: '0.7rem',
            width: '100%',
          }}
        />
      </Box>
    </Grid>
  </Grid>
);

export default StatusSection;
