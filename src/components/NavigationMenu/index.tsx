import * as React from 'react';
import { useTheme } from '@mui/material/styles';

import {
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import {
  Home as HomeIcon,
  ShoppingCart as ShoppingCartIcon,
  Payment as PaymentIcon,
  AddShoppingCart as AddShoppingCartIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

import { DrawerHeader, AppBar, Drawer, menuItemStyle } from './styles';

const menuItems = [
  { text: 'Inicio', icon: <HomeIcon /> },
  { text: 'Ventas', icon: <ShoppingCartIcon /> },
  { text: 'Compras', icon: <PaymentIcon /> },
  { text: 'Productos', icon: <AddShoppingCartIcon /> },
  { text: 'Otros gastos', icon: <PeopleIcon /> },
  { text: 'Administración', icon: <SettingsIcon /> },
];
export default function NavigationMenu() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0); // Para almacenar el índice de la opción seleccionada

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleLogout = () => console.log('Cerrando sesión...');
  const handleListItemClick = (index: number) => setSelectedIndex(index);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              display: open ? 'none' : 'block',
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {menuItems[selectedIndex].text}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={() => handleListItemClick(index)} // Cambiar la opción seleccionada
                sx={{
                  ...menuItemStyle,
                  backgroundColor:
                    selectedIndex === index ? '#d0d0d0' : 'transparent', // Resalta la opción seleccionada
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: 'center',
                    color: '#3f51b5', // Cambia el color del ícono
                    '&:hover': {
                      color: theme.palette.primary.main, // Color de ícono al pasar el mouse
                    },
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: open ? 1 : 0,
                    fontWeight: open ? 'bold' : 'normal',
                    transition: 'opacity 0.3s ease',
                    color: '#333', // Cambiar color de texto
                    ml: open ? 2 : 0,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ flexGrow: 1 }} />
        {/* Opción de cerrar sesión */}
        <List>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                ...menuItemStyle,
                backgroundColor: 'transparent',
              }}
              onClick={handleLogout}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: 'center',
                  color: '#e91e63', // Color rojo para Cerrar sesión
                }}
              >
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText
                primary={'Cerrar sesión'}
                sx={{
                  opacity: open ? 1 : 0,
                  fontWeight: 'bold',
                  color: '#e91e63', // Rojo para el texto de Cerrar sesión
                  ml: open ? 2 : 0,
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography sx={{ marginBottom: 2 }}>
          Este es el contenido de la aplicación. Puedes agregar más aquí.
        </Typography>
      </Box>
    </Box>
  );
}
