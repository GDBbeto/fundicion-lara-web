import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Container,
  Typography,
  Box,
  Button,
  Stack,
  Divider,
  Alert,
} from '@mui/material';
import { Edit, Save, Cancel, Lock, Person } from '@mui/icons-material';

import { CardLayout, CustomTextField, CustomSpinner } from 'components/shared';
import { useAuth, useSnackbar, useErrorHandler } from 'hooks';
import { updateUser } from 'services/userService';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from 'commons/messages';
import { colors } from 'commons/colors';

import schema from './schema';

interface ProfileFormData {
  name: string;
  lastName: string;
  motherLastName: string;
}

const Profile = () => {
  const { user, setUser } = useAuth();
  const { showSnackbar } = useSnackbar();
  const { showError } = useErrorHandler();

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      name: user?.name || '',
      lastName: user?.lastName || '',
      motherLastName: user?.motherLastName || '',
    },
  });

  // Reset form when user data changes
  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        lastName: user.lastName,
        motherLastName: user.motherLastName,
      });
    }
  }, [user, reset]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    reset({
      name: user?.name || '',
      lastName: user?.lastName || '',
      motherLastName: user?.motherLastName || '',
    });
  };

  const onSubmit = async (data: ProfileFormData) => {
    if (!user?.userId) return;

    setIsLoading(true);
    try {
      const body = {
        ...user,
        ...data,
      };
      const resp = await updateUser(user.userId, body);
      showSnackbar(SUCCESS_MESSAGES.UPDATED, 'success');
      setIsEditing(false);
      setUser(resp.data);
    } catch (error) {
      showError(error, ERROR_MESSAGES.UPDATE);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">
          No se pudo cargar la información del usuario
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={3}>
        {/* Header */}
        <Box>
          <Typography
            variant="h4"
            fontWeight={700}
            color="primary"
            gutterBottom
          >
            Mi Perfil
          </Typography>
        </Box>

        {/* Profile Card */}
        <CardLayout padding={3}>
          <Stack spacing={3}>
            {/* Profile Header */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                pb: 2,
                borderBottom: `1px solid ${colors.lightSurface}`,
              }}
            >
              <Person sx={{ fontSize: 32, color: colors.darkBlue }} />
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  Información Personal
                </Typography>
              </Box>
            </Box>

            {/* Form Fields */}
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                {/* Name Fields */}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Box flex={1}>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          label="Nombre"
                          required
                          disabled={!isEditing}
                          error={!!errors.name}
                          helperText={errors.name?.message}
                        />
                      )}
                    />
                  </Box>
                  <Box flex={1}>
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          label="Apellido Paterno"
                          required
                          disabled={!isEditing}
                          error={!!errors.lastName}
                          helperText={errors.lastName?.message}
                        />
                      )}
                    />
                  </Box>
                </Stack>

                <Controller
                  name="motherLastName"
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      label="Apellido Materno"
                      disabled={!isEditing}
                      error={!!errors.motherLastName}
                      helperText={errors.motherLastName?.message}
                    />
                  )}
                />

                <Divider />

                {/* Read-only Fields */}
                <Stack spacing={2}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      color: 'text.secondary',
                    }}
                  >
                    <Lock fontSize="small" />
                    <Typography variant="body2" fontWeight={500}>
                      Campos no editables
                    </Typography>
                  </Box>

                  <CustomTextField
                    label="Correo Electrónico"
                    value={user.email}
                    disabled
                    InputProps={{
                      readOnly: true,
                    }}
                    helperText="El correo electrónico no se puede modificar"
                  />

                  <CustomTextField
                    label="Rol"
                    value={user.role}
                    disabled
                    InputProps={{
                      readOnly: true,
                    }}
                    helperText="El rol es asignado por el administrador"
                  />
                </Stack>

                {/* Action Buttons */}
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    justifyContent: 'flex-end',
                    pt: 2,
                    borderTop: `1px solid ${colors.lightSurface}`,
                  }}
                >
                  {isEditing ? (
                    <>
                      <Button
                        variant="outlined"
                        startIcon={<Cancel />}
                        onClick={handleCancelClick}
                        disabled={isLoading}
                      >
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={<Save />}
                        disabled={!isDirty || isLoading}
                      >
                        Guardar cambios
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      startIcon={<Edit />}
                      onClick={handleEditClick}
                    >
                      Editar mi perfil
                    </Button>
                  )}
                </Box>
              </Stack>
            </Box>
          </Stack>
        </CardLayout>
      </Stack>

      {isLoading && <CustomSpinner open />}
    </Container>
  );
};

export default Profile;
