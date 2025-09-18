import React, { useCallback, useRef, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  useTheme,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface Props {
  onUpload: (file: File) => void;
  accept?: string;
  loading?: boolean;
  children?: React.ReactNode;
  validateFile?: (file: File) => string | null;
  dragText?: string;
  buttonText?: string;
}

const FileUploadLayout = ({
  onUpload,
  accept = '*/*',
  loading = false,
  children,
  validateFile,
  dragText = 'Arrastra y suelta un archivo aqu\u00ED',
  buttonText = 'Seleccionar archivo',
}: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();

  const handleFile = useCallback(
    (file: File) => {
      const validationError = validateFile?.(file);

      if (validationError) {
        setError(validationError);
        return;
      }

      setError(null);
      onUpload(file);
    },
    [validateFile, onUpload],
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  return (
    <Box
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      sx={{
        border: `2px dashed ${isDragging ? theme.palette.primary.main : theme.palette.grey[400]}`,
        padding: 3,
        textAlign: 'center',
        borderRadius: 2,
        position: 'relative',
        backgroundColor: isDragging ? theme.palette.grey[100] : 'transparent',
        transition: 'border 0.2s, background-color 0.2s',
      }}
    >
      <input
        type="file"
        accept={accept}
        hidden
        ref={inputRef}
        onChange={handleFileChange}
      />

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {children}

          <CloudUploadIcon color="action" sx={{ fontSize: 48, mb: 1 }} />

          <Typography variant="body1">{dragText}</Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            o
          </Typography>

          <Button variant="outlined" onClick={() => inputRef.current?.click()}>
            {buttonText}
          </Button>

          {error && (
            <Typography color="error" mt={2}>
              {error}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default FileUploadLayout;
