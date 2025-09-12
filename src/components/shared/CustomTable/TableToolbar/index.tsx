import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';

import {
  toolbarContainer,
  titleStyles,
  refreshButton,
  toggleGroupStyles,
} from './styles';

interface Props {
  title?: string;
  dense: boolean;
  onToggleDense: (value: boolean) => void;
  onRefresh?: () => void;
}

const TableToolbar = ({
  title = 'Lista de elementos',
  dense,
  onToggleDense,
  onRefresh,
}: Props) => {
  const theme = useTheme();

  const handleDensityToggle = (
    _: React.MouseEvent<HTMLElement>,
    newValue: 'comfortable' | 'compact' | null,
  ) => {
    if (newValue !== null) {
      onToggleDense(newValue === 'compact');
    }
  };

  return (
    <Box sx={toolbarContainer(theme)}>
      {/* Título y botón de refrescar */}
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="h6" fontWeight={600} sx={titleStyles(theme)}>
          {title}
        </Typography>

        {onRefresh && (
          <IconButton
            onClick={onRefresh}
            size="small"
            sx={refreshButton(theme)}
          >
            <RefreshIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      {/* Botón de densidad */}
      <ToggleButtonGroup
        size="small"
        value={dense ? 'compact' : 'comfortable'}
        exclusive
        onChange={handleDensityToggle}
        aria-label="Modo de tabla"
        sx={toggleGroupStyles(theme)}
      >
        <ToggleButton value="comfortable" aria-label="Cómoda">
          <ViewStreamIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value="compact" aria-label="Compacta">
          <ViewCompactIcon fontSize="small" />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default TableToolbar;
