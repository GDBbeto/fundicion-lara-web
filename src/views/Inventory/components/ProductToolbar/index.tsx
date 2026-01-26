import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Box, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useDebounce } from 'use-debounce';

import { useDevice, usePermissions, useSnackbar } from 'hooks';

import {
  CustomSelectField,
  CustomSpinner,
  SearchInput,
} from 'components/shared';

import { useProductos, useSaveProduct } from 'views/Inventory/hooks';

import type { Product } from 'types/api';
import Option from 'types/option';

import { ERROR_MESSAGES, SUCCESS_MESSAGES } from 'commons/messages';
import { HttpStatusCode } from 'commons/global';

import ProductFormModal from '../ProductFormModal';

const ProductToolbar = () => {
  const { isXs } = useDevice();
  const { isReadOnly } = usePermissions();
  const [open, setOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const { showSnackbar, showSnackbarError } = useSnackbar();

  const {
    handleSearch,
    handleClientChange,
    selectedClient,
    clients,
    error,
    handleRefresh,
  } = useProductos();
  const { mutate: saveProduct, isPending } = useSaveProduct();

  const clientOptions: Option[] = useMemo(() => {
    const options: Option[] = [
      { value: '', label: 'Todos los clientes' },
      ...clients.map((client: string) => ({ value: client, label: client })),
    ];
    return options;
  }, [clients]);

  const handleAddProduct = () => {
    setOpen(true);
  };

  const handleSearchInputChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const handleClientSelectChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleClientChange(event.target.value);
    },
    [handleClientChange],
  );

  const handleSubmit = (productData: Product) => {
    saveProduct(productData, {
      onSuccess: () => {
        setOpen(false);
        handleRefresh();
        showSnackbar(SUCCESS_MESSAGES.CREATED, 'success');
      },
      onError: (customError) => {
        showSnackbarError(customError, ERROR_MESSAGES.DEFAULT);
      },
    });
  };

  useEffect(() => {
    handleSearch(debouncedSearch);
  }, [debouncedSearch, handleSearch]);

  return (
    <Box mb={3}>
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <SearchInput
            id="searchTerm"
            value={searchTerm}
            onChange={handleSearchInputChange}
            placeholder="Buscar productos..."
            disabled={!!error && error.status !== HttpStatusCode.NotFound}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <CustomSelectField
            id="clientSelect"
            label="Cliente"
            value={selectedClient}
            onChange={handleClientSelectChange}
            options={clientOptions}
            disabled={!!error && error.status !== HttpStatusCode.NotFound}
            size={'small'}
          />
        </Grid>

        <Grid
          size={{ xs: 12, sm: 12, md: 4 }}
          textAlign={{ xs: 'center', sm: 'center', md: 'right' }}
        >
          <Button
            id="addButton"
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddProduct}
            disabled={
              isReadOnly ||
              (!!error && error.status !== HttpStatusCode.NotFound)
            }
            fullWidth={isXs || false}
          >
            {isXs ? 'Agregar' : ' Agregar producto'}
          </Button>
        </Grid>
      </Grid>
      {open ? (
        <ProductFormModal
          open={open}
          product={null}
          handleClose={() => setOpen(false)}
          onSubmit={handleSubmit}
        />
      ) : null}
      {isPending ? <CustomSpinner open /> : null}
    </Box>
  );
};

export default ProductToolbar;
