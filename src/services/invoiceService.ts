import { InvoiceData, ApiResponse } from 'types/api';
import api from './api';
import { INVOICE_API_BASE } from './apiRoutes';

export const extractInvoiceData = async (
  file: File,
  transactionType: string,
): Promise<ApiResponse<InvoiceData>> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('transactionType', transactionType);

  const response = await api.post<ApiResponse<InvoiceData>>(
    `${INVOICE_API_BASE}/extract`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};
