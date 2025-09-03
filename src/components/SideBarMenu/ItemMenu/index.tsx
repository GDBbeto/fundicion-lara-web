import React from 'react';

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import { menuItemStyle } from '../styles';
import { MenuItem } from '../types';

interface Props {
  index: number;
  open: boolean;
  item: MenuItem;
  selectedIndex: number;
  handleClick: () => void;
}

const ItemMenu = ({ open, item, index, selectedIndex, handleClick }: Props) => {
  const Icon = item.icon;

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        onClick={handleClick}
        sx={{
          ...menuItemStyle,
        }}
        selected={selectedIndex === index}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            justifyContent: 'center',
          }}
        >
          <Icon />
        </ListItemIcon>
        <ListItemText
          primary={item.text}
          sx={{
            opacity: open ? 1 : 0,
            fontWeight: 'bold',
            transition: 'opacity 0.3s ease',
            ml: open ? 2 : 0,
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default ItemMenu;
