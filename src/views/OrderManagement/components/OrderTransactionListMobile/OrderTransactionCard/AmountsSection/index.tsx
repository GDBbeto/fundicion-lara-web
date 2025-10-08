import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { NumericFormat } from 'react-number-format';

import type { OrderTransaction } from 'types/api';
import { colors } from 'commons/colors';

interface AmountsSectionProps {
  transaction: OrderTransaction;
}

const AmountsSection = ({ transaction }: AmountsSectionProps) => (
  <Box
    sx={{
      bgcolor: colors.lightBlue + '10',
      borderRadius: 2,
      p: 1.5,
      mb: 1.5,
    }}
  >
    <Grid container spacing={1}>
      <Grid size={{ xs: 6 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', fontSize: '0.65rem', mb: 0.3 }}
        >
          P. Compra
        </Typography>
        <NumericFormat
          value={transaction.purchasePrice || 0}
          displayType="text"
          thousandSeparator=","
          prefix="$"
          decimalScale={2}
          fixedDecimalScale
          renderText={(value) => (
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{ fontSize: '0.75rem', color: colors.darkText }}
            >
              {value}
            </Typography>
          )}
        />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', fontSize: '0.65rem', mb: 0.3 }}
        >
          P. Venta
        </Typography>
        <NumericFormat
          value={transaction.sellingPrice || 0}
          displayType="text"
          thousandSeparator=","
          prefix="$"
          decimalScale={2}
          fixedDecimalScale
          renderText={(value) => (
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{ fontSize: '0.75rem', color: colors.darkText }}
            >
              {value}
            </Typography>
          )}
        />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', fontSize: '0.65rem', mb: 0.3 }}
        >
          Ganancia
        </Typography>
        <NumericFormat
          value={transaction.profit || 0}
          displayType="text"
          thousandSeparator=","
          prefix="$"
          decimalScale={2}
          fixedDecimalScale
          renderText={(value) => (
            <Typography
              variant="body2"
              fontWeight={700}
              sx={{
                fontSize: '0.75rem',
                color: transaction.profit > 0 ? colors.green : colors.red,
              }}
            >
              {value}
            </Typography>
          )}
        />
      </Grid>
      {transaction.extraAmount > 0 && (
        <Grid size={{ xs: 6 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', fontSize: '0.65rem', mb: 0.3 }}
          >
            Extra
          </Typography>
          <NumericFormat
            value={transaction.extraAmount}
            displayType="text"
            thousandSeparator=","
            prefix="$"
            decimalScale={2}
            fixedDecimalScale
            renderText={(value) => (
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{ fontSize: '0.75rem', color: colors.darkText }}
              >
                {value}
              </Typography>
            )}
          />
        </Grid>
      )}
    </Grid>
  </Box>
);

export default AmountsSection;
