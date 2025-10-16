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
      <Grid size={{ xs: 12 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: 'inline-block',
            fontSize: '0.7rem',
            fontWeight: 600,
            mb: 0.3,
          }}
        >
          Cargo adicional:
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
              variant="body1"
              fontWeight={600}
              sx={{
                pl: 2,
                fontSize: '1rem',
                color: colors.darkText,
                display: 'inline-block',
              }}
            >
              {value}
            </Typography>
          )}
        />
      </Grid>
    </Grid>
  </Box>
);

export default AmountsSection;
