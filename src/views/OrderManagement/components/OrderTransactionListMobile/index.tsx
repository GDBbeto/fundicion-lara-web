import React, { useCallback } from 'react';
import { Box, Stack, Skeleton, Typography } from '@mui/material';
import { Edit, Delete, ShoppingBag } from '@mui/icons-material';

import useOrderTransactions from 'views/OrderManagement/hooks/useOrderTransactios';
import type { OrderTransaction } from 'types/api';
import { CustomPagination, CardLayout } from 'components/shared';
import type { ActionItem } from 'components/shared/ActionMenu';
import { colors } from 'commons/colors';

import OrderTransactionCard from './OrderTransactionCard';

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
          <OrderTransactionCard
            key={transaction.orderTransactionId}
            transaction={transaction}
            index={index}
            actions={getTransactionActions(transaction)}
          />
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
