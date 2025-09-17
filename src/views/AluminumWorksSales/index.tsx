import React from 'react';
import TransactionProvider from 'context/transaction/TransactionContext';
import SalesToolbar from './components/SalesToolbar';

const AluminumWorksSales = () => {
  return (
    <TransactionProvider type="SALE">
      <SalesToolbar />
    </TransactionProvider>
  );
};

export default AluminumWorksSales;
