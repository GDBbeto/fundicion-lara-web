import { Product, ApiResponse } from 'types/api';

import api from './api';
import { PRODUCT_API_BASE } from './apiRoutes';

interface ProductQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  order?: 'asc' | 'desc';
  orderBy?: keyof Product; // ejemplo: 'productId', 'name', etc.
}

export const getProducts = async (
  params: ProductQueryParams,
): Promise<ApiResponse<Product[]>> => {
  const response = await api.get<ApiResponse<Product[]>>(PRODUCT_API_BASE, {
    params,
  });
  return response.data;
};

export const getProductById = async (productId: number) => {
  const response = await api.get<ApiResponse<Product>>(
    `${PRODUCT_API_BASE}/${productId}`,
  );
  return response.data;
};

export const createProduct = async (product: Product) => {
  const response = await api.post<ApiResponse<Product>>(
    PRODUCT_API_BASE,
    product,
  );
  return response.data;
};

export const updateProduct = async (productId: number, product: Product) => {
  const response = await api.put<ApiResponse<Product>>(
    `${PRODUCT_API_BASE}/${productId}`,
    product,
  );
  return response.data;
};

export const deleteProduct = async (productId: number) => {
  const response = await api.delete<ApiResponse<string>>(
    `${PRODUCT_API_BASE}/${productId}`,
  );
  return response.data;
};

export const uploadProductImage = async (productId: number, file: File) => {
  console.log({ file });
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post<ApiResponse<string>>(
    `${PRODUCT_API_BASE}/${productId}/upload`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};
