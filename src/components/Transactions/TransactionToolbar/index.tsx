import React, { useEffect, useState } from 'react';
import { Box, Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDebounce } from 'use-debounce';

import { CustomSpinner, SearchInput } from 'components/shared';
import { CustomDatePicker } from 'components/ui';

import {
  useDevice,
  useSaveTransaction,
  useSnackbar,
  useTransactions,
  useValidatedDateRange,
} from 'hooks';

import { ERROR_MESSAGES, SUCCESS_MESSAGES } from 'commons/messages';
import type { Transaction } from 'types/api';
import TransactionFormModal from '../TransactionFormModal';

const TransactionToolbar = () => {
  const { isSm } = useDevice();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [openModal, setOpenModal] = useState(false);

  const {
    label,
    error,
    handleSearch,
    startDate: ctxStartDate,
    endDate: ctxEndDate,
    setStartDate: setCtxStartDate,
    setEndDate: setCtxEndDate,
    handleRefresh,
  } = useTransactions();

  const { mutate: saveTransaction, isPending } = useSaveTransaction();
  const { showSnackbar } = useSnackbar();

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

  const handleSubmit = (transactionData: Transaction) => {
    saveTransaction(transactionData, {
      onSuccess: () => {
        setOpenModal(false);
        handleRefresh();
        showSnackbar(SUCCESS_MESSAGES.CREATED, 'success');
      },
      onError: (customError) => {
        showSnackbar(
          customError?.userMessage || ERROR_MESSAGES.DEFAULT,
          'error',
        );
      },
    });
  };

  return (
    <Box mb={3}>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid size={{ xs: 12, sm: 3 }}>
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder={`Buscar ${label.toLowerCase()}s...`}
            disabled={!!error && error.status !== 404}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 3, md: 2 }}>
          <CustomDatePicker
            label="Fecha inicial"
            value={startDate}
            onChange={setStartDate}
            error={!!startDateError}
            helperText={startDateError || ''}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 3, md: 2 }}>
          <CustomDatePicker
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
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setOpenModal(true)}
          >
            {isSm ? label : `Registrar ${label.toLowerCase()}`}
          </Button>

          {openModal && (
            <TransactionFormModal
              open={openModal}
              handleClose={() => setOpenModal(false)}
              onSubmit={handleSubmit}
            />
          )}

          {isPending && <CustomSpinner open />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default TransactionToolbar;
