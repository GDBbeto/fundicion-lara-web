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
  AssignmentOutlined as AssignmentOutlinedIcon,
  Group as GroupIcon,
} from '@mui/icons-material';

import { useTheme } from '@mui/material/styles';

import { colors } from 'commons/colors';

import { useDevice, usePermissions } from 'hooks';

import DrawerContent from './DrawerContent';
import AppToolbar from './AppToolbar';

import { DrawerHeader, Drawer as CustomDrawer } from './styles';

const allItems = [
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
  {
    id: 'orders',
    path: '/pedidos',
    text: 'Gestión de Pedidos',
    icon: AssignmentOutlinedIcon,
  },
  {
    id: 'users',
    path: '/usuarios',
    text: 'Administrar Usuarios',
    icon: GroupIcon,
  },
];

const SideBarMenu = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { isAdmin } = usePermissions();

  const { isSmallScreen } = useDevice();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = useCallback(() => setDrawerOpen(true), []);
  const handleDrawerClose = useCallback(() => setDrawerOpen(false), []);

  const menuItems = useMemo(() => {
    return allItems.filter((item) => {
      if (item.id === 'users' && !isAdmin) return false;
      return true;
    });
  }, [isAdmin]);

  const selectedIndex = useMemo(() => {
    const index = menuItems.findIndex((item) => item.path === pathname);
    return index >= 0 ? index : -1;
  }, [pathname, menuItems]);

  const handleListItemClick = useCallback(
    (index: number) => {
      navigate(menuItems[index].path);
      if (isSmallScreen) handleDrawerClose();
    },
    [navigate, isSmallScreen, handleDrawerClose, menuItems],
  );

  const drawerContentProps = useMemo(
    () => ({
      open: drawerOpen,
      menuItems,
      selectedIndex,
      handleListItemClick,
    }),
    [drawerOpen, selectedIndex, handleListItemClick, menuItems],
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
