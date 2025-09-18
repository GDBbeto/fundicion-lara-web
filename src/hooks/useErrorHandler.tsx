import { useSnackbar } from 'notistack';
import { ERROR_MESSAGES } from 'commons/messages';
import { CommonError } from 'types/api';

const useErrorHandler = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showError = (
    error: unknown,
    fallbackMessage = ERROR_MESSAGES.DEFAULT,
  ) => {
    const typedError = error as CommonError;

    enqueueSnackbar(typedError?.userMessage || fallbackMessage, {
      variant: 'error',
    });
  };

  return { showError };
};

export default useErrorHandler;
