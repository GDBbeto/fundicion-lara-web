import { Theme } from '@mui/material';
import { Transaction } from 'types/api';

/**
 * Formatea los datos de transacciones para gráficas de línea
 * @param transactions Array de transacciones
 * @returns Array de datos formateados para recharts
 */
export const formatLineChartData = (
  transactions: Transaction[] | null,
): any[] => {
  if (!transactions || transactions.length === 0) {
    return [];
  }

  const grouped = transactions.reduce<Record<string, number>>((acc, item) => {
    acc[item.operationDate] =
      (acc[item.operationDate] || 0) + (item.amount || 0);
    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([date, total]) => ({
      operationDate: date,
      amount: total,
    }))
    .sort(
      (a, b) =>
        new Date(a.operationDate).getTime() -
        new Date(b.operationDate).getTime(),
    );
};

/**
 * Formatea los datos para la gráfica de balance (barras)
 * @param totalSales Total de ventas
 * @param totalPurchases Total de compras
 * @param difference Diferencia entre ventas y compras
 * @returns Array de datos formateados para recharts
 */
export const formatBalanceChartData = (
  totalSales: number | null,
  totalPurchases: number | null,
  difference: number | null,
  theme: Theme,
): any[] => {
  return [
    {
      name: 'Ventas',
      value: totalSales || 0,
      fill: theme.palette.success.main, // Verde para ventas
    },
    {
      name: 'Compras',
      value: totalPurchases || 0,
      fill: theme.palette.primary.main,
    },
    {
      name: 'Diferencia',
      value: Math.abs(difference || 0),
      fill:
        difference && difference >= 0
          ? theme.palette.warning.main
          : theme.palette.error.main, // Naranja si positivo, rojo si negativo
    },
  ];
};

/**
 * Formatea el valor para mostrar en tooltips
 * @param value Valor numérico
 * @returns Valor formateado como moneda
 */
export const formatTooltipValue = (value: number): string => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Configuración por defecto para gráficas de línea
 */
export const defaultLineChartConfig = {
  height: 200,
  margin: { top: 20, right: 0, left: 0, bottom: 0 },
  dot: { r: 4 },
  activeDot: { r: 6 },
};

/**
 * Configuración por defecto para gráficas de barras
 */
export const defaultBarChartConfig = {
  height: 200,
  margin: { top: 20, right: 0, left: 0, bottom: 0 },
  barSize: 60,
};
