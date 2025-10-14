import React, { useEffect, useState } from 'react';
import { Box, Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDebounce } from 'use-debounce';

import {
  CustomDatePicker,
  SearchInput,
  CustomSpinner,
} from 'components/shared';

import {
  useDevice,
  useValidatedDateRange,
  useSnackbar,
  useErrorHandler,
} from 'hooks';

import { HttpStatusCode } from 'commons/global';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from 'commons/messages';
import {
  useOrderTransactions,
  useSaveOrderTransaction,
} from 'views/OrderManagement/hooks';
import OrderTransactionFormModal from '../OrderTransactionFormModal';

import type { OrderTransactionRequest } from 'types/api';

const OrderTransactionToolbar = () => {
  const { isSm } = useDevice();
  const { showSnackbar } = useSnackbar();
  const { showError } = useErrorHandler();

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrderTransaction, setSelectedOrderTransaction] =
    useState<OrderTransactionRequest | null>(null);

  const {
    error,
    handleSearch,
    handleRefresh,
    startDate: ctxStartDate,
    endDate: ctxEndDate,
    setStartDate: setCtxStartDate,
    setEndDate: setCtxEndDate,
  } = useOrderTransactions();

  const { mutate: saveOrderTransaction, isPending } = useSaveOrderTransaction();

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
    setSelectedOrderTransaction(null);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOrderTransaction(null);
  };

  const handleSubmit = (data: OrderTransactionRequest) => {
    saveOrderTransaction(data, {
      onSuccess: () => {
        handleCloseModal();
        handleRefresh();
        showSnackbar(SUCCESS_MESSAGES.CREATED, 'success');
      },
      onError: (errorSave) => {
        showError(errorSave, ERROR_MESSAGES.CREATE);
      },
    });
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

      {isPending && <CustomSpinner open />}
    </Box>
  );
};

export default OrderTransactionToolbar;
