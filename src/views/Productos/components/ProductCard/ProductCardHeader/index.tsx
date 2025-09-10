import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Chip,
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { productNameStyles } from '../styles';

interface Props {
  name: string;
  client?: string | null;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductCardHeader = ({ name, client, onEdit, onDelete }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleEdit = () => {
    onEdit();
    handleClose();
  };

  const handleDelete = () => {
    onDelete();
    handleClose();
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px={2}
      pt={1}
      pb={1}
    >
      <Tooltip title={name} arrow placement="top">
        <Typography variant="h6" sx={productNameStyles}>
          {name}
        </Typography>
      </Tooltip>

      {client && (
        <Tooltip title="Cliente" arrow placement="top">
          <Chip
            label={client}
            color="primary"
            size="small"
            sx={{
              fontWeight: 500,
              backgroundColor: 'primary.light',
              color: 'white',
              textTransform: 'uppercase',
            }}
          />
        </Tooltip>
      )}

      <IconButton
        aria-label="more"
        aria-controls={open ? 'product-menu' : undefined}
        aria-haspopup="true"
        onClick={handleMenuClick}
        size="small"
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>

      <Menu
        id="product-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEdit}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Editar
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Eliminar
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ProductCardHeader;
