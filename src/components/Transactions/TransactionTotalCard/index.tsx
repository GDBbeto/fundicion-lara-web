import React from 'react';
import { Typography, Tooltip, Skeleton, IconButton, Box } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useTransactions } from 'hooks';

import { CardLayout } from 'components/shared';

import {
  mainContentStyles,
  contentSectionStyles,
  titleStyles,
  loadingContainerStyles,
  errorContainerStyles,
  errorAmountStyles,
  errorAmountTextStyles,
  errorIconStyles,
  amountContainerStyles,
  amountTextStyles,
  iconContainerStyles,
  iconWrapperStyles,
  iconStyles,
} from './styles';

const TransactionTotalCard = () => {
  const { totalAmount, isSummaryLoading, isSummaryError, label, type } =
    useTransactions();

  // Configuración visual por tipo de transacción
  const getTransactionConfig = () => {
    switch (type) {
      case 'SALE':
        return {
          icon: TrendingUpIcon,
          color: '#4caf50', // Verde para ventas
          gradient: 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)',
        };
      case 'PURCHASE':
        return {
          icon: ShoppingCartIcon,
          color: '#2196f3', // Azul para compras
          gradient: 'linear-gradient(135deg, #2196f3 0%, #64b5f6 100%)',
        };
      case 'EXPENSE':
        return {
          icon: MonetizationOnIcon,
          color: '#9c27b0', // Púrpura para gastos
          gradient: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)',
        };
      default:
        return {
          icon: MonetizationOnIcon,
          color: '#9e9e9e',
          gradient: 'linear-gradient(135deg, #9e9e9e 0%, #bdbdbd 100%)',
        };
    }
  };

  const config = getTransactionConfig();
  const IconComponent = config.icon;

  const renderContent = () => {
    if (isSummaryLoading) {
      return (
        <Box sx={loadingContainerStyles}>
          <Skeleton variant="text" width={140} height={32} />
        </Box>
      );
    }

    if (isSummaryError) {
      return (
        <Box sx={errorContainerStyles}>
          <Box sx={errorAmountStyles}>
            <Typography variant="h4" sx={errorAmountTextStyles}>
              $0.00
            </Typography>
            <Tooltip
              title={`Ocurrió un error al obtener la información.`}
              arrow
              placement="bottom-end"
            >
              <IconButton size="small" color="error" sx={errorIconStyles}>
                <ErrorOutlineIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      );
    }

    return (
      <Box sx={amountContainerStyles}>
        <NumericFormat
          id="totalAmount"
          value={totalAmount}
          displayType="text"
          thousandSeparator=","
          prefix="$"
          decimalScale={2}
          fixedDecimalScale
          renderText={(value) => (
            <Typography variant="h4" sx={amountTextStyles}>
              {value}
            </Typography>
          )}
        />
      </Box>
    );
  };

  return (
    <CardLayout
      variant="outlined"
      padding={3}
      borderRadius={4}
      elevation={0}
      gradient={true}
      topBorder={true}
      hoverEffect={false}
      fadeIn={true}
      fadeDelay={0}
      sx={{ mb: 3 }}
    >
      <Box sx={mainContentStyles}>
        {/* Contenido principal */}
        <Box sx={contentSectionStyles}>
          <Typography variant="body1" sx={titleStyles}>
            {`Total de ${label.toLowerCase()}s en el periodo seleccionado`}
          </Typography>
          {renderContent()}
        </Box>

        {/* Ícono decorativo mejorado */}
        <Box
          sx={{
            ...iconContainerStyles,
            '&::before': {
              ...iconContainerStyles['&::before'],
              background: `${config.color}20`,
            },
          }}
        >
          <Box
            sx={{
              ...iconWrapperStyles,
              background: config.gradient,
            }}
          >
            <IconComponent sx={iconStyles} />
          </Box>
        </Box>
      </Box>
    </CardLayout>
  );
};

export default TransactionTotalCard;
