// src/components/layouts/FormLayout.tsx
import React from 'react';
import { Box, useTheme } from '@mui/material';

interface FormLayoutProps {
  id?: string;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
}

const FormLayout = ({ id, onSubmit, children }: FormLayoutProps) => {
  const theme = useTheme();

  return (
    <Box
      id={id}
      component="form"
      onSubmit={onSubmit}
      noValidate
      sx={{
        overflowY: 'hidden',
        pb: 4,
        [theme.breakpoints.down('sm')]: {
          maxHeight: 'calc(100vh - 120px)',
          px: 1,
          pb: 12,
        },
      }}
    >
      {children}
    </Box>
  );
};

export default FormLayout;
