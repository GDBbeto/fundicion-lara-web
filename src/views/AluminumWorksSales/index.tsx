import React from 'react';

import TransactionProvider from 'context/transaction/TransactionContext';
import TransactionTotalCard from 'components/Transactions/TransactionTotalCard';

import SalesToolbar from './components/SalesToolbar';
import SalesList from './components/SalesList';

const AluminumWorksSales = () => {
  return (
    <TransactionProvider type="SALE">
      <TransactionTotalCard title="Total de ventas en el periodo seleccionado" />
      <SalesToolbar />
      <SalesList />
    </TransactionProvider>
  );
};

export default AluminumWorksSales;
