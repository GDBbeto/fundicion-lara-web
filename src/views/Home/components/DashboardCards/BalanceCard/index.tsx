import React, { useMemo } from 'react';
import { useTheme } from '@mui/material';
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
  getBalanceColor,
} from '../utils';
import ChartCard from '../ChartCard';
import { chartColors } from '../ChartCard/styles';

const BalanceCard = () => {
  const theme = useTheme();
  const { summaryData, isSummaryLoading, summaryError } = useDashboard();

  const hasError = summaryError && summaryError.status !== 404;
  const errorMessage = hasError ? ERROR_MESSAGES.DEFAULT : '';
  const balance = summaryData?.difference || 0;

  const chartData = formatBalanceChartData(
    summaryData?.totalSales || null,
    summaryData?.totalPurchases || null,
    summaryData?.difference || null,
  );

  const hasData =
    summaryData &&
    (summaryData.totalSales > 0 || summaryData.totalPurchases > 0);
  const isEmpty = !hasData && !isSummaryLoading;
  const hasErrorData = summaryError && summaryError.status !== 404;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balance]);

  const customTooltip = ({ active, payload, label }: any) => {
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
  };

  const getBarColor = (entry: any) => {
    if (entry.name === 'Diferencia') {
      return getBalanceColor(summaryData?.difference || null);
    }
    return entry.fill;
  };

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
        errorMessage={hasErrorData ? 'Error al cargar datos del balance' : ''}
        emptyMessage="No hay datos suficientes para mostrar el balance"
      >
        <div style={{ width: '100%', height: 300 }}>
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
        </div>
      </ChartCard>
    </CardLayout>
  );
};

export default BalanceCard;
