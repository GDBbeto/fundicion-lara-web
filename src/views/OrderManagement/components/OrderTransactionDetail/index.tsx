import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Chip,
  Avatar,
  Grid,
  Paper,
} from '@mui/material';
import {
  CalendarToday,
  Receipt,
  Person,
  ShoppingBag,
  Inventory2,
  AttachMoney,
  TrendingUp,
  CreditCard,
  Description,
  LocalShipping,
  Payment,
} from '@mui/icons-material';
import { NumericFormat } from 'react-number-format';

import type { OrderTransaction } from 'types/api';
import { colors } from 'commons/colors';
import { formatDateToDisplay } from 'utils/dateUtils';
import {
  getDeliveryStatusOption,
  getPaymentStatusOption,
  getMethodPaymentOption,
} from 'utils/catalogs';

interface OrderTransactionDetailProps {
  transaction: OrderTransaction;
}

const OrderTransactionDetail = ({
  transaction,
}: OrderTransactionDetailProps) => {
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'INCOMPLETE':
        return 'error';
      default:
        return 'default';
    }
  };

  const getDeliveryStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'success';
      case 'IN_TRANSIT':
        return 'info';
      case 'PENDING':
        return 'warning';
      case 'ON_HOLD':
        return 'secondary';
      case 'CANCELLED':
        return 'error';
      default:
        return 'default';
    }
  };

  const InfoItem = ({
    icon,
    label,
    value,
    valueColor,
  }: {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
    valueColor?: string;
  }) => (
    <Stack direction="row" spacing={1.5} alignItems="flex-start">
      <Box
        sx={{
          color: colors.darkBlue,
          mt: 0.3,
          minWidth: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </Box>
      <Box flex={1}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', mb: 0.3, fontWeight: 500 }}
        >
          {label}
        </Typography>
        <Typography
          variant="body2"
          fontWeight={600}
          sx={{ color: valueColor || colors.darkText }}
        >
          {value}
        </Typography>
      </Box>
    </Stack>
  );

  return (
    <Box>
      {/* Header con producto */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          mb: 3,
          background: `linear-gradient(135deg, ${colors.lightBlue}15 0%, ${colors.darkBlue}10 100%)`,
          border: `1px solid ${colors.lightBlue}40`,
          borderRadius: 2,
        }}
      >
        <Stack direction="row" spacing={2.5} alignItems="center">
          <Avatar
            src={transaction.productImageUrl || undefined}
            alt={transaction.productName}
            variant="rounded"
            sx={{
              width: 80,
              height: 80,
              bgcolor: colors.lightBlue,
              color: colors.darkBlue,
            }}
          >
            <Inventory2 sx={{ fontSize: 40 }} />
          </Avatar>
          <Box flex={1}>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                color: colors.darkText,
                mb: 0.5,
                lineHeight: 1.2,
              }}
            >
              {transaction.productName}
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              flexWrap="wrap"
              gap={0.5}
            >
              <Chip
                icon={<ShoppingBag sx={{ fontSize: 16 }} />}
                label={`${transaction.itemCount} unidades`}
                size="small"
                color="primary"
                variant="filled"
                sx={{ fontWeight: 600 }}
              />
              {transaction.orderTransactionId && (
                <Chip
                  label={`#${transaction.orderTransactionId}`}
                  size="small"
                  variant="outlined"
                  sx={{ fontWeight: 500, borderColor: colors.darkBlue }}
                />
              )}
            </Stack>
          </Box>
        </Stack>
      </Paper>

      {/* Información principal en Grid */}
      <Grid container spacing={2.5} mb={3}>
        {/* Columna izquierda */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              border: `1px solid ${colors.lightBlue}30`,
              borderRadius: 2,
              height: '100%',
            }}
          >
            <Typography
              variant="subtitle2"
              fontWeight={700}
              sx={{ mb: 2, color: colors.darkBlue }}
            >
              Información General
            </Typography>
            <Stack spacing={2}>
              <InfoItem
                icon={<CalendarToday fontSize="small" />}
                label="Fecha de Operación"
                value={formatDateToDisplay(transaction.operationDate)}
              />
              <InfoItem
                icon={<Person fontSize="small" />}
                label="Cliente"
                value={transaction.client || 'Sin cliente'}
              />
              {transaction.invoiceNumber && (
                <InfoItem
                  icon={<Receipt fontSize="small" />}
                  label="Folio"
                  value={transaction.invoiceNumber}
                />
              )}
              <InfoItem
                icon={<CreditCard fontSize="small" />}
                label="Método de Pago"
                value={
                  getMethodPaymentOption(transaction.methodPayment)?.label ||
                  transaction.methodPayment
                }
              />
            </Stack>
          </Paper>
        </Grid>

        {/* Columna derecha */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              border: `1px solid ${colors.lightBlue}30`,
              borderRadius: 2,
              height: '100%',
            }}
          >
            <Typography
              variant="subtitle2"
              fontWeight={700}
              sx={{ mb: 2, color: colors.darkBlue }}
            >
              Montos y Precios
            </Typography>
            <Stack spacing={2}>
              <InfoItem
                icon={<AttachMoney fontSize="small" />}
                label="Precio de Compra"
                value={
                  <NumericFormat
                    value={transaction.purchasePrice || 0}
                    displayType="text"
                    thousandSeparator=","
                    prefix="$"
                    decimalScale={2}
                    fixedDecimalScale
                  />
                }
              />
              <InfoItem
                icon={<Payment fontSize="small" />}
                label="Precio de Venta"
                value={
                  <NumericFormat
                    value={transaction.sellingPrice || 0}
                    displayType="text"
                    thousandSeparator=","
                    prefix="$"
                    decimalScale={2}
                    fixedDecimalScale
                  />
                }
              />
              <InfoItem
                icon={<TrendingUp fontSize="small" />}
                label="Ganancia"
                value={
                  <NumericFormat
                    value={transaction.profit || 0}
                    displayType="text"
                    thousandSeparator=","
                    prefix="$"
                    decimalScale={2}
                    fixedDecimalScale
                  />
                }
                valueColor={transaction.profit > 0 ? colors.green : colors.red}
              />
              {transaction.extraAmount > 0 && (
                <InfoItem
                  icon={<AttachMoney fontSize="small" />}
                  label="Monto Extra"
                  value={
                    <NumericFormat
                      value={transaction.extraAmount}
                      displayType="text"
                      thousandSeparator=","
                      prefix="$"
                      decimalScale={2}
                      fixedDecimalScale
                    />
                  }
                />
              )}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Monto pagado destacado */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          background: `linear-gradient(135deg, ${colors.darkBlue}08 0%, ${colors.lightBlue}08 100%)`,
          border: `2px solid ${colors.darkBlue}30`,
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="subtitle2"
          color="text.secondary"
          fontWeight={600}
          mb={1}
        >
          MONTO PAGADO
        </Typography>
        <NumericFormat
          value={transaction.amountPaid || 0}
          displayType="text"
          thousandSeparator=","
          prefix="$"
          decimalScale={2}
          fixedDecimalScale
          renderText={(value) => (
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{
                background: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.lightBlue} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {value}
            </Typography>
          )}
        />
      </Paper>

      {/* Estados */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          mb: 3,
          border: `1px solid ${colors.lightBlue}30`,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="subtitle2"
          fontWeight={700}
          sx={{ mb: 2, color: colors.darkBlue }}
        >
          Estados
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Payment fontSize="small" sx={{ color: colors.darkBlue }} />
              <Typography variant="caption" color="text.secondary">
                Estado de Pago:
              </Typography>
            </Stack>
            <Box mt={1}>
              <Chip
                label={
                  getPaymentStatusOption(transaction.paymentStatus)?.label ||
                  transaction.paymentStatus
                }
                color={getPaymentStatusColor(transaction.paymentStatus) as any}
                variant="filled"
                sx={{ fontWeight: 600, fontSize: '0.8rem' }}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <LocalShipping fontSize="small" sx={{ color: colors.darkBlue }} />
              <Typography variant="caption" color="text.secondary">
                Estado de Entrega:
              </Typography>
            </Stack>
            <Box mt={1}>
              <Chip
                label={
                  getDeliveryStatusOption(transaction.deliveryStatus)?.label ||
                  transaction.deliveryStatus
                }
                color={
                  getDeliveryStatusColor(transaction.deliveryStatus) as any
                }
                variant="outlined"
                sx={{ fontWeight: 600, fontSize: '0.8rem' }}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Descripción */}
      {transaction.description && (
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            border: `1px solid ${colors.lightBlue}30`,
            borderRadius: 2,
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="flex-start">
            <Description
              fontSize="small"
              sx={{ color: colors.darkBlue, mt: 0.3 }}
            />
            <Box>
              <Typography
                variant="subtitle2"
                fontWeight={700}
                sx={{ mb: 1, color: colors.darkBlue }}
              >
                Descripción
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.6, fontStyle: 'italic' }}
              >
                {transaction.description}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      )}
    </Box>
  );
};

export default OrderTransactionDetail;
