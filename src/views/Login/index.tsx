import React from 'react';
import { Box } from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';

import { useAuth } from 'hooks';

import { AuthFormLayout } from 'components/shared';

import type { LoginRequest, LoginResponse } from 'types/api';

import LoginForm from './components/LoginForm';
import * as styles from './components/LoginForm/styles';

const Login = () => {
  const { login } = useAuth();

  const handleSubmit = async (data: LoginRequest) => {
    try {
      console.log('Login data:', data);

      const loginResponse: LoginResponse = {
        accessToken: '1234567890',
        refreshToken: '1234567890',
        tokenType: 'Bearer',
        expiresIn: 1000,
        user: {
          userId: 1,
          name: 'Roberto',
          lastName: 'Aguilar',
          motherLastName: 'Vazquez',
          email: 'roberto.aav.23@gmail.com',
          role: 'ADMIN' as any,
        },
      };

      login(loginResponse);
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
