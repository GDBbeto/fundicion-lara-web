import React, { useState } from 'react';
import { Box } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { AuthFormLayout, CustomSpinner } from 'components/shared';

import type { RegisterRequest } from 'types/api';

import { register } from 'services/authService';
import { useErrorHandler, useSnackbar } from 'hooks';

import RegisterForm from './components/RegisterForm';
import * as styles from './components/RegisterForm/styles';

const Register = () => {
  const navigate = useNavigate();
  const { showError } = useErrorHandler();
  const { showSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: RegisterRequest) => {
    try {
      setIsLoading(true);
      await register(data);
      setIsLoading(false);

      showSnackbar(
        'Cuenta creada exitosamente. Inicia sesión para continuar',
        'success',
      );
      navigate('/login');
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logo = (
    <Box sx={styles.logoStyles}>
      <PersonAdd sx={styles.logoIconStyles} />
    </Box>
  );

  return (
    <AuthFormLayout
      title="Crear cuenta"
      subtitle="Únete para empezar a usar el sistema"
      logo={logo}
    >
      <RegisterForm onSubmit={onSubmit} />
      {isLoading && <CustomSpinner open={isLoading} />}
    </AuthFormLayout>
  );
};

export default Register;
