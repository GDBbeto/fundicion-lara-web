import { useMutation } from '@tanstack/react-query';
import { deleteProduct } from 'services/productService';
import type { CommonError, ApiResponse } from 'types/api';

const useDeleteProduct = () => {
  return useMutation<ApiResponse<string>, CommonError, number>({
    mutationFn: (productId) => deleteProduct(productId),
  });
};

export default useDeleteProduct;
