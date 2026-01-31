import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Box, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';

import { useDebounce } from 'use-debounce';

import { useDevice, usePermissions, useSnackbar, useErrorHandler } from 'hooks';

import {
  CustomSelectField,
  CustomSpinner,
  SearchInput,
} from 'components/shared';

import { useProductos, useSaveProduct } from 'views/Inventory/hooks';

import { downloadProducts } from 'services/productService';

import { downloadFile } from 'utils/utils';

import type { Product } from 'types/api';
import Option from 'types/option';

import { ERROR_MESSAGES, SUCCESS_MESSAGES } from 'commons/messages';
import { HttpStatusCode } from 'commons/global';

import ProductFormModal from '../ProductFormModal';

const generateProductFileName = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const timestamp = `${year}${month}${day}-${hours}${minutes}${seconds}`;
  return `productos_fundicion_${timestamp}.xlsx`;
};
const ProductToolbar = () => {
  const { isXs } = useDevice();
  const { isReadOnly } = usePermissions();
  const [open, setOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const { showSnackbar, showSnackbarError } = useSnackbar();
  const { showError } = useErrorHandler();

  const {
    products,
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

  const handleDownload = useCallback(async () => {
    try {
      setIsDownloading(true);
      const response = await downloadProducts({
        client: selectedClient || undefined,
        search: debouncedSearch || undefined,
      });

      downloadFile({
        data: response.data,
        headers: response.headers,
        defaultFileName: generateProductFileName(),
        mimeType:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      showSnackbar('Descarga iniciada exitosamente', 'success');
    } catch (downloadError) {
      showError(downloadError);
    } finally {
      setIsDownloading(false);
    }
  }, [selectedClient, debouncedSearch, showSnackbar, showError]);

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
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              justifyContent: {
                xs: 'center',
                sm: 'center',
                md: 'flex-end',
              },
            }}
          >
            <Button
              id="downloadButton"
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
              disabled={
                isDownloading ||
                (!!error && error.status !== HttpStatusCode.NotFound) ||
                products.length === 0
              }
              size={isXs ? 'small' : 'medium'}
            >
              {isXs ? 'Descargar' : 'Descargar'}
            </Button>
            <Button
              id="addButton"
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddProduct}
              disabled={
                isReadOnly ||
                (!!error && error.status !== HttpStatusCode.NotFound)
              }
              size={isXs ? 'small' : 'medium'}
            >
              {isXs ? 'Agregar' : 'Agregar producto'}
            </Button>
          </Box>
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
      {isPending || isDownloading ? <CustomSpinner open /> : null}
    </Box>
  );
};

export default ProductToolbar;
