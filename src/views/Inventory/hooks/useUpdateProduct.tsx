import { useMutation } from '@tanstack/react-query';
import { updateProduct } from 'services/productService';
import type { Product, CommonError, ApiResponse } from 'types/api';

const useUpdateProduct = () => {
  return useMutation<ApiResponse<Product>, CommonError, Product>({
    mutationFn: (product) => updateProduct(product.productId, product),
  });
};

export default useUpdateProduct;
