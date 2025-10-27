import React from 'react';
import { Typography, Stack, Chip } from '@mui/material';
import { CalendarToday } from '@mui/icons-material';

import type { OrderTransaction } from 'types/api';
import { ActionMenu } from 'components/shared';
import type { ActionItem } from 'components/shared/ActionMenu';
import { colors } from 'commons/colors';
import { formatDateToDisplay } from 'utils/dateUtils';
import { usePermissions } from 'hooks';

interface TransactionHeaderProps {
  transaction: OrderTransaction;
  actions: ActionItem[];
}

const TransactionHeader = ({
  transaction,
  actions,
}: TransactionHeaderProps) => {
  const { isReadOnly } = usePermissions();

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      mb={1.5}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <CalendarToday fontSize="small" sx={{ color: colors.darkBlue }} />
        <Typography variant="body2" color="text.secondary" fontWeight={500}>
          {formatDateToDisplay(transaction.operationDate)}
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="center" spacing={1}>
        {transaction.orderTransactionId && actions.length ? (
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
        ) : null}
        {actions.length ? (
          <ActionMenu
            actions={actions}
            size="small"
            iconColor={colors.darkText}
            hoverColor={colors.darkBlue}
            alignItems="flex-start"
            disabled={isReadOnly}
          />
        ) : null}
      </Stack>
    </Stack>
  );
};

export default TransactionHeader;
