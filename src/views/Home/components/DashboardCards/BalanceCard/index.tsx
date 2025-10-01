import React, { useMemo, useCallback } from 'react';
import { Box, useTheme } from '@mui/material';
import { Warning, CheckCircle, Error } from '@mui/icons-material';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

import useDashboard from 'views/Home/hooks/useDashboard';

import { ERROR_MESSAGES } from 'commons/messages';
import { CardLayout } from 'components/shared';

import SummaryCard from '../SummaryCard';
import {
  formatBalanceChartData,
  defaultBarChartConfig,
  formatTooltipValue,
} from '../utils';
import ChartCard from '../ChartCard';
import { chartColors } from '../ChartCard/styles';

const BalanceCard = () => {
  const theme = useTheme();
  const { summaryData, isSummaryLoading, summaryError } = useDashboard();

  const balance = summaryData?.difference || 0;

  const hasError = summaryError && summaryError.status !== 404;
  const errorMessage = useMemo(
    () => (hasError ? ERROR_MESSAGES.DISPLAY : ''),
    [hasError],
  );

  const chartData = useMemo(
    () =>
      formatBalanceChartData(
        summaryData?.totalSales || null,
        summaryData?.totalPurchases || null,
        summaryData?.difference || null,
        theme,
      ),
    [summaryData, theme],
  );

  const hasData = useMemo(
    () =>
      summaryData &&
      (summaryData.totalSales > 0 || summaryData.totalPurchases > 0),
    [summaryData],
  );

  const isEmpty = useMemo(
    () => !hasData && !isSummaryLoading,
    [hasData, isSummaryLoading],
  );
  const hasErrorData = useMemo(
    () => summaryError && summaryError.status !== 404,
    [summaryError],
  );

  const fiscalStatus = useMemo(() => {
    if (balance === 0) {
      return {
        status: 'ideal',
        color: theme.palette.success.main,
        bgColor: 'rgba(46, 125, 50, 0.1)',
        icon: <CheckCircle sx={{ fontSize: 20 }} />,
        subtitle: 'Tus ventas y compras están en equilibrio.',
      };
    }

    if (balance > 0) {
      return {
        status: 'warning',
        color: theme.palette.warning.main,
        bgColor: 'rgba(255, 152, 0, 0.1)',
        icon: <Warning sx={{ fontSize: 20 }} />,
        subtitle:
          'Tus ventas superan a tus compras, registra más compras para equilibrar',
      };
    }

    return {
      status: 'critical',
      color: theme.palette.error.main,
      bgColor: 'rgba(211, 47, 47, 0.1)',
      icon: <Error sx={{ fontSize: 20 }} />,
      subtitle:
        'Tus compras superan a tus ventas, revisa tus registros urgentemente',
    };
  }, [balance, theme.palette]);

  const customTooltip = useCallback(
    ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
        const data = payload[0].payload;
        let displayValue = formatTooltipValue(data.value);

        if (label === 'Diferencia' && summaryData?.difference) {
          displayValue = formatTooltipValue(Math.abs(summaryData.difference));
        }

        return (
          <div
            style={{
              backgroundColor: 'white',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              fontSize: '12px',
            }}
          >
            <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>{label}</p>
            <p style={{ margin: '0', color: data.fill }}>{displayValue}</p>
          </div>
        );
      }
      return null;
    },
    [summaryData],
  );

  const getBarColor = useCallback(
    (entry: any) => {
      if (entry.name === 'Diferencia') {
        if (balance === 0) return theme.palette.success.main;
        if (balance > 0) return theme.palette.warning.main;
        return theme.palette.error.main;
      }
      return entry.fill;
    },
    [balance, theme.palette],
  );

  return (
    <CardLayout padding={2} borderRadius={2} sx={{ height: '100%' }}>
      <SummaryCard
        title="Balance General"
        value={balance}
        icon={fiscalStatus.icon}
        isLoading={isSummaryLoading}
        isError={hasError || false}
        errorMessage={errorMessage}
        iconColor={fiscalStatus.color}
        valueColor={fiscalStatus.color}
        subtitle={fiscalStatus.subtitle}
      />

      <ChartCard
        title="Balance Fiscal"
        isLoading={false}
        isError={hasErrorData ?? false}
        isEmpty={isEmpty}
        errorMessage={
          hasErrorData ? 'No se pudo obtener la información del balance' : ''
        }
        emptyMessage="No hay datos suficientes para mostrar el balance"
      >
        <Box sx={{ width: '100%', height: { md: 250, xl: 300 } }}>
          <ResponsiveContainer>
            <BarChart data={chartData} margin={defaultBarChartConfig.margin}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11 }}
                stroke={chartColors.text}
              />
              <YAxis
                tick={{ fontSize: 11 }}
                stroke={chartColors.text}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={customTooltip} />
              <Bar
                dataKey="value"
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
                barSize={60}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </ChartCard>
    </CardLayout>
  );
};

export default React.memo(BalanceCard);
