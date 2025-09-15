import { useMutation } from '@tanstack/react-query';
import { createProduct } from 'services/productService';
import type { Product, ApiResponse, CommonError } from 'types/api';

const useSaveProduct = () => {
  return useMutation<ApiResponse<Product>, CommonError, Product>({
    mutationFn: createProduct,
  });
};

export default useSaveProduct;
