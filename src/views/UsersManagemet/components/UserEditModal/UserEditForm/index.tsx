import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Grid, Box, Typography, Stack } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

import { CustomSelectField, FormLayout } from 'components/shared';
import type { User, Role } from 'types/api';
import { CAT_USER_ROLES } from 'commons/catalogs';
import schema from './schema';

interface UserEditFormData {
  role: Role;
}

interface Props {
  id?: string;
  user: User;
  onSubmit: (userId: number, role: Role) => void;
}

const UserEditForm = ({ id, user, onSubmit }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserEditFormData>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      role: user.role,
    },
  });

  const handleFormSubmit = (data: UserEditFormData) => {
    onSubmit(user.userId, data.role);
  };

  return (
    <FormLayout id={id} onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={4}>
        {/* Información del usuario */}
        <Grid size={{ xs: 12 }}>
          <Box sx={{ mb: 1 }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={0.5}
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              flexWrap="wrap"
            >
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Nombre:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  wordBreak: 'break-word',
                  whiteSpace: 'normal',
                }}
              >
                {`${user.name} ${user.lastName ?? ''} ${user.motherLastName ?? ''}`}
              </Typography>
            </Stack>

            <Stack
              sx={{ mt: 2 }}
              direction={{ xs: 'column', sm: 'row' }}
              spacing={0.5}
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              flexWrap="wrap"
            >
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Email:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  wordBreak: 'break-all',
                  whiteSpace: 'normal',
                }}
              >
                {user.email}
              </Typography>
            </Stack>
          </Box>
        </Grid>

        {/* Campo de selección de rol */}
        <Grid size={{ xs: 12 }}>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <CustomSelectField
                {...field}
                required
                label="Rol"
                options={CAT_USER_ROLES}
                error={!!errors.role}
                helperText={errors.role?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </FormLayout>
  );
};

export default UserEditForm;
