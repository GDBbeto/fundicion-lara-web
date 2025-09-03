import React from 'react';

import {
  Box,
  List,
  Divider,
  Avatar,
  ListItemText,
  ListItem,
  useTheme,
} from '@mui/material';

import { ExitToApp as ExitToAppIcon } from '@mui/icons-material';

import { useAuth } from 'hooks';

import ItemMenu from '../ItemMenu';
import { MenuItem } from '../types';

interface Props {
  open: boolean;
  menuItems: MenuItem[];
  selectedIndex: number;
  userName?: string;
  handleListItemClick: (index: number) => void;
}
const DrawerContent = ({
  open,
  menuItems,
  selectedIndex,
  handleListItemClick,
}: Props) => {
  const theme = useTheme();
  const { logout } = useAuth();

  const handleLogout = () => logout();

  return (
    <>
      <List>
        <ListItem
          sx={{
            display: 'flex',
            alignItems: 'center',
            px: 2,
            paddingLeft: '12px',
            paddingBottom: 0,
            paddingTop: 0,
          }}
        >
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>RA</Avatar>
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

      <Divider />

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

      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <List>
        <ItemMenu
          open={open}
          item={{
            id: 'logOut',
            path: '',
            text: 'Cerrar sesión',
            icon: ExitToAppIcon,
          }}
          index={-1}
          selectedIndex={selectedIndex}
          handleClick={handleLogout}
        />
      </List>
    </>
  );
};

export default DrawerContent;
