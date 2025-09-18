import React from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { BACKGROUND_COLOR } from 'commons/colors';

interface CustomModalProps {
  open: boolean;
  title: string;
  handleClose: () => void;
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  titleAlign?: 'left' | 'center';
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  title,
  handleClose,
  children,
  titleAlign,
  maxWidth = 'sm',
  fullWidth = true,
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      aria-labelledby="customized-dialog-title"
      PaperProps={{
        sx: {
          borderRadius: 3,
          padding: 2,
          backgroundColor: theme.palette.background.paper,
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: BACKGROUND_COLOR,
        },
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={1.5}
      >
        <DialogTitle
          id="customized-dialog-title"
          sx={{
            p: 0,
            fontWeight: 600,
            flexGrow: 1,
            textAlign: titleAlign || 'left',
          }}
        >
          {title}
        </DialogTitle>

        {titleAlign !== 'center' && (
          <IconButton aria-label="close" onClick={handleClose} color="primary">
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <DialogContent dividers sx={{ mt: 1 }}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
