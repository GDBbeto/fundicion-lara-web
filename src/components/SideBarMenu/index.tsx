import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';

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
} from '@mui/icons-material';
import { DrawerHeader, AppBar, Drawer as CustomDrawer } from './styles'; // 👈 Renombrado para claridad
import DrawerContent from './DrawerContent';
import { colors } from 'commons/colors';

const menuItems = [
  { id: 'home', path: '/', text: 'Inicio', icon: HomeIcon },
  {
    id: 'home3',
    path: '/productos',
    text: 'Productos',
    icon: CategoryOutlinedIcon,
  },
];

export default function SideBarMenu() {
  const theme = useTheme();
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);
  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
    navigate(menuItems[index].path);
    if (isSmallScreen) handleDrawerClose();
  };

  const drawerContentProps = {
    open: drawerOpen,
    menuItems,
    selectedIndex,
    handleListItemClick,
    userName: 'Roberto Aguilar',
  };

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
              transition: 'margin-left 0.3s ease', // <- transición suave
              ml: !drawerOpen && !isSmallScreen ? 3 : undefined,
              fontWeight: 600,
              letterSpacing: 0.5,
              textTransform: 'capitalize',
              flexGrow: 1, // <-- evita el salto al mover el drawer
            }}
          >
            {menuItems[selectedIndex].text}
          </Typography>
        </Toolbar>
      </AppBar>

      {isSmallScreen ? (
        <MuiDrawer
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
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
}
