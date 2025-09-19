import React from 'react';
import TransactionProvider from 'context/transaction/TransactionContext';
import SalesToolbar from './components/SalesToolbar';
import SalesList from './components/SalesList';

const AluminumWorksSales = () => {
  return (
    <TransactionProvider type="SALE">
      <SalesToolbar />
      <SalesList />
    </TransactionProvider>
  );
};

export default AluminumWorksSales;
