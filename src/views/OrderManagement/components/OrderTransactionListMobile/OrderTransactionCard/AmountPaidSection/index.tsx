import React from 'react';
import { Box, Typography } from '@mui/material';
import { NumericFormat } from 'react-number-format';

import type { OrderTransaction } from 'types/api';
import { colors } from 'commons/colors';

interface AmountPaidSectionProps {
  transaction: OrderTransaction;
}

const AmountPaidSection = ({ transaction }: AmountPaidSectionProps) => (
  <Box
    sx={{
      bgcolor: `linear-gradient(135deg, ${colors.darkBlue}08 0%, ${colors.lightBlue}08 100%)`,
      border: `2px solid ${colors.darkBlue}30`,
      borderRadius: 2,
      p: 1.5,
      mb: transaction.description ? 1.5 : 0,
      textAlign: 'center',
    }}
  >
    <Typography
      variant="caption"
      color="text.secondary"
      fontWeight={600}
      sx={{ display: 'block', fontSize: '0.7rem', mb: 0.5 }}
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
          variant="h5"
          fontWeight={800}
          sx={{
            background: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.lightBlue} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {value}
        </Typography>
      )}
    />
  </Box>
);

export default AmountPaidSection;
