import React from 'react';
import { Box, useTheme } from '@mui/material';
import { AttachMoney, ShoppingCart } from '@mui/icons-material';
import useDashboard from '../../hooks/useDashboard';
import { ERROR_MESSAGES } from 'commons/messages';
import Card from './Card';
import BalanceCard from './BalanceCard';

const SummaryCards: React.FC = () => {
  const theme = useTheme();
  const {
    summaryData,
    isSummaryLoading,
    summaryError,
    dataSale,
    dataPurchase,
  } = useDashboard();

  const hasError = summaryError && summaryError.status !== 404;
  const errorMessage = hasError ? ERROR_MESSAGES.DEFAULT : '';

  return (
    <Box sx={{ my: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 1.5,
        }}
      >
        {/* Tarjeta de Ventas Totales */}
        <Box sx={{ flex: 1, minHeight: 80 }}>
          <Card
            title="Ventas"
            value={summaryData?.totalSales || null}
            icon={<AttachMoney sx={{ fontSize: 20 }} />}
            isLoading={isSummaryLoading}
            isError={!!hasError}
            errorMessage={errorMessage}
            iconColor={theme.palette.success.main}
            valueColor={theme.palette.success.main}
            subtitle={`Ventas registradas: ${dataSale?.length || 0}`}
          />
        </Box>

        {/* Tarjeta de Compras Totales */}
        <Box sx={{ flex: 1, minHeight: 80 }}>
          <Card
            title="Compras"
            value={summaryData?.totalPurchases || null}
            icon={<ShoppingCart sx={{ fontSize: 20 }} />}
            isLoading={isSummaryLoading}
            isError={!!hasError}
            errorMessage={errorMessage}
            iconColor={theme.palette.primary.main}
            valueColor={theme.palette.primary.main}
            subtitle={`Compras registradas: ${dataPurchase?.length || 0}`}
          />
        </Box>

        {/* Tarjeta de Balance */}
        <Box sx={{ flex: 1, minHeight: 80 }}>
          <BalanceCard
            value={summaryData?.difference || null}
            isLoading={isSummaryLoading}
            isError={hasError || false}
            errorMessage={errorMessage}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SummaryCards;
