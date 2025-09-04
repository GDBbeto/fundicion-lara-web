import React from 'react';

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import { menuItemStyle } from '../styles';
import { MenuItem } from '../types';
import { colors } from 'commons/colors';

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
          color: selectedIndex === index ? colors.white : colors.blueGreyLight,
        }}
        selected={selectedIndex === index}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            justifyContent: 'center',
            color:
              selectedIndex === index ? colors.lightBlue : colors.blueGreyLight,
          }}
        >
          <Icon />
        </ListItemIcon>

        <ListItemText
          primary={item.text}
          sx={{
            opacity: open ? 1 : 0,
            ml: open ? 2 : 0,
            transition: 'opacity 0.3s ease',
            span: {
              fontWeight: 500,
              fontSize: '0.95rem',
              color:
                selectedIndex === index
                  ? colors.lightBlue
                  : colors.blueGreyLight,
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default ItemMenu;
