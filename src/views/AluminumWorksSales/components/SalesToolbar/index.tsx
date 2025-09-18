import React, { useEffect, useState } from 'react';
import { Box, Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDebounce } from 'use-debounce';

import { SearchInput } from 'components/shared';
import { CustomDatePicker } from 'components/ui';

import { useDevice, useTransactions, useValidatedDateRange } from 'hooks';
import SaleFormModal from '../SaleFormModal';

const SalesToolbar = () => {
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
  } = useTransactions();

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

  const handleAddSale = () => {
    setOpenModal(true);
  };

  return (
    <Box mb={3}>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid size={{ xs: 12, sm: 3 }}>
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar ventas..."
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
            onClick={handleAddSale}
          >
            {isSm ? 'Venta' : 'Registrar venta'}
          </Button>
          {openModal ? (
            <SaleFormModal
              open={openModal}
              handleClose={() => setOpenModal(false)}
              onSubmit={(data) => console.log(data)}
            />
          ) : null}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SalesToolbar;
