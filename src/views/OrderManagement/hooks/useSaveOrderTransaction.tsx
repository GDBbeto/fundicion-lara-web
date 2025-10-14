import { useMutation } from '@tanstack/react-query';
import { createOrderTransaction } from 'services/orderTransactionService';
import type {
  OrderTransaction,
  ApiResponse,
  CommonError,
  OrderTransactionRequest,
} from 'types/api';

const useSaveOrderTransaction = () => {
  return useMutation<
    ApiResponse<OrderTransaction>,
    CommonError,
    OrderTransactionRequest
  >({
    mutationFn: createOrderTransaction,
  });
};

export default useSaveOrderTransaction;
