import React from 'react';

import { SnackbarProvider } from 'notistack';
import { Slide } from '@mui/material';

type Props = {
  children: React.ReactNode;
};

const NotistackProvider = ({ children }: Props) => {
  return (
    <SnackbarProvider
      maxSnack={4}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={4000}
      preventDuplicate
      TransitionComponent={Slide}
      hideIconVariant={false}
    >
      {children}
    </SnackbarProvider>
  );
};

export default NotistackProvider;
