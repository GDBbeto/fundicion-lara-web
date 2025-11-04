import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';

import { useAuth, useErrorHandler } from 'hooks';

import { AuthFormLayout, CustomSpinner } from 'components/shared';

import type { LoginRequest } from 'types/api';

import { login as loginService } from 'services/authService';

import LoginForm from './components/LoginForm';
import * as styles from './components/LoginForm/styles';

const Login = () => {
  const { login } = useAuth();
  const { showError } = useErrorHandler();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (data: LoginRequest) => {
    try {
      setIsLoading(true);
      const response = await loginService(data);
      setIsLoading(false);
      login(response);
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logo = (
    <Box sx={styles.logoStyles}>
      <LoginIcon sx={styles.logoIconStyles} />
    </Box>
  );

  return (
    <AuthFormLayout
      title="Bienvenido de nuevo"
      subtitle="Inicia sesión para continuar"
      logo={logo}
    >
      <LoginForm onSubmit={handleSubmit} />
      {isLoading && <CustomSpinner open={isLoading} />}
    </AuthFormLayout>
  );
};

export default Login;
