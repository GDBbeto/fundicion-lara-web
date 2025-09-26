import React from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';

import CustomSelectField from 'components/shared/CustomSelectField';

import { useDevice } from 'hooks';

import useDashboard from '../../hooks/useDashboard';

const PeriodFilter = () => {
  const theme = useTheme();
  const { isSmallScreen } = useDevice();

  const {
    selectedMonth,
    setSelectedMonth,
    monthOptions,
    yearOptions,
    isSummaryLoading,
    selectedYear,
    setSelectedYear,
  } = useDashboard();

  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    setSelectedMonth(selectedValue);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    setSelectedYear(selectedValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 0,
        px: 2,
        textAlign: 'center',
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: isSmallScreen ? 2 : 2.5,
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          maxWidth: isSmallScreen ? '100%' : 500,
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            variant={isSmallScreen ? 'subtitle2' : 'subtitle1'}
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 600,
              mb: 0,
            }}
          >
            📅 Seleccionar período
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: isSmallScreen ? 1.5 : 2,
              width: '100%',
              flexDirection: isSmallScreen ? 'column' : 'row',
            }}
          >
            <CustomSelectField
              label="Mes"
              value={selectedMonth}
              onChange={handleMonthChange}
              options={monthOptions}
              disabled={isSummaryLoading}
              sx={{
                flex: isSmallScreen ? 'none' : 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
                '& .MuiInputLabel-root': {
                  fontWeight: 500,
                },
              }}
            />

            <CustomSelectField
              label="Año"
              value={selectedYear}
              onChange={handleYearChange}
              options={yearOptions}
              disabled={isSummaryLoading}
              sx={{
                flex: isSmallScreen ? 'none' : 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
                '& .MuiInputLabel-root': {
                  fontWeight: 500,
                },
              }}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default PeriodFilter;
