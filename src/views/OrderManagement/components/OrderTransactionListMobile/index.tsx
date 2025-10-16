import React, { useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { Edit, Delete, ShoppingBag } from '@mui/icons-material';

import useOrderTransactions from 'views/OrderManagement/hooks/useOrderTransactios';
import type { OrderTransaction } from 'types/api';
import { CustomPagination, CardLayout } from 'components/shared';
import type { ActionItem } from 'components/shared/ActionMenu';
import { colors } from 'commons/colors';

import OrderTransactionCard from './OrderTransactionCard';
import OrderTransactionCardSkeleton from './OrderTransactionCardSkeleton';

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
    return <OrderTransactionCardSkeleton />;
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
