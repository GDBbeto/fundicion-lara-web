import React from 'react';

import { Box, Button, Typography, Paper } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import CustomModal from '../CustomModal';

interface DeleteConfirmationModalProps {
  open: boolean;
  handleClose: () => void;
  onConfirm: () => void;
  confirmMessage: string;
  title: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  open,
  handleClose,
  onConfirm,
  confirmMessage,
  title,
}) => {
  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      title={title}
      titleAlign="center"
    >
      <Box display="flex" flexDirection="column" gap={2}>
        <Paper
          elevation={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 2,
            borderRadius: 2,
            flexDirection: 'column',
          }}
        >
          <WarningAmberIcon color="warning" sx={{ fontSize: 80, mt: 0.5 }} />
          <Box>
            <Typography variant="subtitle1" color="text.primary" align="center">
              {confirmMessage}
            </Typography>
          </Box>
        </Paper>

        <Box display="flex" justifyContent="center" gap={2} mt={2}>
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onConfirm();
              handleClose();
            }}
          >
            Eliminar
          </Button>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default DeleteConfirmationModal;
