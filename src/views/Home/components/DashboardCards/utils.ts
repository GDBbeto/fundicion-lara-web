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
): any[] => {
  return [
    {
      name: 'Ventas',
      value: totalSales || 0,
      fill: '#2E7D32', // Verde para ventas
    },
    {
      name: 'Compras',
      value: totalPurchases || 0,
      fill: '#1976D2', // Azul para compras
    },
    {
      name: 'Diferencia',
      value: Math.abs(difference || 0),
      fill: difference && difference >= 0 ? '#FF9800' : '#D32F2F', // Naranja si positivo, rojo si negativo
    },
  ];
};

/**
 * Obtiene el color basado en el estado del balance
 * @param difference Diferencia entre ventas y compras
 * @returns Color hexadecimal
 */
export const getBalanceColor = (difference: number | null): string => {
  if (!difference) return '#666';
  if (difference === 0) return '#2E7D32'; // Verde para equilibrio
  if (difference > 0) return '#FF9800'; // Naranja para ventas > compras
  return '#D32F2F'; // Rojo para compras > ventas
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
  margin: { top: 20, right: 0, left: 0, bottom: 5 },
  dot: { r: 4 },
  activeDot: { r: 6 },
};

/**
 * Configuración por defecto para gráficas de barras
 */
export const defaultBarChartConfig = {
  height: 200,
  margin: { top: 20, right: 0, left: 0, bottom: 5 },
  barSize: 60,
};
