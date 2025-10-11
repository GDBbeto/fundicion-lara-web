import React from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
} from '@mui/material';
import { Controller, Control } from 'react-hook-form';
import {
  OrderTransactionRequest,
  PaymentStatus,
  DeliveryStatus,
} from 'types/api';
import * as styles from '../styles';

interface AddToSalesCheckboxProps {
  control: Control<OrderTransactionRequest>;
  paymentStatus: PaymentStatus | null;
  deliveryStatus: DeliveryStatus | null;
}

const AddToSalesCheckbox: React.FC<AddToSalesCheckboxProps> = ({
  control,
  paymentStatus,
  deliveryStatus,
}) => {
  const canAddToSales =
    paymentStatus === PaymentStatus.PAID &&
    deliveryStatus === DeliveryStatus.DELIVERED;

  return (
    <Paper
      elevation={0}
      sx={{
        ...styles.checkboxPaper,
        background: canAddToSales
          ? 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)'
          : 'linear-gradient(135deg, #f5f5f515 0%, #e0e0e015 100%)',
        borderLeft: canAddToSales ? '4px solid #667eea' : '4px solid #bdbdbd',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&::before': canAddToSales
          ? {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
            }
          : {},
      }}
    >
      <Box display="flex" alignItems="flex-start" gap={2}>
        <Box
          sx={{
            mt: 0.5,
            p: 1,
            borderRadius: 2,
            backgroundColor: canAddToSales
              ? 'rgba(102, 126, 234, 0.1)'
              : 'rgba(189, 189, 189, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography fontSize="1.5rem">
            {canAddToSales ? '💰' : '🔒'}
          </Typography>
        </Box>

        <Box flex={1}>
          <Controller
            name="addTransaction"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    disabled={!canAddToSales}
                    sx={{
                      ...styles.checkboxIcon,
                      '&.Mui-disabled': {
                        color: 'action.disabled',
                      },
                    }}
                  />
                }
                label={
                  <Box>
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      color={canAddToSales ? 'text.primary' : 'text.disabled'}
                    >
                      Registrar también en ventas
                    </Typography>
                    <Typography
                      variant="caption"
                      color={canAddToSales ? 'text.secondary' : 'text.disabled'}
                    >
                      {canAddToSales
                        ? 'Este pedido se registrará automáticamente en el módulo de ventas'
                        : 'Solo disponible cuando el pago esté completo y el pedido haya sido entregado'}
                    </Typography>
                  </Box>
                }
              />
            )}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default AddToSalesCheckbox;
