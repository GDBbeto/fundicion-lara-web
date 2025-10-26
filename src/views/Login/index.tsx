import React from 'react';
import { Box } from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';

import { useAuth } from 'hooks';

import { AuthFormLayout } from 'components/shared';

import type { LoginRequest } from 'types/api';

import LoginForm from './components/LoginForm';
import * as styles from './components/LoginForm/styles';

const Login = () => {
  const { login } = useAuth();

  const handleSubmit = async (data: LoginRequest) => {
    try {
      console.log('Login data:', data);
      login('data');
    } catch (error) {
      console.error('Login error:', error);
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
    </AuthFormLayout>
  );
};

export default Login;
