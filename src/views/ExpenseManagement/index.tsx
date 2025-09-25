import React from 'react';
import TransactionProvider from 'context/transaction/TransactionContext';

import {
  TransactionList,
  TransactionToolbar,
  TransactionTotalCard,
} from 'components/Transactions';

import { columns } from './Columns';

const ExpenseManagement = () => {
  return (
    <TransactionProvider type="EXPENSE" label="Gasto">
      <TransactionTotalCard />
      <TransactionToolbar />
      <TransactionList columns={columns} />
    </TransactionProvider>
  );
};

export default ExpenseManagement;
