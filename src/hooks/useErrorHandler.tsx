import React from 'react';
import { useSnackbar } from 'notistack';
import { ERROR_MESSAGES } from 'commons/messages';
import { CommonError } from 'types/api';

const useErrorHandler = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showError = (
    error: unknown,
    fallbackMessage = ERROR_MESSAGES.DEFAULT,
  ) => {
    const typedError = error as CommonError;

    enqueueSnackbar(typedError?.userMessage || fallbackMessage, {
      variant: 'error',
      autoHideDuration: 8000,
      persist: true,
      action: (key) => (
        <button
          style={{
            background: 'transparent',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px',
          }}
          onClick={() => closeSnackbar(key)}
        >
          ✕
        </button>
      ),
    });
  };

  return { showError };
};

export default useErrorHandler;
