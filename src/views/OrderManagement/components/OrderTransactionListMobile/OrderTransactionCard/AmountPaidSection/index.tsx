import React from 'react';
import { Box, Typography, Grid, Stack } from '@mui/material';
import { MonetizationOn, Paid } from '@mui/icons-material';
import { NumericFormat } from 'react-number-format';

import type { OrderTransaction } from 'types/api';
import { colors } from 'commons/colors';

interface AmountPaidSectionProps {
  transaction: OrderTransaction;
}

const AmountPaidSection = ({ transaction }: AmountPaidSectionProps) => (
  <Grid container spacing={1.5} mb={1.5}>
    {/* Total */}
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
          <MonetizationOn sx={{ fontSize: 16, color: colors.darkBlue }} />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: '0.7rem', fontWeight: 600 }}
          >
            Total
          </Typography>
        </Stack>
        <NumericFormat
          value={
            transaction.itemCount * transaction.sellingPrice +
            (transaction.extraAmount || 0)
          }
          displayType="text"
          thousandSeparator=","
          prefix="$"
          decimalScale={2}
          fixedDecimalScale
          renderText={(value) => (
            <Typography
              variant="body1"
              fontWeight={700}
              sx={{
                color: colors.darkBlue,
                fontSize: '1rem',
              }}
            >
              {value}
            </Typography>
          )}
        />
      </Box>
    </Grid>

    {/* Monto Pagado */}
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
          <Paid sx={{ fontSize: 16, color: colors.darkBlue }} />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: '0.7rem', fontWeight: 600 }}
          >
            Monto Pagado
          </Typography>
        </Stack>
        <NumericFormat
          value={transaction.amountPaid || 0}
          displayType="text"
          thousandSeparator=","
          prefix="$"
          decimalScale={2}
          fixedDecimalScale
          renderText={(value) => (
            <Typography
              variant="body1"
              fontWeight={700}
              sx={{
                color: colors.darkBlue,
                fontSize: '1rem',
              }}
            >
              {value}
            </Typography>
          )}
        />
      </Box>
    </Grid>
  </Grid>
);

export default AmountPaidSection;
