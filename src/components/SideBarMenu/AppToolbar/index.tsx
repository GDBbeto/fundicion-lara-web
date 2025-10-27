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

import { useNavigate } from 'react-router-dom';

import { colors } from 'commons/colors';

import ActionMenu, { ActionItem } from 'components/shared/ActionMenu';

import { useAuth, useDevice } from 'hooks';

import { getRoleLabel } from 'utils/catalogs';
import { getInitials } from 'utils/utils';

import { AppBar } from '../styles';

interface AppToolbarProps {
  drawerOpen: boolean;
  selectedMenuText: string;
  onDrawerOpen: () => void;
}

const AppToolbar: React.FC<AppToolbarProps> = ({
  selectedMenuText,
  onDrawerOpen,
}) => {
  const { isSmallScreen } = useDevice();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const userActions: ActionItem[] = useCallback(
    () => [
      {
        id: 'profile',
        label: 'Mi perfil',
        icon: <PersonIcon fontSize="small" />,
        onClick: () => navigate('perfil'),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [logout],
  )();

  return (
    <AppBar
      position="fixed"
      open={false}
      elevation={0}
      sx={
        isSmallScreen
          ? {
              background: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.darkerBlue} 100%)`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              borderBottom: 'none',
            }
          : {
              backgroundColor: 'transparent',
              backdropFilter: 'blur(20px)',
              borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
              background: `linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)`,
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }
      }
    >
      <Toolbar>
        <IconButton
          color="primary"
          aria-label="open drawer"
          onClick={onDrawerOpen}
          edge="start"
          sx={{
            mr: isSmallScreen ? 1 : 4,
            color: isSmallScreen ? colors.white : colors.darkBlue,
            '&:hover': {
              backgroundColor: isSmallScreen
                ? 'rgba(255, 255, 255, 0.1)'
                : undefined,
            },
          }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h5"
          noWrap
          component="div"
          color="primary"
          sx={{
            fontWeight: 600,
            letterSpacing: 0.5,
            textTransform: 'capitalize',
            flexGrow: 1,
            transition: 'margin-left 0.3s ease',
            color: isSmallScreen ? colors.white : colors.darkBlue,
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
                  color: colors.darkText,
                  lineHeight: 1.2,
                  fontSize: '0.85rem',
                }}
              >
                {`${user?.name} ${user?.lastName}`}
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
                {user ? getRoleLabel(user.role) : ''}
              </Typography>
            </Box>
          )}
          <Avatar
            sx={{
              ml: 1,
              width: 36,
              height: 36,
              bgcolor: isSmallScreen
                ? 'rgba(255, 255, 255, 0.2)'
                : colors.darkBlue,
              color: colors.white,
              fontWeight: 700,
              fontSize: '0.9rem',
              border: isSmallScreen
                ? `2px solid rgba(255, 255, 255, 0.3)`
                : `2px solid ${colors.white}`,
              boxShadow: isSmallScreen
                ? '0 2px 8px rgba(0,0,0,0.2)'
                : '0 2px 8px rgba(0,0,0,0.1)',
              backdropFilter: isSmallScreen ? 'blur(10px)' : 'none',
            }}
          >
            {user ? getInitials(user) : 'NA'}
          </Avatar>
          <ActionMenu
            actions={userActions}
            size="small"
            iconColor={isSmallScreen ? colors.white : colors.darkText}
            hoverColor={isSmallScreen ? colors.lightBlue : colors.darkBlue}
            alignItems="flex-start"
          />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
