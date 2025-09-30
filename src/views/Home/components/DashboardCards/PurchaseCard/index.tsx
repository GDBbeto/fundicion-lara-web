import React from 'react';
import { Box, useTheme } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import useDashboard from 'views/Home/hooks/useDashboard';

import { CardLayout } from 'components/shared';

import { ERROR_MESSAGES } from 'commons/messages';

import SummaryCard from '../SummaryCard';
import { chartColors } from '../ChartCard/styles';
import ChartCard from '../ChartCard';
import { defaultLineChartConfig, formatLineChartData } from '../utils';

const PurchaseCard = () => {
  const theme = useTheme();
  const {
    summaryData,
    isSummaryLoading,
    summaryError,
    dataPurchase,
    errorPurchase,
    isLoadingPurchase,
  } = useDashboard();

  const hasError = summaryError && summaryError.status !== 404;
  const errorMessage = hasError ? ERROR_MESSAGES.DEFAULT : '';

  const chartData = formatLineChartData(dataPurchase);
  const hasData = chartData.length > 0;

  const isEmptyData = !hasData && !isLoadingPurchase;
  const hasErrorData = errorPurchase && errorPurchase.status !== 404;

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: chartColors.tooltipBg,
            padding: '8px 12px',
            border: `1px solid ${chartColors.tooltipBorder}`,
            borderRadius: '4px',
            color: chartColors.text,
          }}
        >
          <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>
            {new Date(label).toLocaleDateString('es-MX', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
          <p style={{ margin: '0', color: chartColors.purchases }}>
            {`$${payload[0].value.toLocaleString()}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <CardLayout padding={2} borderRadius={2} sx={{ height: '100%' }}>
      <Box sx={{ flex: 1, minHeight: 80 }}>
        <SummaryCard
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
      <ChartCard
        title="Gráfica de Compras"
        isLoading={isLoadingPurchase}
        isError={hasErrorData || false}
        isEmpty={isEmptyData}
        errorMessage={hasErrorData ? 'Error al cargar datos de compras' : ''}
        emptyMessage="No hay compras registradas para este período"
      >
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <AreaChart data={chartData} margin={defaultLineChartConfig.margin}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis
                dataKey="operationDate"
                tick={{ fontSize: 12 }}
                tickFormatter={(date) =>
                  new Date(date).toLocaleDateString('es-MX', {
                    month: 'short',
                    day: 'numeric',
                  })
                }
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip content={customTooltip} />
              <Area
                type="monotone"
                dataKey="amount"
                stroke={chartColors.purchases}
                fill={chartColors.purchases}
                fillOpacity={0.3}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </CardLayout>
  );
};

export default PurchaseCard;
