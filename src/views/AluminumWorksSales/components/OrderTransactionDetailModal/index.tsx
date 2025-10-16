import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Typography, Button, Stack, Alert } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';

import type { ApiResponse, CommonError, OrderTransaction } from 'types/api';
import { getOrderTransactionById } from 'services/orderTransactionService';

import OrderTransactionDetailSkeleton from 'views/OrderManagement/components/OrderTransactionDetailModal/OrderTransactionDetailSkeleton';
import OrderTransactionDetail from 'views/OrderManagement/components/OrderTransactionDetailModal/OrderTransactionDetail';

import { CustomModal } from 'components/shared';
import OrderTransactionCard from 'views/OrderManagement/components/OrderTransactionListMobile/OrderTransactionCard';
import OrderTransactionCardSkeleton from 'views/OrderManagement/components/OrderTransactionListMobile/OrderTransactionCardSkeleton';

interface OrderTransactionDetailModalProps {
  open: boolean;
  transactionId: number;
  isMobile?: boolean;
  onClose: () => void;
}

const OrderTransactionDetailModal = ({
  open,
  transactionId,
  onClose,
  isMobile,
}: OrderTransactionDetailModalProps) => {
  const { data, isLoading, isError, error, refetch } = useQuery<
    ApiResponse<OrderTransaction>,
    CommonError
  >({
    queryKey: ['orderTransaction-id', transactionId],
    queryFn: () => getOrderTransactionById(transactionId),
    enabled: open && !!transactionId,
  });

  const transaction = data?.data ?? null;

  // Render: loading state
  const renderLoading = () => {
    if (!isLoading) return null;
    return isMobile ? (
      <OrderTransactionCardSkeleton length={1} />
    ) : (
      <OrderTransactionDetailSkeleton />
    );
  };

  // Render: error state
  const renderError = () => {
    if (!isError) return null;
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          py: 4,
          gap: 2,
        }}
      >
        <Alert severity="error" sx={{ width: '100%', maxWidth: 400 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            Error al cargar el detalle del pedido
          </Typography>
          <Typography variant="body2">
            {error?.userMessage ||
              'Ocurrió un problema al obtener la información.'}
          </Typography>
        </Alert>

        <Button
          variant="outlined"
          color="primary"
          onClick={() => refetch()}
          startIcon={<CachedIcon color="inherit" />}
        >
          Reintentar
        </Button>
      </Box>
    );
  };

  // Render: success state with transaction
  const renderTransaction = () => {
    if (!transaction || isLoading || isError) return null;
    return isMobile ? (
      <OrderTransactionCard
        transaction={transaction}
        index={0}
        actions={[]}
        onlyQuery
      />
    ) : (
      <OrderTransactionDetail transaction={transaction} />
    );
  };

  // Render: empty result
  const renderEmpty = () => {
    if (!transaction && !isLoading && !isError) {
      return (
        <Stack alignItems="center" justifyContent="center" py={4} spacing={1.5}>
          <Typography variant="subtitle1" color="text.secondary">
            No se encontró información del pedido.
          </Typography>
          <Button variant="outlined" onClick={onClose}>
            Cerrar
          </Button>
        </Stack>
      );
    }
    return null;
  };

  return (
    <CustomModal
      open={open}
      title={
        transaction
          ? `Detalle del Pedido: #${transaction.orderTransactionId}`
          : 'Detalle del Pedido'
      }
      handleClose={onClose}
      maxWidth="md"
      fullWidth
      scrollable
    >
      {renderLoading()}
      {renderError()}
      {renderTransaction()}
      {renderEmpty()}
    </CustomModal>
  );
};

export default OrderTransactionDetailModal;
