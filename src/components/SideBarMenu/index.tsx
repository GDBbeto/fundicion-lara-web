import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  Box,
  Toolbar,
  Typography,
  useMediaQuery,
  IconButton,
  Drawer as MuiDrawer,
  Divider,
} from '@mui/material';
import {
  Home as HomeIcon,
  Menu as MenuIcon,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  CategoryOutlined as CategoryOutlinedIcon,
  Sell as SellIcon,
} from '@mui/icons-material';

import { useTheme } from '@mui/material/styles';

import { colors } from 'commons/colors';

import DrawerContent from './DrawerContent';

import { DrawerHeader, AppBar, Drawer as CustomDrawer } from './styles';

const menuItems = [
  { id: 'home', path: '/', text: 'Inicio', icon: HomeIcon },
  {
    id: 'inventory',
    path: '/inventario',
    text: 'Inventario',
    icon: CategoryOutlinedIcon,
  },
  {
    id: 'sales',
    path: '/ventas',
    text: 'Ventas',
    icon: SellIcon,
  },
];

const SideBarMenu = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'), {
    noSsr: true,
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = useCallback(() => setDrawerOpen(true), []);
  const handleDrawerClose = useCallback(() => setDrawerOpen(false), []);

  const selectedIndex = useMemo(() => {
    const index = menuItems.findIndex((item) => item.path === pathname);
    return index >= 0 ? index : 0;
  }, [pathname]);

  const handleListItemClick = useCallback(
    (index: number) => {
      navigate(menuItems[index].path);
      if (isSmallScreen) handleDrawerClose();
    },
    [navigate, isSmallScreen, handleDrawerClose],
  );

  const drawerContentProps = useMemo(
    () => ({
      open: drawerOpen,
      menuItems,
      selectedIndex,
      handleListItemClick,
      userName: 'Roberto Aguilar',
    }),
    [drawerOpen, selectedIndex, handleListItemClick],
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={drawerOpen} elevation={0}>
        <Toolbar>
          {!drawerOpen && (
            <IconButton
              color="primary"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
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
              ml: !drawerOpen && !isSmallScreen ? 3 : 0,
              fontWeight: 600,
              letterSpacing: 0.5,
              textTransform: 'capitalize',
              flexGrow: 1,
              transition: 'margin-left 0.3s ease',
            }}
          >
            {menuItems[selectedIndex]?.text ?? ''}
          </Typography>
        </Toolbar>
      </AppBar>

      {isSmallScreen ? (
        <MuiDrawer
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerClose}
          ModalProps={{ keepMounted: true }}
          slotProps={{
            paper: {
              sx: {
                backgroundColor: colors.darkBlue,
                color: theme.palette.common.white,
              },
            },
          }}
        >
          <DrawerHeader>
            <IconButton
              onClick={handleDrawerClose}
              sx={{ color: theme.palette.common.white }}
            >
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>

          <Divider />

          <DrawerContent {...drawerContentProps} />
        </MuiDrawer>
      ) : (
        <CustomDrawer
          variant="permanent"
          open={drawerOpen}
          onMouseEnter={handleDrawerOpen}
          onMouseLeave={handleDrawerClose}
        >
          <DrawerContent {...drawerContentProps} />
        </CustomDrawer>
      )}
    </Box>
  );
};

export default SideBarMenu;
