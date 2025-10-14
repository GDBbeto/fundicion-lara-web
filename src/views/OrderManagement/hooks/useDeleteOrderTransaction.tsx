import { useMutation } from '@tanstack/react-query';
import { deleteOrderTransaction } from 'services/orderTransactionService';
import type { CommonError, ApiResponse } from 'types/api';

const useDeleteOrderTransaction = () => {
  return useMutation<ApiResponse<string>, CommonError, number>({
    mutationFn: (orderTransactionId) =>
      deleteOrderTransaction(orderTransactionId),
  });
};

export default useDeleteOrderTransaction;
