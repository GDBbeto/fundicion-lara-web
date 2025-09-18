import React from 'react';

import { Box } from '@mui/material';
import FileUploadLayout from 'components/shared/FileUploadLayout';

interface Props {
  imageUrl?: string;
  onUpload: (file: File) => void;
  loading?: boolean;
}

const DesktopUploader = ({ imageUrl, onUpload, loading = false }: Props) => {
  const validateImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      return 'Solo se permiten archivos de imagen (JPG, PNG, etc).';
    }
    return null;
  };

  return (
    <FileUploadLayout
      accept="image/*"
      onUpload={onUpload}
      loading={loading}
      validateFile={validateImageFile}
      dragText={'Arrastra y suelta una imagen aqu\u00ED'}
      buttonText={'Seleccionar imagen'}
    >
      {imageUrl && (
        <Box
          component="img"
          src={imageUrl}
          alt="Vista previa"
          sx={{ maxWidth: '100%', maxHeight: 200, mb: 2 }}
        />
      )}
    </FileUploadLayout>
  );
};

export default DesktopUploader;
