import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Box, Drawer as MuiDrawer, Divider, IconButton } from '@mui/material';
import {
  Home as HomeIcon,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  CategoryOutlined as CategoryOutlinedIcon,
  Sell as SellIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
  AttachMoneyOutlined as AttachMoneyOutlinedIcon,
} from '@mui/icons-material';

import { useTheme } from '@mui/material/styles';

import { colors } from 'commons/colors';

import { useDevice } from 'hooks';

import DrawerContent from './DrawerContent';
import AppToolbar from './AppToolbar';

import { DrawerHeader, Drawer as CustomDrawer } from './styles';

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
  {
    id: 'purchases',
    path: '/compras',
    text: 'Compras',
    icon: ShoppingCartOutlinedIcon,
  },
  {
    id: 'expenses',
    path: '/gastos',
    text: 'Gastos Generales',
    icon: AttachMoneyOutlinedIcon,
  },
];

const SideBarMenu = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { isSmallScreen } = useDevice();

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
      <AppToolbar
        drawerOpen={drawerOpen}
        selectedMenuText={menuItems[selectedIndex]?.text ?? ''}
        onDrawerOpen={handleDrawerOpen}
      />

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
