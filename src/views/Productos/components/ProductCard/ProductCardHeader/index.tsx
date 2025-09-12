import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Stack,
  useTheme,
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person'; // Icono decorativo para el chip

import { productNameStyles } from '../styles';

interface Props {
  name: string;
  client?: string | null;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductCardHeader = ({ name, client, onEdit, onDelete }: Props) => {
  const { palette } = useTheme();
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
      <Stack
        spacing={0}
        maxWidth="80%"
        width={'80%'}
        direction="column"
        justifyContent="center"
      >
        <Tooltip title={name} arrow>
          <Typography variant="subtitle1" sx={productNameStyles}>
            {name}
          </Typography>
        </Tooltip>

        <Box display="flex" alignItems="center" gap={0.5}>
          <PersonIcon
            fontSize="small"
            color={client ? 'inherit' : 'disabled'}
            sx={{ padding: 0, margin: 0 }}
          />
          <Typography
            variant="button"
            noWrap
            sx={{
              color: client ? palette.text.primary : 'text.disabled',
            }}
          >
            {client || 'Sin cliente'}
          </Typography>
        </Box>
      </Stack>

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
