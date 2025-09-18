import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import FileUploadLayout from 'components/shared/FileUploadLayout';
import { extractInvoiceData } from 'services/invoiceService';
import type { InvoiceData } from 'types/api';
import { useErrorHandler } from 'hooks';

interface Props {
  onExtract: (data: InvoiceData) => void;
}

const InvoiceFileUpload = ({ onExtract }: Props) => {
  const [loading, setLoading] = useState(false);
  const { showError } = useErrorHandler();

  const handleUpload = async (file: File) => {
    setLoading(true);
    try {
      const result = await extractInvoiceData(file);
      onExtract(result.data);
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="subtitle1" mb={2}>
        Subir factura (opcional)
      </Typography>
      <FileUploadLayout
        onUpload={handleUpload}
        accept=".pdf"
        loading={loading}
        validateFile={(file) => {
          if (!file.name.endsWith('.pdf')) {
            return 'Solo se permiten archivos PDF';
          }
          return null;
        }}
        dragText={'Arrastra y suelta un archivo PDF aqu\u00ED'}
        buttonText="Seleccionar PDF"
      />
    </Box>
  );
};

export default InvoiceFileUpload;
