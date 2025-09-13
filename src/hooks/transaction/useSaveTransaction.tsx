import { useMutation } from '@tanstack/react-query';
import { createTransaction } from 'services/transactionService';
import type { Transaction, ApiResponse, CommonError } from 'types/api';

const useSaveTransaction = () => {
  return useMutation<ApiResponse<Transaction>, CommonError, Transaction>({
    mutationFn: createTransaction,
  });
};

export default useSaveTransaction;
