import React from 'react';
import { useSnackbar } from 'notistack';

import { IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

import { ERROR_MESSAGES } from 'commons/messages';
import { CommonError } from 'types/api';

const useErrorHandler = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showError = (
    error: unknown,
    fallbackMessage = ERROR_MESSAGES.DEFAULT,
  ) => {
    const typedError = error as CommonError;
    const message = typedError?.userMessage || fallbackMessage;

    enqueueSnackbar(message, {
      variant: 'error',
      autoHideDuration: 8000,
      persist: false,
      preventDuplicate: true,
      hideIconVariant: true, // ✅ Elimina el icono por defecto
      action: (key) => (
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => closeSnackbar(key)}
          sx={{ padding: 0.5 }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      ),
    });
  };

  return { showError };
};

export default useErrorHandler;
