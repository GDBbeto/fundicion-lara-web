import React from 'react';
import { Typography, Tooltip, Skeleton, IconButton, Box } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

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
  const { totalAmount, isSummaryLoading, isSummaryError, label } =
    useTransactions();

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
        <Box sx={iconContainerStyles}>
          <Box sx={iconWrapperStyles}>
            <MonetizationOnIcon sx={iconStyles} />
          </Box>
        </Box>
      </Box>
    </CardLayout>
  );
};

export default TransactionTotalCard;
