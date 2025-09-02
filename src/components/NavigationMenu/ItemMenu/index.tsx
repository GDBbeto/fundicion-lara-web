import React, { JSX } from 'react';

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import { menuItemStyle } from '../styles';

interface Props {
  index: number;
  open: boolean;
  item: { text: string; icon: JSX.Element };
  selectedIndex: number;
  handleClick: () => void;
}

const ItemMenu = ({ open, item, index, selectedIndex, handleClick }: Props) => {
  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        onClick={handleClick}
        sx={{
          ...menuItemStyle,
          backgroundColor: selectedIndex === index ? '#d0d0d0' : 'transparent',
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            justifyContent: 'center',
          }}
        >
          {item.icon}
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
