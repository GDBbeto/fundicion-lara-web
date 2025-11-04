import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  TextField,
  Button,
  Box,
  Typography,
  Link,
  FormControlLabel,
  Checkbox,
  Stack,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { FormLayout, CustomPasswordField } from 'components/shared';
import { useDevice } from 'hooks';

import type { LoginRequest } from 'types/api';

import schema from './schema';
import * as styles from './styles';

const REMEMBER_ME_KEY = 'rememberMe';
const SAVED_EMAIL_KEY = 'savedEmail';

interface Props {
  onSubmit: (data: LoginRequest) => Promise<void>;
}

const LoginForm = ({ onSubmit }: Props) => {
  const { isSmallScreenV2: isMobile } = useDevice();

  const [rememberMe, setRememberMe] = React.useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const emailValue = watch('email');

  // Cargar email guardado al montar el componente
  useEffect(() => {
    const savedRememberMe = localStorage.getItem(REMEMBER_ME_KEY) === 'true';
    const savedEmail = localStorage.getItem(SAVED_EMAIL_KEY);

    if (savedRememberMe && savedEmail) {
      setRememberMe(true);
      setValue('email', savedEmail);
    }
  }, [setValue]);

  // Guardar/eliminar email cuando cambia el checkbox o el email
  useEffect(() => {
    if (rememberMe && emailValue) {
      localStorage.setItem(REMEMBER_ME_KEY, 'true');
      localStorage.setItem(SAVED_EMAIL_KEY, emailValue);
    } else if (!rememberMe) {
      localStorage.removeItem(REMEMBER_ME_KEY);
      localStorage.removeItem(SAVED_EMAIL_KEY);
    }
  }, [rememberMe, emailValue]);

  return (
    <FormLayout id={'login-form'} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
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

        {/* Password Field */}
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

        {/* Remember Me Checkbox */}
        <Box sx={styles.rememberMeContainerStyles}>
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                sx={styles.checkboxStyles}
              />
            }
            label="Recordarme"
            sx={{ margin: 0 }}
          />
        </Box>

        {/* Login Button */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size={isMobile ? 'medium' : 'large'}
          disabled={isSubmitting}
          sx={styles.loginButtonStyles}
        >
          {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </Button>

        {/* Footer */}
        <Box sx={styles.footerContainerStyles}>
          <Typography variant="body2" color="text.secondary">
            ¿No tienes cuenta?{' '}
            <Link
              component={RouterLink}
              to="/register"
              sx={styles.registerLinkStyles}
            >
              Crear una cuenta
            </Link>
          </Typography>
        </Box>
      </Stack>
    </FormLayout>
  );
};

export default LoginForm;
