import React, { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import FileUploadLayout from 'components/shared/FileUploadLayout';
import { extractInvoiceData } from 'services/invoiceService';
import type { InvoiceData } from 'types/api';
import { useErrorHandler, useDevice } from 'hooks';

interface Props {
  onExtract: (data: InvoiceData) => void;
}

const InvoiceFileUpload = ({ onExtract }: Props) => {
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const { showError } = useErrorHandler();
  const { isScreenSmall } = useDevice();

  const handleUpload = async (file: File) => {
    setLoading(true);
    setUploadError(null);

    try {
      const result = await extractInvoiceData(file);
      onExtract(result.data);
    } catch (error) {
      showError(error);
      setUploadError(
        'No pudimos obtener la informaci\u00F3n. Por favor, int\u00E9ntalo nuevamente o completa los datos manualmente.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="subtitle1" mb={2}>
        Subir factura (opcional)
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={2}>
        Al subir un archivo PDF, algunos campos se completar&aacute;n
        autom&aacute;ticamente con la informaci&oacute;n extra&iacute;da.
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
        dragText={
          isScreenSmall
            ? undefined
            : 'Arrastra y suelta un archivo PDF aqu\u00ED'
        }
        buttonText="Seleccionar PDF"
        disableDragAndDrop={isScreenSmall}
      />

      {uploadError && (
        <Paper
          elevation={0}
          sx={{
            mt: 2,
            p: 2,
            borderRadius: 2,
            bgcolor: 'warning.light',
            color: 'warning.contrastText',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" fontWeight="medium">
            {uploadError}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default InvoiceFileUpload;
