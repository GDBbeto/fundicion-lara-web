import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  TextField,
  Button,
  Box,
  Typography,
  Link,
  Stack,
  Grid,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import type { RegisterRequest } from 'types/api';

import { FormLayout, CustomPasswordField } from 'components/shared';
import { useDevice } from 'hooks';

import schema from './schema';
import * as styles from './styles';

interface Props {
  onSubmit: (data: RegisterRequest) => Promise<void>;
}

const RegisterForm = ({ onSubmit }: Props) => {
  const { isSmallScreenV2: isMobile } = useDevice();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterRequest>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      name: '',
      lastName: '',
      motherLastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <FormLayout id={'register-form'} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {/* Name Fields */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nombre"
              fullWidth
              required
              size={isMobile ? 'small' : 'medium'}
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={styles.textFieldStyles}
              slotProps={{
                input: {
                  autoComplete: 'off',
                },
              }}
            />
          )}
        />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Apellido Paterno"
                  fullWidth
                  required
                  size={isMobile ? 'small' : 'medium'}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  sx={styles.textFieldStyles}
                  slotProps={{
                    input: {
                      autoComplete: 'off',
                    },
                  }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            {/* Mother Last Name */}
            <Controller
              name="motherLastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Apellido Materno"
                  fullWidth
                  required
                  size={isMobile ? 'small' : 'medium'}
                  error={!!errors.motherLastName}
                  helperText={errors.motherLastName?.message}
                  sx={styles.textFieldStyles}
                  slotProps={{
                    input: {
                      autoComplete: 'off',
                    },
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

        {/* Email Field */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Correo electrónico"
              type="email"
              fullWidth
              required
              size={isMobile ? 'small' : 'medium'}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={styles.textFieldStyles}
            />
          )}
        />

        {/* Password Fields */}
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <CustomPasswordField
              {...field}
              label="Contraseña"
              fullWidth
              required
              size={isMobile ? 'small' : 'medium'}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={styles.textFieldStyles}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <CustomPasswordField
              {...field}
              label="Confirmar contraseña"
              fullWidth
              required
              size={isMobile ? 'small' : 'medium'}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              sx={styles.textFieldStyles}
            />
          )}
        />

        {/* Register Button */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size={isMobile ? 'medium' : 'large'}
          disabled={isSubmitting}
          sx={styles.registerButtonStyles}
        >
          {isSubmitting ? 'Creando cuenta...' : 'Registrarme'}
        </Button>

        {/* Footer */}
        <Box sx={styles.footerContainerStyles}>
          <Typography variant="body2" color="text.secondary">
            ¿Ya tienes una cuenta?{' '}
            <Link
              component={RouterLink}
              to="/login"
              sx={styles.loginLinkStyles}
            >
              Inicia sesión
            </Link>
          </Typography>
        </Box>
      </Stack>
    </FormLayout>
  );
};

export default RegisterForm;
