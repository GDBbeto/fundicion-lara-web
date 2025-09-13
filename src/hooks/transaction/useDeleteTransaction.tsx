import { useMutation } from '@tanstack/react-query';
import { deleteTransaction } from 'services/transactionService';
import type { ApiResponse, CommonError } from 'types/api';

const useDeleteTransaction = () => {
  return useMutation<ApiResponse<string>, CommonError, number>({
    mutationFn: (transactionId) => deleteTransaction(transactionId),
  });
};

export default useDeleteTransaction;
