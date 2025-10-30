import React, { useEffect, useMemo, useState } from 'react';

import { Box, Typography, Paper, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import FileUploadLayout from 'components/shared/FileUploadLayout';

import { extractInvoiceData } from 'services/invoiceService';

import type { InvoiceData, Transaction } from 'types/api';

import { useErrorHandler, useDevice } from 'hooks';

import ExtractedDataSuggestions from './ExtractedDataSuggestions';

interface Props {
  onExtract: (data: InvoiceData) => void;
  type: 'SALE' | 'PURCHASE' | 'EXPENSE';
  onFillField: (field: keyof Transaction, value: string | number) => void;
  onClearFields: () => void;
}

const InvoiceFileUpload = ({
  onExtract,
  onFillField,
  onClearFields,
  type,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<InvoiceData | null>(null);
  const [showUploader, setShowUploader] = useState(true);

  const { showError } = useErrorHandler();
  const { isSmallScreen } = useDevice();

  const hasSuggestions = useMemo(
    () => !!extractedData?.pdfInfoFallback,
    [extractedData],
  );

  useEffect(() => {
    // En pantallas pequeñas, ocultar el cargador cuando existan sugerencias
    if (isSmallScreen && hasSuggestions) {
      setShowUploader(false);
    }
  }, [isSmallScreen, hasSuggestions]);

  const handleUpload = async (file: File) => {
    setLoading(true);
    setUploadError(null);
    setExtractedData(null);

    // Limpiar los campos antes de extraer datos
    onClearFields();

    try {
      const result = await extractInvoiceData(file, type);
      onExtract(result.data);
      setExtractedData(result.data);
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
      {(showUploader || !isSmallScreen || !hasSuggestions) && (
        <>
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
              isSmallScreen
                ? undefined
                : 'Arrastra y suelta un archivo PDF aqu\u00ED'
            }
            buttonText="Seleccionar PDF"
            disableDragAndDrop={isSmallScreen}
          />
        </>
      )}

      {/* Acción para volver a cargar en móvil cuando hay sugerencias */}
      {!showUploader && isSmallScreen && hasSuggestions && (
        <Box mt={1}>
          <Button
            variant="outlined"
            size="small"
            fullWidth
            onClick={() => {
              setShowUploader(true);
              setExtractedData(null);
              onClearFields();
            }}
            startIcon={<CloudUploadIcon />}
          >
            Cargar otro archivo
          </Button>
        </Box>
      )}

      {extractedData && (
        <ExtractedDataSuggestions data={extractedData} onSelect={onFillField} />
      )}

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
