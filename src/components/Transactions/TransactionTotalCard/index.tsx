import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Tooltip,
  Skeleton,
  IconButton,
  Box,
  Fade,
} from '@mui/material';
import { NumericFormat } from 'react-number-format';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import { useTransactions } from 'hooks';

import {
  fadeStyles,
  cardStyles,
  cardContentStyles,
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

interface Props {
  title: string;
  errorMessage?: string;
}

const TransactionTotalCard: React.FC<Props> = ({
  title,
  errorMessage = 'Ocurri\u00F3 un error al obtener la informaci\u00F3n.',
}) => {
  const { totalAmount, isSummaryLoading, isSummaryError } = useTransactions();

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
            <Tooltip title={errorMessage} arrow placement="bottom-end">
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
    <Fade {...fadeStyles}>
      <Card elevation={0} sx={cardStyles}>
        <CardContent sx={cardContentStyles}>
          <Box sx={mainContentStyles}>
            {/* Contenido principal */}
            <Box sx={contentSectionStyles}>
              <Typography variant="body1" sx={titleStyles}>
                {title}
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
        </CardContent>
      </Card>
    </Fade>
  );
};

export default TransactionTotalCard;
