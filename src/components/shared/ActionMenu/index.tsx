import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { colors } from 'commons/colors';

export interface ActionItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  color?: string;
  disabled?: boolean;
}

interface ActionMenuProps {
  actions: ActionItem[];
  size?: 'small' | 'medium' | 'large';
  iconColor?: string;
  hoverColor?: string;
  alignItems?: 'flex-start' | 'center';
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  actions,
  size = 'small',
  alignItems = 'center',
  iconColor = colors.darkText,
  hoverColor = colors.darkBlue,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleActionClick = (action: ActionItem) => {
    if (!action.disabled) {
      action.onClick();
    }
    handleClose();
  };

  return (
    <>
      <IconButton
        size={size}
        onClick={handleMenuClick}
        sx={{
          color: iconColor,
          '&:hover': {
            backgroundColor: `${hoverColor}10`,
            color: hoverColor,
          },
        }}
      >
        <MoreVert fontSize={size} />
      </IconButton>

      <Menu
        id="action-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            border: `1px solid ${colors.lightSurface}`,
            minWidth: 160,
          },
        }}
      >
        {actions.map((action) => (
          <MenuItem
            key={action.id}
            onClick={() => handleActionClick(action)}
            disabled={action.disabled}
            sx={{
              py: 1.5,
              px: 2,
              opacity: action.disabled ? 0.5 : 1,
              '&:hover': {
                backgroundColor: action.color
                  ? `${action.color}10`
                  : `${hoverColor}10`,
              },
              alignItems,
            }}
          >
            <Box sx={{ mr: 1.5, color: action.color || hoverColor }}>
              {action.icon}
            </Box>
            <Typography
              variant="body2"
              fontWeight={500}
              sx={{ color: action.disabled ? 'text.disabled' : 'inherit' }}
            >
              {action.label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ActionMenu;
