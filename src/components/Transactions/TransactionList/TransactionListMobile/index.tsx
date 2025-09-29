import React, { useCallback } from 'react';
import { Box, Typography, Divider, Stack, Skeleton } from '@mui/material';
import {
  Edit,
  Delete,
  Description,
  CalendarToday,
  Receipt,
  Business,
  ReceiptLong,
} from '@mui/icons-material';
import { NumericFormat } from 'react-number-format';

import { useTransactions } from 'hooks';
import type { Transaction } from 'types/api';
import { CustomPagination, ActionMenu, CardLayout } from 'components/shared';
import type { ActionItem } from 'components/shared/ActionMenu';
import { colors } from 'commons/colors';
import { formatDateToDisplay } from 'utils/dateUtils';

interface Props {
  handleOpenFormModal: (transaction: Transaction) => void;
  handleOpenDeleteModal: (transaction: Transaction) => void;
}

const TransactionListMobile = ({
  handleOpenFormModal,
  handleOpenDeleteModal,
}: Props) => {
  const {
    type,
    transactions,
    isLoading,
    pagination,
    handlePageChange,
    handleRowsPerPageChange,
  } = useTransactions();

  const handleEditTransaction = useCallback(
    (transaction: Transaction) => {
      handleOpenFormModal(transaction);
    },
    [handleOpenFormModal],
  );

  const handleDeleteTransaction = useCallback(
    (transaction: Transaction) => {
      handleOpenDeleteModal(transaction);
    },
    [handleOpenDeleteModal],
  );

  const getTransactionActions = useCallback(
    (transaction: Transaction): ActionItem[] => [
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
              <Skeleton variant="text" width={100} height={32} />
              <Stack spacing={1}>
                <Skeleton variant="text" width="80%" height={16} />
                <Skeleton variant="text" width="60%" height={16} />
                <Skeleton variant="text" width="90%" height={16} />
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
          <ReceiptLong
            sx={{ fontSize: 48, color: colors.blueGreyLight, mb: 2 }}
          />
          <Typography
            variant="h6"
            color="text.secondary"
            fontWeight={500}
            mb={1}
          >
            No hay transacciones
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            No se encontraron transacciones para el período seleccionado.
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
            key={transaction.transactionId}
            fadeIn={true}
            fadeDelay={index * 100}
            padding={2}
          >
            {/* Header con fecha y menú */}
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

              <ActionMenu
                actions={getTransactionActions(transaction)}
                size="small"
                iconColor={colors.darkText}
                hoverColor={colors.darkBlue}
                alignItems="flex-start"
              />
            </Stack>

            {/* Monto principal */}
            <Box mb={1.5}>
              <NumericFormat
                value={transaction.amount || 0}
                displayType="text"
                thousandSeparator=","
                prefix="$"
                decimalScale={2}
                fixedDecimalScale
                renderText={(value) => (
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{
                      color: colors.darkBlue,
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

            <Divider sx={{ mb: 1.5, opacity: 0.3 }} />

            {/* Información detallada compacta */}
            <Stack spacing={1}>
              {/* Folio */}
              <Stack direction="row" spacing={1} alignItems="center">
                <Receipt
                  fontSize="small"
                  sx={{ color: colors.darkBlue, minWidth: 16 }}
                />
                <Typography
                  variant="body2"
                  color="text.primary"
                  fontWeight={500}
                >
                  Folio:{' '}
                  <span style={{ color: colors.darkBlue }}>
                    {transaction.invoiceNumber || 'Sin folio'}
                  </span>
                </Typography>
              </Stack>

              {/* RFC */}
              <Stack direction="row" spacing={1} alignItems="center">
                <Business
                  fontSize="small"
                  sx={{ color: colors.darkBlue, minWidth: 16 }}
                />
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}
                >
                  RFC:{' '}
                  <span style={{ color: colors.darkBlue }}>
                    {transaction.issuerRfc || 'Sin RFC'}
                  </span>
                </Typography>
              </Stack>

              {/* Pedido */}
              {type === 'SALE' ? (
                <Stack direction="row" spacing={1} alignItems="center">
                  <ReceiptLong
                    fontSize="small"
                    sx={{ color: colors.darkBlue, minWidth: 16 }}
                  />
                  <Typography
                    variant="body2"
                    color="text.primary"
                    fontWeight={500}
                  >
                    Pedido:{' '}
                    <span style={{ color: colors.darkBlue }}>
                      {transaction.orderTransactionId
                        ? `#${transaction.orderTransactionId}`
                        : 'Sin # pedido'}
                    </span>
                  </Typography>
                </Stack>
              ) : null}

              {/* Descripción */}
              <Stack direction="row" spacing={1} alignItems="flex-start">
                <Description
                  fontSize="small"
                  sx={{ color: colors.darkBlue, minWidth: 16, mt: 0.5 }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.3,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    fontSize: '0.8rem',
                  }}
                >
                  {transaction.description || 'Sin descripción'}
                </Typography>
              </Stack>
            </Stack>
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

export default TransactionListMobile;
