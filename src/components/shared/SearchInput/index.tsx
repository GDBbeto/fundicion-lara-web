import React, { memo } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
}

const SearchInput = memo(
  ({
    value,
    onChange,
    placeholder = 'Buscar...',
    disabled = false,
    autoFocus = false,
  }: Props) => {
    const handleClear = () => {
      onChange('');
    };

    return (
      <TextField
        size="small"
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        variant="outlined"
        color="primary"
        disabled={disabled}
        autoFocus={autoFocus}
        autoComplete="off"
        aria-label={placeholder}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 16,
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'text.secondary' }} />
            </InputAdornment>
          ),
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton
                aria-label="Limpiar búsqueda"
                onClick={handleClear}
                edge="end"
                size="small"
                disabled={disabled}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  },
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
