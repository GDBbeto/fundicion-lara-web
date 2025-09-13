import { useContext } from 'react';
import { TransactionContext } from 'context/transaction/TransactionContext';
import { TransactionContextType } from 'context/transaction/types';

const useTransactions = (): TransactionContextType => {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error(
      'useTransactions debe usarse dentro de un <TransactionProvider>',
    );
  }

  return context;
};

export default useTransactions;
