import React, { useCallback } from 'react';
import { Box, Typography, Tooltip, Stack, useTheme } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person'; // Icono decorativo para el chip

import { ActionMenu } from 'components/shared';
import type { ActionItem } from 'components/shared/ActionMenu';
import { productNameStyles } from '../styles';
import { colors } from 'commons/colors';

interface Props {
  name: string;
  client?: string | null;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductCardHeader = ({ name, client, onEdit, onDelete }: Props) => {
  const { palette } = useTheme();

  // Memorizar las acciones para evitar recreaciones innecesarias
  const productActions: ActionItem[] = useCallback(
    () => [
      {
        id: 'edit',
        label: 'Editar',
        icon: <EditIcon fontSize="small" />,
        onClick: onEdit,
        color: colors.darkBlue,
      },
      {
        id: 'delete',
        label: 'Eliminar',
        icon: <DeleteIcon fontSize="small" />,
        onClick: onDelete,
        color: colors.red,
      },
    ],
    [onEdit, onDelete],
  )();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px={2}
      pt={1}
      pb={1}
    >
      <Stack
        spacing={0}
        maxWidth="80%"
        width={'80%'}
        direction="column"
        justifyContent="center"
      >
        <Tooltip title={name} arrow>
          <Typography variant="subtitle1" sx={productNameStyles}>
            {name}
          </Typography>
        </Tooltip>

        <Box display="flex" alignItems="center" gap={0.5}>
          <PersonIcon
            fontSize="small"
            color={client ? 'inherit' : 'disabled'}
            sx={{ padding: 0, margin: 0 }}
          />
          <Typography
            variant="button"
            noWrap
            sx={{
              color: client ? palette.text.primary : 'text.disabled',
            }}
          >
            {client || 'Sin cliente'}
          </Typography>
        </Box>
      </Stack>

      <ActionMenu
        actions={productActions}
        size="small"
        iconColor={palette.text.secondary}
        hoverColor={colors.darkBlue}
        alignItems="flex-start"
      />
    </Box>
  );
};

export default ProductCardHeader;
