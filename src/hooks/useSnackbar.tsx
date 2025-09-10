import React from 'react';
import { useSnackbar as useSnackbarNotistack } from 'notistack';

const useSnackbar = () => {
  const { enqueueSnackbar } = useSnackbarNotistack();

  const showSnackbar = (
    mensaje: string | React.ReactNode,
    variant: 'default' | 'error' | 'success' | 'warning' | 'info',
  ) => {
    enqueueSnackbar(mensaje, {
      variant,
    });
  };

  return {
    showSnackbar,
  };
};

export default useSnackbar;
