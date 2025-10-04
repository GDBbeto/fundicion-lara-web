import { useContext } from 'react';
import { OrderTransactionContext } from '../context';

const useOrderTransactions = () => {
  const context = useContext(OrderTransactionContext);

  if (!context) {
    throw new Error(
      'useOrderTransactionContext debe usarse dentro de un OrderTransactionProvider',
    );
  }

  return context;
};

export default useOrderTransactions;
