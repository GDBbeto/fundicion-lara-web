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
      <ListItem
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          paddingLeft: '12px',
          paddingBottom: 0,
          paddingTop: 0,
          marginTop: 2,
        }}
      >
        <Avatar
          sx={{
            bgcolor: theme.palette.common.white,
            color: theme.palette.primary.main,
          }}
        >
          RA
        </Avatar>
        <ListItemText
          primary="Roberto Aguilar"
          secondary="Administrador"
          sx={{
            ml: open ? 2 : 0,
            opacity: open ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
          slotProps={{
            primary: {
              sx: {
                color: theme.palette.common.white,
                fontWeight: 500,
              },
            },
            secondary: {
              sx: {
                color: theme.palette.common.white,
                opacity: 0.8,
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
