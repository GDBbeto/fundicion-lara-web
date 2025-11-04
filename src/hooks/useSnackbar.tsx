import React from 'react';
import { useSnackbar as useSnackbarNotistack } from 'notistack';
import useErrorHandler from './useErrorHandler';

const useSnackbar = () => {
  const { enqueueSnackbar } = useSnackbarNotistack();
  const { showError } = useErrorHandler();

  const showSnackbar = (
    mensaje: string | React.ReactNode,
    variant: 'default' | 'success' | 'warning' | 'info',
    autoHideDuration?: number,
  ) => {
    enqueueSnackbar(mensaje, {
      variant,
      autoHideDuration,
    });
  };

  return {
    showSnackbar,
    showSnackbarError: showError,
  };
};

export default useSnackbar;
