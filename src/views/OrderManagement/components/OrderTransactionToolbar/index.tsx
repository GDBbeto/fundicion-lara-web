import React, { useEffect, useState } from 'react';
import { Box, Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDebounce } from 'use-debounce';

import { CustomDatePicker, SearchInput } from 'components/shared';

import { useDevice, useValidatedDateRange } from 'hooks';

import { HttpStatusCode } from 'commons/global';
import useOrderTransactions from 'views/OrderManagement/hooks/useOrderTransactios';

const OrderTransactionToolbar = () => {
  const { isSm } = useDevice();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [openModal, setOpenModal] = useState(false);

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
            onClick={() => setOpenModal(true)}
          >
            {isSm ? 'Registrar' : `Registrar pedido`}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderTransactionToolbar;
