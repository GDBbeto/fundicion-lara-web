import React, { useMemo } from 'react';
import { useTheme } from '@mui/material';
import { Warning, CheckCircle, Error } from '@mui/icons-material';
import Card from './Card';

interface BalanceCardProps {
  value: number | null;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

const BalanceCard: React.FC<BalanceCardProps> = ({
  value,
  isLoading = false,
  isError = false,
  errorMessage = 'Error al cargar datos',
}) => {
  const theme = useTheme();

  const balance = value || 0;

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

  return (
    <Card
      title="Balance General"
      value={balance}
      icon={fiscalStatus.icon}
      isLoading={isLoading}
      isError={isError}
      errorMessage={errorMessage}
      iconColor={fiscalStatus.color}
      valueColor={fiscalStatus.color}
      subtitle={fiscalStatus.subtitle}
    />
  );
};

export default BalanceCard;
