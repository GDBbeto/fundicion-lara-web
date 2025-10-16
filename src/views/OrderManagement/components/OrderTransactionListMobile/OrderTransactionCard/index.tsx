import React from 'react';
import { Box, Divider } from '@mui/material';

import type { OrderTransaction } from 'types/api';
import { CardLayout } from 'components/shared';
import type { ActionItem } from 'components/shared/ActionMenu';

import TransactionHeader from './TransactionHeader';
import ProductSection from './ProductSection';
import StatusSection from './StatusSection';
import BasicInfoSection from './BasicInfoSection';
import AmountsSection from './AmountsSection';
import AmountPaidSection from './AmountPaidSection';
import DescriptionSection from './DescriptionSection';

interface OrderTransactionCardProps {
  transaction: OrderTransaction;
  index: number;
  actions: ActionItem[];
  onlyQuery?: boolean;
}

const OrderTransactionCard = ({
  transaction,
  index,
  actions,
  onlyQuery,
}: OrderTransactionCardProps) => {
  if (onlyQuery) {
    return (
      <Box>
        <TransactionHeader transaction={transaction} actions={[]} />
        <ProductSection transaction={transaction} />
        <StatusSection transaction={transaction} />
        <Divider sx={{ mb: 1.5, opacity: 0.3 }} />
        <BasicInfoSection transaction={transaction} />
        <AmountsSection transaction={transaction} />
        <AmountPaidSection transaction={transaction} />
        <DescriptionSection
          description={transaction.description || 'Sin notas'}
        />
      </Box>
    );
  }
  return (
    <CardLayout fadeIn={true} fadeDelay={index * 100} padding={2}>
      <TransactionHeader transaction={transaction} actions={actions} />
      <ProductSection transaction={transaction} />
      <StatusSection transaction={transaction} />
      <Divider sx={{ mb: 1.5, opacity: 0.3 }} />
      <BasicInfoSection transaction={transaction} />
      <AmountsSection transaction={transaction} />
      <AmountPaidSection transaction={transaction} />
      <DescriptionSection
        description={transaction.description || 'Sin notas'}
      />
    </CardLayout>
  );
};

export default OrderTransactionCard;
