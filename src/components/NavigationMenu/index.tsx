import * as React from 'react';
import { useTheme } from '@mui/material/styles';

import {
  Box,
  Toolbar,
  List,
  Typography,
  Divider,
  Avatar,
  ListItemText,
  ListItem,
} from '@mui/material';

import {
  Home as HomeIcon,
  ShoppingCart as ShoppingCartIcon,
  Payment as PaymentIcon,
  AddShoppingCart as AddShoppingCartIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';

import { DrawerHeader, AppBar, Drawer } from './styles';
import ItemMenu from './ItemMenu';

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
      <AppBar position="fixed" open={open} elevation={0}>
        <Toolbar>
          <Typography
            variant="h5"
            noWrap
            component="div"
            color="primary"
            sx={{
              fontWeight: 600,
              letterSpacing: 0.5,
              textTransform: 'capitalize',
            }}
          >
            {menuItems[selectedIndex].text}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        onMouseEnter={() => {
          handleDrawerOpen();
        }}
        onMouseLeave={() => {
          handleDrawerClose();
        }}
      >
        <List>
          <ListItem
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 2,
              paddingLeft: '12px',
            }}
          >
            <Avatar
              sx={{
                bgcolor: theme.palette.primary.main,
              }}
            >
              RA
            </Avatar>
            <ListItemText
              primary="Roberto Aguilar"
              secondary="Texto"
              sx={{
                opacity: open ? 1 : 0,
                fontWeight: 'bold',
                transition: 'opacity 0.3s ease',
                ml: open ? 2 : 0,
              }}
            />
          </ListItem>
        </List>

        <List>
          {menuItems.map((item, index) => (
            <ItemMenu
              key={index}
              open={open}
              item={item}
              index={index}
              selectedIndex={selectedIndex}
              handleClick={() => handleListItemClick(index)}
            />
          ))}
        </List>
        <Divider />
        <Box sx={{ flexGrow: 1 }} />
        {/* Opción de cerrar sesión */}
        <List>
          <ItemMenu
            open={open}
            item={{ text: 'Cerrar sesión', icon: <ExitToAppIcon /> }}
            index={-1}
            selectedIndex={selectedIndex}
            handleClick={handleLogout}
          />
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
