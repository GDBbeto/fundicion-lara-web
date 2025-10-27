import React from 'react';
import { Box, Fade, Typography } from '@mui/material';
import { ErrorOutline as ErrorOutlineIcon } from '@mui/icons-material';
import { colors } from 'commons/colors';
import type { CommonError } from 'types/api';

interface CustomErrorStateProps {
  error: CommonError;
}

const CustomErrorState = ({ error }: CustomErrorStateProps) => {
  return (
    <Fade in timeout={300}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          mt={10}
          mb={10}
          sx={{
            backgroundColor: colors.veryLightGray,
            borderRadius: 2,
            p: 5,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            maxWidth: 500,
            mx: 'auto',
            textAlign: 'center',
          }}
        >
          <ErrorOutlineIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            No se pudo cargar la información
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            {error.userMessage ??
              'Por favor, intenta nuevamente m\u00E1s tarde.'}
          </Typography>
        </Box>
      </Box>
    </Fade>
  );
};

export default CustomErrorState;
