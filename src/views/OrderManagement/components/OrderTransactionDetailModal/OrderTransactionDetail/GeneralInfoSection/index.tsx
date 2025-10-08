import React from 'react';
import { Paper, Typography, Stack, Grid } from '@mui/material';
import {
  CalendarToday,
  Person,
  Receipt,
  CreditCard,
} from '@mui/icons-material';

import type { OrderTransaction } from 'types/api';
import { colors } from 'commons/colors';
import { formatDateToDisplay } from 'utils/dateUtils';
import { getMethodPaymentOption } from 'utils/catalogs';
import InfoItem from '../InfoItem';

interface GeneralInfoSectionProps {
  transaction: OrderTransaction;
}

const GeneralInfoSection = ({ transaction }: GeneralInfoSectionProps) => (
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
      Información General
    </Typography>
    <Stack spacing={{ xs: 1, sm: 1 }}>
      {/* En móvil, usar grid de 2 columnas para algunos campos */}
      <Grid container spacing={1} sx={{ display: { xs: 'flex', sm: 'none' } }}>
        <Grid size={{ xs: 12 }}>
          <InfoItem
            icon={<CalendarToday sx={{ fontSize: 16 }} />}
            label="Fecha"
            value={formatDateToDisplay(transaction.operationDate)}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <InfoItem
            icon={<Person sx={{ fontSize: 16 }} />}
            label="Cliente"
            value={transaction.client || 'Sin cliente'}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          {transaction.invoiceNumber && (
            <InfoItem
              icon={<Receipt sx={{ fontSize: 16 }} />}
              label="Folio"
              value={transaction.invoiceNumber}
            />
          )}
        </Grid>
        <Grid size={{ xs: 6 }}>
          <InfoItem
            icon={<CreditCard sx={{ fontSize: 16 }} />}
            label="Método"
            value={
              getMethodPaymentOption(transaction.methodPayment)?.label ||
              transaction.methodPayment
            }
          />
        </Grid>
      </Grid>

      {/* En desktop, stack vertical */}
      <Stack spacing={1} sx={{ display: { xs: 'none', sm: 'flex' } }}>
        <InfoItem
          icon={<CalendarToday sx={{ fontSize: 16 }} />}
          label="Fecha"
          value={formatDateToDisplay(transaction.operationDate)}
        />
        <InfoItem
          icon={<Person sx={{ fontSize: 16 }} />}
          label="Cliente"
          value={transaction.client || 'Sin cliente'}
        />
        {transaction.invoiceNumber && (
          <InfoItem
            icon={<Receipt sx={{ fontSize: 16 }} />}
            label="Folio"
            value={transaction.invoiceNumber}
          />
        )}
        <InfoItem
          icon={<CreditCard sx={{ fontSize: 16 }} />}
          label="Método de Pago"
          value={
            getMethodPaymentOption(transaction.methodPayment)?.label ||
            transaction.methodPayment
          }
        />
      </Stack>
    </Stack>
  </Paper>
);

export default GeneralInfoSection;
