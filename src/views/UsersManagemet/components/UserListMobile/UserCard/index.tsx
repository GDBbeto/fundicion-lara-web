import React from 'react';
import { Box, Typography, Stack, Avatar, Chip } from '@mui/material';
import { Email, AdminPanelSettings } from '@mui/icons-material';

import type { User } from 'types/api';
import { CardLayout, ActionMenu } from 'components/shared';
import type { ActionItem } from 'components/shared/ActionMenu';
import { colors } from 'commons/colors';
import { getRoleColor, getRoleLabel } from 'utils/catalogs';
import { getInitials } from 'utils/utils';

interface UserCardProps {
  user: User;
  index: number;
  actions: ActionItem[];
}

const UserCard = ({ user, index, actions }: UserCardProps) => {
  return (
    <CardLayout fadeIn={true} fadeDelay={index * 100} padding={2.5}>
      <Stack spacing={2}>
        {/* Header con Avatar y Acciones */}
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={2} alignItems="center" flex={1}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: colors.lightBlue + '30',
                color: colors.darkBlue,
                fontSize: '1.5rem',
                fontWeight: 700,
                border: `3px solid ${colors.lightBlue}40`,
              }}
            >
              {getInitials(user)}
            </Avatar>
            <Box flex={1}>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{
                  color: colors.darkText,
                  lineHeight: 1.3,
                  mb: 0.5,
                }}
              >
                {user.name} {user.lastName}
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{
                  color: colors.darkText,
                  fontSize: '0.9rem',
                }}
              >
                {user.motherLastName}
              </Typography>
            </Box>
          </Stack>

          {/* Menú de Acciones */}
          {actions.length > 0 && (
            <ActionMenu
              actions={actions}
              size="small"
              iconColor={colors.darkText}
              hoverColor={colors.darkBlue}
              alignItems="flex-start"
            />
          )}
        </Stack>

        {/* Email */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            bgcolor: colors.lightBlue + '10',
            borderRadius: 2,
            p: 1.5,
            border: `1px solid ${colors.lightBlue}30`,
          }}
        >
          <Email sx={{ color: colors.darkBlue, fontSize: 20 }} />
          <Typography
            variant="body2"
            fontWeight={500}
            sx={{
              color: colors.darkText,
              fontSize: '0.9rem',
              wordBreak: 'break-all',
            }}
          >
            {user.email}
          </Typography>
        </Box>

        {/* Rol */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            bgcolor: 'background.default',
            borderRadius: 2,
            p: 1.5,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <AdminPanelSettings sx={{ color: colors.darkBlue, fontSize: 22 }} />
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{ color: colors.darkText }}
            >
              Rol asignado
            </Typography>
          </Stack>
          <Chip
            label={getRoleLabel(user.role)}
            color={getRoleColor(user.role)}
            size="medium"
            sx={{
              fontWeight: 700,
              fontSize: '0.85rem',
              px: 1,
            }}
          />
        </Box>
      </Stack>
    </CardLayout>
  );
};

export default UserCard;
