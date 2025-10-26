import React from 'react';
import { Box } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';

import { AuthFormLayout } from 'components/shared';

import type { RegisterRequest } from 'types/api';

import RegisterForm from './components/RegisterForm';
import * as styles from './components/RegisterForm/styles';

const Register = () => {
  const onSubmit = async (data: RegisterRequest) => {
    try {
      // TODO: Integrate with register service
      console.log('Register data:', data);
    } catch (error) {
      console.error('Register error:', error);
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
    </AuthFormLayout>
  );
};

export default Register;
