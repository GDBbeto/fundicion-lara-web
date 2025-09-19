import React from 'react';
import TransactionProvider from 'context/transaction/TransactionContext';

import {
  TransactionList,
  TransactionToolbar,
  TransactionTotalCard,
} from 'components/Transactions';

import { columns } from './Columns';

const PurchaseManagement = () => {
  return (
    <TransactionProvider type="PURCHASE" label="Compra">
      <TransactionTotalCard />
      <TransactionToolbar />
      <TransactionList columns={columns} />
    </TransactionProvider>
  );
};

export default PurchaseManagement;
