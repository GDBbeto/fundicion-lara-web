import { useMutation } from '@tanstack/react-query';
import { uploadProductImage } from 'services/productService';
import type { CommonError, ApiResponse } from 'types/api';

interface UploadParams {
  productId: number;
  file: File;
}

const useUploadProductImage = () => {
  return useMutation<ApiResponse<string>, CommonError, UploadParams>({
    mutationFn: ({ productId, file }) => uploadProductImage(productId, file),
  });
};

export default useUploadProductImage;
