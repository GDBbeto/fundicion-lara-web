// src/services/invoiceService.ts

import { InvoiceData, ApiResponse } from 'types/api';
import api from './api';
import { INVOICE_API_BASE } from './apiRoutes';

export const extractInvoiceData = async (
  file: File,
): Promise<ApiResponse<InvoiceData>> => {
  const formData = new FormData();
  formData.append('file', file);

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
