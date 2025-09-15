import React, { useRef } from 'react';
import {
  IconButton,
  Box,
  CircularProgress,
  Tooltip,
  useTheme,
} from '@mui/material';
import UploadIcon from '@mui/icons-material/PhotoCamera';

interface Props {
  onUpload: (file: File) => void;
  handleOpenModal?: () => void;
  loading?: boolean;
}

const MobileUploader = ({
  onUpload,
  loading = false,
  handleOpenModal,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();

  const handleClick = () => {
    if (handleOpenModal) {
      handleOpenModal();
      return;
    }
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <Box
      position="absolute"
      top={8}
      right={8}
      bgcolor="white"
      borderRadius="50%"
      boxShadow={3}
      zIndex={2}
    >
      <input
        type="file"
        accept="image/*"
        hidden
        ref={inputRef}
        onChange={handleFileChange}
      />

      <Tooltip title="Cambiar imagen">
        <span>
          <IconButton
            onClick={handleClick}
            disabled={loading}
            size="small"
            sx={{
              transition: 'background-color 0.3s',
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            {loading ? <CircularProgress size={24} /> : <UploadIcon />}
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
};

export default MobileUploader;
