import React, { useCallback } from 'react';
import {
  Box,
  Typography,
  Divider,
  Stack,
  Skeleton,
  Chip,
  Avatar,
  Grid,
} from '@mui/material';
import {
  Edit,
  Delete,
  CalendarToday,
  Receipt,
  Person,
  ShoppingBag,
  Inventory2,
  AttachMoney,
  TrendingUp,
  CreditCard,
  Description,
} from '@mui/icons-material';
import { NumericFormat } from 'react-number-format';

import useOrderTransactions from 'views/OrderManagement/hooks/useOrderTransactios';
import type { OrderTransaction } from 'types/api';
import { CustomPagination, ActionMenu, CardLayout } from 'components/shared';
import type { ActionItem } from 'components/shared/ActionMenu';
import { colors } from 'commons/colors';
import { formatDateToDisplay } from 'utils/dateUtils';
import {
  getDeliveryStatusOption,
  getPaymentStatusOption,
  getMethodPaymentOption,
} from 'utils/catalogs';

interface OrderTransactionListMobileProps {
  handleOpenFormModal: (transaction: OrderTransaction) => void;
  handleOpenDeleteModal: (transaction: OrderTransaction) => void;
}

const OrderTransactionListMobile = ({
  handleOpenFormModal,
  handleOpenDeleteModal,
}: OrderTransactionListMobileProps) => {
  const {
    transactions,
    isLoading,
    pagination,
    handlePageChange,
    handleRowsPerPageChange,
  } = useOrderTransactions();

  const handleEditTransaction = useCallback(
    (transaction: OrderTransaction) => {
      handleOpenFormModal(transaction);
    },
    [handleOpenFormModal],
  );

  const handleDeleteTransaction = useCallback(
    (transaction: OrderTransaction) => {
      handleOpenDeleteModal(transaction);
    },
    [handleOpenDeleteModal],
  );

  const getTransactionActions = useCallback(
    (transaction: OrderTransaction): ActionItem[] => [
      {
        id: 'edit',
        label: 'Editar',
        icon: <Edit fontSize="small" />,
        onClick: () => handleEditTransaction(transaction),
        color: colors.darkBlue,
      },
      {
        id: 'delete',
        label: 'Eliminar',
        icon: <Delete fontSize="small" />,
        onClick: () => handleDeleteTransaction(transaction),
        color: colors.red,
      },
    ],
    [handleEditTransaction, handleDeleteTransaction],
  );

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

  const InfoRow = ({
    icon,
    label,
    value,
  }: {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
  }) => (
    <Stack direction="row" spacing={1} alignItems="center">
      <Box
        sx={{
          color: colors.darkBlue,
          minWidth: 16,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {icon}
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontSize: '0.75rem', minWidth: 'fit-content' }}
      >
        {label}:
      </Typography>
      <Typography
        variant="body2"
        fontWeight={500}
        sx={{
          color: colors.darkText,
          fontSize: '0.75rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {value}
      </Typography>
    </Stack>
  );

  if (isLoading) {
    return (
      <Box display="flex" flexDirection="column" gap={2} mt={2}>
        {Array.from({ length: 3 }).map((_, index) => (
          <CardLayout
            key={index}
            gradient={false}
            topBorder={false}
            hoverEffect={false}
          >
            <Stack spacing={2}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Skeleton variant="text" width={120} height={20} />
                <Skeleton
                  variant="rectangular"
                  width={60}
                  height={24}
                  sx={{ borderRadius: 1 }}
                />
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <Skeleton variant="circular" width={56} height={56} />
                <Box flex={1}>
                  <Skeleton variant="text" width="80%" height={20} />
                  <Skeleton variant="text" width="60%" height={16} />
                </Box>
              </Stack>
              <Stack spacing={1}>
                <Skeleton variant="text" width="90%" height={16} />
                <Skeleton variant="text" width="70%" height={16} />
              </Stack>
            </Stack>
          </CardLayout>
        ))}
      </Box>
    );
  }

  if (!transactions.length) {
    return (
      <CardLayout
        gradient={true}
        topBorder={false}
        hoverEffect={false}
        sx={{ py: 8 }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <ShoppingBag
            sx={{ fontSize: 48, color: colors.blueGreyLight, mb: 2 }}
          />
          <Typography
            variant="h6"
            color="text.secondary"
            fontWeight={500}
            mb={1}
          >
            No hay pedidos
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            No se encontraron pedidos para el período seleccionado.
          </Typography>
        </Box>
      </CardLayout>
    );
  }

  return (
    <>
      <Box display="flex" flexDirection="column" gap={2} mt={2}>
        {transactions.map((transaction, index) => (
          <CardLayout
            key={transaction.orderTransactionId}
            fadeIn={true}
            fadeDelay={index * 100}
            padding={2}
          >
            {/* Header con fecha, ID y menú de acciones */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={1.5}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <CalendarToday
                  fontSize="small"
                  sx={{ color: colors.darkBlue }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={500}
                >
                  {formatDateToDisplay(transaction.operationDate)}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                {transaction.orderTransactionId && (
                  <Chip
                    label={`#${transaction.orderTransactionId}`}
                    size="small"
                    variant="outlined"
                    sx={{
                      fontWeight: 600,
                      fontSize: '0.7rem',
                      borderColor: colors.darkBlue,
                      color: colors.darkBlue,
                    }}
                  />
                )}
                <ActionMenu
                  actions={getTransactionActions(transaction)}
                  size="small"
                  iconColor={colors.darkText}
                  hoverColor={colors.darkBlue}
                  alignItems="flex-start"
                />
              </Stack>
            </Stack>

            {/* Producto con imagen y nombre */}
            <Stack direction="row" spacing={2} alignItems="center" mb={1.5}>
              <Avatar
                src={transaction.productImageUrl || undefined}
                alt={transaction.productName}
                variant="rounded"
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: colors.lightBlue + '20',
                  color: colors.darkBlue,
                }}
              >
                <Inventory2 sx={{ fontSize: 32 }} />
              </Avatar>
              <Box flex={1}>
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  sx={{
                    color: colors.darkText,
                    lineHeight: 1.2,
                    mb: 0.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {transaction.productName}
                </Typography>
                <Chip
                  icon={<ShoppingBag sx={{ fontSize: 14 }} />}
                  label={`${transaction.itemCount} unidades`}
                  size="small"
                  color="primary"
                  variant="filled"
                  sx={{ fontWeight: 600, fontSize: '0.7rem' }}
                />
              </Box>
            </Stack>

            {/* Estados */}
            <Stack direction="row" spacing={1} mb={1.5} flexWrap="wrap" gap={1}>
              <Chip
                label={
                  getPaymentStatusOption(transaction.paymentStatus)?.label ||
                  transaction.paymentStatus
                }
                size="small"
                color={getPaymentStatusColor(transaction.paymentStatus) as any}
                variant="filled"
                sx={{ fontWeight: 600, fontSize: '0.7rem' }}
              />
              <Chip
                label={
                  getDeliveryStatusOption(transaction.deliveryStatus)?.label ||
                  transaction.deliveryStatus
                }
                size="small"
                color={
                  getDeliveryStatusColor(transaction.deliveryStatus) as any
                }
                variant="outlined"
                sx={{ fontWeight: 600, fontSize: '0.7rem' }}
              />
            </Stack>

            <Divider sx={{ mb: 1.5, opacity: 0.3 }} />

            {/* Información en Grid compacto */}
            <Grid container spacing={1.5} mb={1.5}>
              {/* Cliente */}
              <Grid size={{ xs: 12 }}>
                <InfoRow
                  icon={<Person fontSize="small" />}
                  label="Cliente"
                  value={transaction.client || 'Sin cliente'}
                />
              </Grid>

              {/* Folio y Método de Pago */}
              <Grid size={{ xs: 6 }}>
                <InfoRow
                  icon={<Receipt fontSize="small" />}
                  label="Folio"
                  value={transaction.invoiceNumber || 'N/A'}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <InfoRow
                  icon={<CreditCard fontSize="small" />}
                  label="Método"
                  value={
                    getMethodPaymentOption(
                      transaction.methodPayment,
                    )?.label?.split(' ')[0] || 'N/A'
                  }
                />
              </Grid>
            </Grid>

            {/* Montos en Grid */}
            <Box
              sx={{
                bgcolor: colors.lightBlue + '10',
                borderRadius: 2,
                p: 1.5,
                mb: 1.5,
              }}
            >
              <Grid container spacing={1}>
                <Grid size={{ xs: 6 }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', fontSize: '0.65rem', mb: 0.3 }}
                  >
                    P. Compra
                  </Typography>
                  <NumericFormat
                    value={transaction.purchasePrice || 0}
                    displayType="text"
                    thousandSeparator=","
                    prefix="$"
                    decimalScale={2}
                    fixedDecimalScale
                    renderText={(value) => (
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        sx={{ fontSize: '0.75rem', color: colors.darkText }}
                      >
                        {value}
                      </Typography>
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', fontSize: '0.65rem', mb: 0.3 }}
                  >
                    P. Venta
                  </Typography>
                  <NumericFormat
                    value={transaction.sellingPrice || 0}
                    displayType="text"
                    thousandSeparator=","
                    prefix="$"
                    decimalScale={2}
                    fixedDecimalScale
                    renderText={(value) => (
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        sx={{ fontSize: '0.75rem', color: colors.darkText }}
                      >
                        {value}
                      </Typography>
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', fontSize: '0.65rem', mb: 0.3 }}
                  >
                    Ganancia
                  </Typography>
                  <NumericFormat
                    value={transaction.profit || 0}
                    displayType="text"
                    thousandSeparator=","
                    prefix="$"
                    decimalScale={2}
                    fixedDecimalScale
                    renderText={(value) => (
                      <Typography
                        variant="body2"
                        fontWeight={700}
                        sx={{
                          fontSize: '0.75rem',
                          color:
                            transaction.profit > 0 ? colors.green : colors.red,
                        }}
                      >
                        {value}
                      </Typography>
                    )}
                  />
                </Grid>
                {transaction.extraAmount > 0 && (
                  <Grid size={{ xs: 6 }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: 'block', fontSize: '0.65rem', mb: 0.3 }}
                    >
                      Extra
                    </Typography>
                    <NumericFormat
                      value={transaction.extraAmount}
                      displayType="text"
                      thousandSeparator=","
                      prefix="$"
                      decimalScale={2}
                      fixedDecimalScale
                      renderText={(value) => (
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          sx={{ fontSize: '0.75rem', color: colors.darkText }}
                        >
                          {value}
                        </Typography>
                      )}
                    />
                  </Grid>
                )}
              </Grid>
            </Box>

            {/* Monto Pagado destacado */}
            <Box
              sx={{
                bgcolor: `linear-gradient(135deg, ${colors.darkBlue}08 0%, ${colors.lightBlue}08 100%)`,
                border: `2px solid ${colors.darkBlue}30`,
                borderRadius: 2,
                p: 1.5,
                mb: transaction.description ? 1.5 : 0,
                textAlign: 'center',
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={600}
                sx={{ display: 'block', fontSize: '0.7rem', mb: 0.5 }}
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
                    variant="h5"
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
            </Box>

            {/* Descripción */}
            {transaction.description && (
              <Box
                sx={{
                  bgcolor: colors.veryLightGray,
                  borderLeft: `3px solid ${colors.darkBlue}`,
                  p: 1.5,
                  borderRadius: 1,
                }}
              >
                <Stack direction="row" spacing={1} alignItems="flex-start">
                  <Description
                    fontSize="small"
                    sx={{ color: colors.darkBlue, mt: 0.2 }}
                  />
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight={600}
                      sx={{ display: 'block', fontSize: '0.7rem', mb: 0.5 }}
                    >
                      Descripción
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: '0.75rem',
                        lineHeight: 1.4,
                        fontStyle: 'italic',
                      }}
                    >
                      {transaction.description}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            )}
          </CardLayout>
        ))}
      </Box>

      <CustomPagination
        pagination={pagination}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
      />
    </>
  );
};

export default OrderTransactionListMobile;
