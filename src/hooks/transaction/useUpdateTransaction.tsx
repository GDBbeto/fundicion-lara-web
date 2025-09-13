import { useMutation } from '@tanstack/react-query';
import { updateTransaction } from 'services/transactionService';
import type { Transaction, ApiResponse, CommonError } from 'types/api';

const useUpdateTransaction = () => {
  return useMutation<ApiResponse<Transaction>, CommonError, Transaction>({
    mutationFn: (transaction) =>
      updateTransaction(transaction.transactionId, transaction),
  });
};

export default useUpdateTransaction;
