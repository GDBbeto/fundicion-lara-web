import React, { useCallback } from 'react';
import {
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Stack,
  Box,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ExitToApp as ExitToAppIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

import { colors } from 'commons/colors';

import ActionMenu, { ActionItem } from 'components/shared/ActionMenu';

import { useAuth, useDevice } from 'hooks';

import { AppBar } from '../styles';

interface AppToolbarProps {
  drawerOpen: boolean;
  selectedMenuText: string;
  onDrawerOpen: () => void;
}

const AppToolbar: React.FC<AppToolbarProps> = ({
  drawerOpen,
  selectedMenuText,
  onDrawerOpen,
}) => {
  const { isSmallScreen } = useDevice();
  const { logout } = useAuth();

  const userActions: ActionItem[] = useCallback(
    () => [
      {
        id: 'profile',
        label: 'Perfil',
        icon: <PersonIcon fontSize="small" />,
        onClick: () => console.log('Perfil'),
        color: colors.darkBlue,
      },
      {
        id: 'logout',
        label: 'Cerrar sesión',
        icon: <ExitToAppIcon fontSize="small" />,
        onClick: logout,
        color: colors.red,
      },
    ],
    [logout],
  )();

  return (
    <AppBar position="fixed" open={drawerOpen} elevation={0}>
      <Toolbar>
        {!drawerOpen && (
          <IconButton
            color="primary"
            aria-label="open drawer"
            onClick={onDrawerOpen}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h5"
          noWrap
          component="div"
          color="primary"
          sx={{
            ml: drawerOpen ? 0 : 2,
            fontWeight: 600,
            letterSpacing: 0.5,
            textTransform: 'capitalize',
            flexGrow: 1,
            transition: 'margin-left 0.3s ease',
            // color: colors.darkBlue,
            color: 'primary.main',
          }}
        >
          {selectedMenuText}
        </Typography>

        {/* User info (right side) */}
        <Stack direction="row" alignItems="center" sx={{ m: 0, padding: 0 }}>
          {isSmallScreen ? null : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  //color: colors.darkText,
                  color: 'primary.main',
                  lineHeight: 1.2,
                  fontSize: '0.85rem',
                }}
              >
                Roberto Aguilar
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: colors.darkText,
                  opacity: 0.7,
                  fontSize: '0.75rem',
                  lineHeight: 1,
                }}
              >
                Administrador
              </Typography>
            </Box>
          )}
          <Avatar
            sx={{
              ml: 1,
              width: 36,
              height: 36,
              //bgcolor: colors.darkBlue,
              bgcolor: 'primary.main',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.9rem',
              border: `2px solid ${colors.white}`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            RA
          </Avatar>
          <ActionMenu
            actions={userActions}
            size="small"
            iconColor={colors.darkText}
            hoverColor={colors.darkBlue}
            alignItems="flex-start"
          />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
