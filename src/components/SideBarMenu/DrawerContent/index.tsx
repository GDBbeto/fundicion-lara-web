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

import logo from 'assets/images/logo.png';

import ItemMenu from '../ItemMenu';
import { MenuItem } from '../types';

interface Props {
  open: boolean;
  menuItems: MenuItem[];
  selectedIndex: number;
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
      <ListItem
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2,
          paddingLeft: '12px',
          paddingBottom: 0,
          paddingTop: 0,
          mt: 2,
        }}
      >
        <Avatar
          variant="circular"
          sx={{
            width: 36,
            height: 36,
            bgcolor: theme.palette.common.white,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
          imgProps={{ style: { objectFit: 'contain' } }}
          src={logo}
          alt="Fundición Lara"
        />
        <ListItemText
          primary="Fundición"
          secondary="Lara"
          sx={{
            opacity: open ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
          slotProps={{
            primary: {
              sx: {
                color: theme.palette.common.white,
                fontWeight: 700,
                letterSpacing: 0.5,
              },
            },
            secondary: {
              sx: {
                color: theme.palette.common.white,
                opacity: 0.8,
                mt: -0.3,
                fontWeight: 500,
              },
            },
          }}
        />
      </ListItem>

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
            text: 'Cerrar sesi\u00F3n',
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
