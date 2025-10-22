import React from 'react';

import { Box, Chip } from '@mui/material';

import type { User } from 'types/api';
import type { Column } from 'types/column';

import { getRoleColor, getRoleLabel } from 'utils/catalogs';

export const columns: Column<User>[] = [
  {
    label: 'Nombre',
    apiField: 'name',
    sort: true,
    render: (row) => (
      <Box sx={{ fontWeight: 500 }}>
        {row.name} {row.lastName} {row.motherLastName}
      </Box>
    ),
  },
  {
    label: 'Email',
    apiField: 'email',
    sort: true,
    render: (row) => <Box sx={{ color: 'text.secondary' }}>{row.email}</Box>,
  },
  {
    label: 'Rol',
    apiField: 'role',
    sort: true,
    align: 'center',
    render: (row) => (
      <Chip
        label={getRoleLabel(row.role)}
        color={getRoleColor(row.role)}
        size="small"
        sx={{ fontWeight: 500 }}
      />
    ),
  },
];
