import React from 'react';
import OrderTransactionProvider from './context';
import OrderTransactionToolbar from './components/OrderTransactionToolbar';
import OrderTransactionList from './components/OrderTransactionList';

const OrderManagement = () => {
  return (
    <OrderTransactionProvider>
      <OrderTransactionToolbar />
      <OrderTransactionList />
    </OrderTransactionProvider>
  );
};

export default OrderManagement;
