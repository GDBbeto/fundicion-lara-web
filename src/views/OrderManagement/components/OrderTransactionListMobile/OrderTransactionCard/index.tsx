import React from 'react';
import { Divider } from '@mui/material';

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
}

const OrderTransactionCard = ({
  transaction,
  index,
  actions,
}: OrderTransactionCardProps) => {
  return (
    <CardLayout fadeIn={true} fadeDelay={index * 100} padding={2}>
      <TransactionHeader transaction={transaction} actions={actions} />
      <ProductSection transaction={transaction} />
      <StatusSection transaction={transaction} />
      <Divider sx={{ mb: 1.5, opacity: 0.3 }} />
      <BasicInfoSection transaction={transaction} />
      <AmountsSection transaction={transaction} />
      <AmountPaidSection transaction={transaction} />
      {transaction.description && (
        <DescriptionSection description={transaction.description} />
      )}
    </CardLayout>
  );
};

export default OrderTransactionCard;
