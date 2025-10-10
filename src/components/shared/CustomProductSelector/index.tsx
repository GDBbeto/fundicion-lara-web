import React, { useState } from 'react';
import {
  Autocomplete,
  TextField,
  Box,
  Typography,
  CircularProgress,
  Avatar,
  Chip,
} from '@mui/material';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';

import { getProducts } from 'services/productService';
import { ApiResponse, Product, CommonError } from 'types/api';
import noImagePlaceholder from 'assets/images/product-placeholder.png';

interface CustomProductSelectorProps {
  value: number | null;
  onChange: (productId: number | null, product: Product | null) => void;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  size?: 'small' | 'medium';
}

const CustomProductSelector = ({
  value,
  onChange,
  error = false,
  helperText = '',
  required = false,
  disabled = false,
  label = 'Producto',
  ...rest
}: CustomProductSelectorProps) => {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data, isLoading } = useQuery<ApiResponse<Product[]>, CommonError>({
    queryKey: ['products', debouncedSearch],
    queryFn: () =>
      getProducts({
        order: 'asc',
        orderBy: 'name',
        search: debouncedSearch,
      }),
  });

  const products = data?.data || [];

  // Encontrar el producto seleccionado actual
  const currentProduct =
    selectedProduct || products.find((p) => p.productId === value) || null;

  const handleChange = (_event: any, newValue: Product | null) => {
    setSelectedProduct(newValue);
    onChange(newValue?.productId || null, newValue);
  };

  return (
    <Autocomplete
      size={rest.size ?? 'small'}
      value={currentProduct}
      onChange={handleChange}
      inputValue={search}
      onInputChange={(_event, newInputValue) => {
        setSearch(newInputValue);
      }}
      options={products}
      getOptionLabel={(option) => option.name || ''}
      isOptionEqualToValue={(option, valueOption) =>
        option.productId === valueOption?.productId
      }
      filterOptions={(x) => x}
      loading={isLoading}
      disabled={disabled}
      noOptionsText="No se encontraron productos"
      loadingText="Buscando productos..."
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          required={required}
          error={error}
          helperText={helperText}
          placeholder="Buscar producto..."
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <Box
          component="li"
          {...props}
          key={option.productId}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            py: 1.5,
            px: 2,
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <Avatar
            src={option.avatar || noImagePlaceholder}
            alt={option.name}
            sx={{
              width: 50,
              height: 50,
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider',
            }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {option.name}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              Cliente: {option.client || 'Sin cliente'}
            </Typography>
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}
            >
              <Chip
                label={`${option.stock || 0} ${option.unidad || ''}`}
                size="small"
                color={
                  (option.stock || 0) > 10
                    ? 'success'
                    : (option.stock || 0) > 0
                      ? 'warning'
                      : 'error'
                }
                sx={{ height: 20, fontSize: '0.7rem' }}
              />
            </Box>
          </Box>
        </Box>
      )}
    />
  );
};

export default CustomProductSelector;
