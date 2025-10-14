import { useMutation } from '@tanstack/react-query';
import { updateOrderTransaction } from 'services/orderTransactionService';
import type {
  OrderTransaction,
  CommonError,
  ApiResponse,
  OrderTransactionRequest,
} from 'types/api';

const useUpdateOrderTransaction = () => {
  return useMutation<
    ApiResponse<OrderTransaction>,
    CommonError,
    OrderTransactionRequest
  >({
    mutationFn: (orderTransaction) =>
      updateOrderTransaction(
        orderTransaction.orderTransactionId,
        orderTransaction,
      ),
  });
};

export default useUpdateOrderTransaction;
