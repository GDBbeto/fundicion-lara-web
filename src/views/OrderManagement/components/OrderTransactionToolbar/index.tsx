import React, { useEffect, useState } from 'react';
import { Box, Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDebounce } from 'use-debounce';

import { CustomDatePicker, SearchInput } from 'components/shared';

import { useDevice, useValidatedDateRange } from 'hooks';

import { HttpStatusCode } from 'commons/global';
import useOrderTransactions from 'views/OrderManagement/hooks/useOrderTransactios';
import OrderTransactionFormModal from '../OrderTransactionFormModal';

import type { OrderTransactionRequest } from 'types/api';

const OrderTransactionToolbar = () => {
  const { isSm } = useDevice();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrderTransaction, setSelectedOrderTransaction] =
    useState<OrderTransactionRequest | null>(null);

  const {
    error,
    handleSearch,
    startDate: ctxStartDate,
    endDate: ctxEndDate,
    setStartDate: setCtxStartDate,
    setEndDate: setCtxEndDate,
  } = useOrderTransactions();

  const {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    startDateError,
    endDateError,
  } = useValidatedDateRange({
    initialStartDate: ctxStartDate,
    initialEndDate: ctxEndDate,
    onValidRangeChange: (start, end) => {
      setCtxStartDate(start);
      setCtxEndDate(end);
    },
  });

  useEffect(() => {
    handleSearch(debouncedSearch);
  }, [debouncedSearch, handleSearch]);

  const handleOpenModal = () => {
    console.log('Abriendo modal para nuevo pedido');
    setSelectedOrderTransaction(null);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    console.log('Cerrando modal');
    setOpenModal(false);
    setSelectedOrderTransaction(null);
  };

  const handleSubmit = (data: OrderTransactionRequest) => {
    console.log('===== DATOS DEL FORMULARIO =====');
    console.log('Datos recibidos:', data);
    console.log(
      'Acción:',
      selectedOrderTransaction ? 'ACTUALIZAR pedido' : 'CREAR nuevo pedido',
    );
    console.log('================================');
    // TODO: Aquí se implementará la lógica de guardado con los servicios
    handleCloseModal();
  };

  return (
    <Box mb={3}>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid size={{ xs: 12, sm: 3 }}>
          <SearchInput
            id="searchTerm"
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder={`Buscar...`}
            disabled={!!error && error.status !== HttpStatusCode.NotFound}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 3, md: 2 }}>
          <CustomDatePicker
            id="startDate"
            name="startDate"
            label="Fecha inicial"
            value={startDate}
            onChange={setStartDate}
            error={!!startDateError}
            helperText={startDateError || ''}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 3, md: 2 }}>
          <CustomDatePicker
            id="endDate"
            name="endDate"
            label="Fecha final"
            value={endDate}
            onChange={setEndDate}
            error={!!endDateError}
            helperText={endDateError || ''}
          />
        </Grid>

        <Grid
          display="flex"
          justifyContent={{ xs: 'center', sm: 'flex-end' }}
          gap={1}
          size={{ xs: 12, sm: 3, md: 5 }}
        >
          <Button
            id="addButton"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenModal}
          >
            {isSm ? 'Registrar' : `Registrar pedido`}
          </Button>
        </Grid>
      </Grid>

      <OrderTransactionFormModal
        open={openModal}
        orderTransaction={selectedOrderTransaction}
        handleClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default OrderTransactionToolbar;
