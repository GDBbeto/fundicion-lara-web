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
  disableDragAndDrop?: boolean;
}

const FileUploadLayout = ({
  onUpload,
  accept = '*/*',
  loading = false,
  children,
  validateFile,
  dragText = 'Arrastra y suelta un archivo aquí',
  buttonText = 'Seleccionar archivo',
  disableDragAndDrop = false,
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
      onDragOver={
        disableDragAndDrop
          ? undefined
          : (e) => {
              e.preventDefault();
              setIsDragging(true);
            }
      }
      onDragLeave={disableDragAndDrop ? undefined : () => setIsDragging(false)}
      onDrop={disableDragAndDrop ? undefined : handleDrop}
      sx={{
        border: `2px dashed ${
          disableDragAndDrop
            ? theme.palette.grey[300] // Borde suave en mobile
            : isDragging
              ? theme.palette.primary.main
              : theme.palette.grey[400]
        }`,
        padding: 2,
        textAlign: 'center',
        borderRadius: 2,
        position: 'relative',
        backgroundColor: isDragging
          ? theme.palette.grey[100]
          : theme.palette.background.paper,
        transition: 'border 0.2s, background-color 0.2s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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

          <CloudUploadIcon color="action" sx={{ fontSize: 40, mb: 1 }} />

          {!disableDragAndDrop && (
            <>
              <Typography variant="body1">{dragText}</Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                o
              </Typography>
            </>
          )}

          <Button
            id="selectButton"
            variant="outlined"
            size="small"
            onClick={() => inputRef.current?.click()}
          >
            {buttonText}
          </Button>

          {error && (
            <Typography color="error" mt={2} variant="caption">
              {error}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default FileUploadLayout;
