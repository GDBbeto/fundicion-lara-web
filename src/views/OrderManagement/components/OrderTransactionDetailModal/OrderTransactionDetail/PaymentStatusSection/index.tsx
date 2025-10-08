import React from 'react';
import { Paper, Typography, Stack, Box, Chip, Grid } from '@mui/material';
import { Payment, LocalShipping } from '@mui/icons-material';
import { NumericFormat } from 'react-number-format';

import type { OrderTransaction } from 'types/api';
import { colors } from 'commons/colors';
import {
  getDeliveryStatusOption,
  getPaymentStatusOption,
  getPaymentStatusColor,
  getDeliveryStatusColor,
} from 'utils/catalogs';

interface PaymentStatusSectionProps {
  transaction: OrderTransaction;
}

const PaymentStatusSection = ({ transaction }: PaymentStatusSectionProps) => (
  <Paper
    elevation={0}
    sx={{
      p: { xs: 1.5, sm: 1.5 },
      border: `1px solid ${colors.lightBlue}30`,
      borderRadius: 2,
      height: '100%',
    }}
  >
    <Typography
      variant="caption"
      fontWeight={700}
      sx={{
        mb: { xs: 1, sm: 1 },
        color: colors.darkBlue,
        display: 'block',
        fontSize: { xs: '0.7rem', sm: '0.75rem' },
      }}
    >
      Estados y Pagos
    </Typography>
    <Stack spacing={{ xs: 1, sm: 1 }}>
      {/* Monto Pagado */}
      <Box
        sx={{
          p: { xs: 1, sm: 1 },
          background: `linear-gradient(135deg, ${colors.darkBlue}08 0%, ${colors.lightBlue}08 100%)`,
          borderRadius: 1,
          textAlign: 'center',
          border: `1px solid ${colors.darkBlue}20`,
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
          fontWeight={600}
          display="block"
          mb={0.3}
          sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}
        >
          MONTO PAGADO
        </Typography>
        <NumericFormat
          value={transaction.amountPaid || 0}
          displayType="text"
          thousandSeparator=","
          prefix="$"
          decimalScale={2}
          fixedDecimalScale
          renderText={(value) => (
            <Typography
              variant="h6"
              fontWeight={800}
              sx={{
                background: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.lightBlue} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
              }}
            >
              {value}
            </Typography>
          )}
        />
      </Box>

      {/* Estados en Grid para móvil, Stack para desktop */}
      <Grid container spacing={1} sx={{ display: { xs: 'flex', sm: 'none' } }}>
        <Grid size={{ xs: 6 }}>
          <Box
            sx={{
              bgcolor: colors.lightBlue + '08',
              border: `1px solid ${colors.lightBlue}30`,
              borderRadius: 1.5,
              p: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.6,
            }}
          >
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Payment sx={{ fontSize: 14, color: colors.darkBlue }} />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: '0.65rem', fontWeight: 600 }}
              >
                Pago
              </Typography>
            </Stack>
            <Chip
              label={
                getPaymentStatusOption(transaction.paymentStatus)?.label ||
                transaction.paymentStatus
              }
              color={getPaymentStatusColor(transaction.paymentStatus)}
              variant="filled"
              size="small"
              sx={{
                fontWeight: 600,
                fontSize: '0.65rem',
                height: 20,
                width: '100%',
              }}
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Box
            sx={{
              bgcolor: colors.lightBlue + '08',
              border: `1px solid ${colors.lightBlue}30`,
              borderRadius: 1.5,
              p: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.6,
            }}
          >
            <Stack direction="row" spacing={0.5} alignItems="center">
              <LocalShipping sx={{ fontSize: 14, color: colors.darkBlue }} />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: '0.65rem', fontWeight: 600 }}
              >
                Entrega
              </Typography>
            </Stack>
            <Chip
              label={
                getDeliveryStatusOption(transaction.deliveryStatus)?.label ||
                transaction.deliveryStatus
              }
              color={getDeliveryStatusColor(transaction.deliveryStatus)}
              variant="outlined"
              size="small"
              sx={{
                fontWeight: 600,
                fontSize: '0.65rem',
                height: 20,
                width: '100%',
              }}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Estados en Stack para desktop */}
      <Stack spacing={1} sx={{ display: { xs: 'none', sm: 'flex' } }}>
        {/* Estado de Pago */}
        <Box>
          <Stack direction="row" spacing={0.5} alignItems="center" mb={0.5}>
            <Payment sx={{ fontSize: 14, color: colors.darkBlue }} />
            <Typography
              variant="caption"
              color="text.secondary"
              fontSize="0.7rem"
            >
              Estado de Pago
            </Typography>
          </Stack>
          <Chip
            label={
              getPaymentStatusOption(transaction.paymentStatus)?.label ||
              transaction.paymentStatus
            }
            color={getPaymentStatusColor(transaction.paymentStatus)}
            variant="filled"
            size="small"
            sx={{ fontWeight: 600, fontSize: '0.7rem', height: 22 }}
          />
        </Box>

        {/* Estado de Entrega */}
        <Box>
          <Stack direction="row" spacing={0.5} alignItems="center" mb={0.5}>
            <LocalShipping sx={{ fontSize: 14, color: colors.darkBlue }} />
            <Typography
              variant="caption"
              color="text.secondary"
              fontSize="0.7rem"
            >
              Estado de Entrega
            </Typography>
          </Stack>
          <Chip
            label={
              getDeliveryStatusOption(transaction.deliveryStatus)?.label ||
              transaction.deliveryStatus
            }
            color={getDeliveryStatusColor(transaction.deliveryStatus)}
            variant="outlined"
            size="small"
            sx={{ fontWeight: 600, fontSize: '0.7rem', height: 22 }}
          />
        </Box>
      </Stack>
    </Stack>
  </Paper>
);

export default PaymentStatusSection;
