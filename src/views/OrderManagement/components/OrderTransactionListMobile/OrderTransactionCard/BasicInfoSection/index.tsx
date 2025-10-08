import React from 'react';
import { Grid } from '@mui/material';
import { Receipt, Person, CreditCard } from '@mui/icons-material';

import type { OrderTransaction } from 'types/api';
import { getMethodPaymentOption } from 'utils/catalogs';
import InfoRow from '../InfoRow';

interface BasicInfoSectionProps {
  transaction: OrderTransaction;
}

const BasicInfoSection = ({ transaction }: BasicInfoSectionProps) => (
  <Grid container spacing={1.5} mb={1.5}>
    <Grid size={{ xs: 12 }}>
      <InfoRow
        icon={<Person fontSize="small" />}
        label="Cliente"
        value={transaction.client || 'Sin cliente'}
      />
    </Grid>
    <Grid size={{ xs: 6 }}>
      <InfoRow
        icon={<Receipt fontSize="small" />}
        label="Folio"
        value={transaction.invoiceNumber || 'N/A'}
      />
    </Grid>
    <Grid size={{ xs: 6 }}>
      <InfoRow
        icon={<CreditCard fontSize="small" />}
        label="Método"
        value={
          getMethodPaymentOption(transaction.methodPayment)?.label?.split(
            ' ',
          )[0] || 'N/A'
        }
      />
    </Grid>
  </Grid>
);

export default BasicInfoSection;
