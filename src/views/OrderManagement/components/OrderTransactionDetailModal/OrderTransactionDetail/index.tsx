import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Stack,
  Chip,
  Divider,
} from '@mui/material';
import {
  ShoppingBag,
  Person,
  CalendarToday,
  Receipt,
  CreditCard,
  Payment,
  LocalShipping,
  AttachMoney,
  Numbers,
} from '@mui/icons-material';
import { NumericFormat } from 'react-number-format';

import type { OrderTransaction, Product } from 'types/api';
import { formatDateToDisplay } from 'utils/dateUtils';
import {
  getMethodPaymentOption,
  getDeliveryStatusOption,
  getPaymentStatusOption,
  getPaymentStatusColor,
  getDeliveryStatusColor,
} from 'utils/catalogs';

import TotalBadge from '../../OrderTransactionFormModal/OrderTransactionForm/TotalBadge';
import DescriptionSection from './DescriptionSection';
import InfoItem from './InfoItem';
import ImagePreview from './ImagePreview';

interface OrderTransactionDetailProps {
  transaction: OrderTransaction;
}

const sectionPaper = {
  p: 2.5,
  borderRadius: 2,
  backgroundColor: '#fff',
  border: '1px solid #e0e0e0',
  height: '100%',
};

const sectionTitle = {
  fontSize: '0.95rem',
  fontWeight: 700,
  mb: 2,
  pb: 1,
  borderBottom: '2px solid',
  display: 'flex',
  alignItems: 'center',
  gap: 0.5,
};

const OrderTransactionDetail = ({
  transaction,
}: OrderTransactionDetailProps) => {
  const total =
    transaction.sellingPrice * transaction.itemCount +
    (transaction.extraAmount || 0);

  // Crear producto virtual para TotalBadge
  const virtualProduct: Product = {
    productId: transaction.productId,
    name: transaction.productName,
    purchasePrice: transaction.purchasePrice,
    sellingPrice: transaction.sellingPrice,
    client: transaction.client,
    avatar: transaction.productImageUrl,
  } as Product;

  return (
    <Box>
      <Grid container spacing={2.5}>
        {/* ========== COLUMNA 1: PEDIDO ========== */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={0} sx={sectionPaper}>
            <Typography
              sx={{ ...sectionTitle, borderBottomColor: 'primary.main' }}
              color="primary.main"
            >
              📦 Pedido
            </Typography>

            <Stack spacing={1.5}>
              <ImagePreview
                imageUrl={transaction.productImageUrl}
                name={transaction.productName}
              />
              <InfoItem
                icon={<ShoppingBag sx={{ fontSize: 16 }} />}
                label="Producto"
                value={transaction.productName}
              />
              <InfoItem
                icon={<Person sx={{ fontSize: 16 }} />}
                label="Cliente"
                value={transaction.client || 'Sin especificar'}
              />
              <InfoItem
                icon={<Numbers sx={{ fontSize: 16 }} />}
                label="Cantidad"
                value={
                  <NumericFormat
                    value={transaction.itemCount}
                    displayType="text"
                    thousandSeparator=","
                  />
                }
                valueColor="primary.main"
              />
              <InfoItem
                icon={<AttachMoney sx={{ fontSize: 16 }} />}
                label="Cargo adicional"
                value={
                  transaction.extraAmount > 0 ? (
                    <NumericFormat
                      value={transaction.extraAmount}
                      displayType="text"
                      thousandSeparator=","
                      prefix="$"
                      decimalScale={2}
                      fixedDecimalScale
                    />
                  ) : (
                    'Sin cargo'
                  )
                }
              />
            </Stack>
          </Paper>
        </Grid>

        {/* ========== COLUMNA 2: PAGO ========== */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={0} sx={sectionPaper}>
            <Typography
              sx={{ ...sectionTitle, borderBottomColor: 'success.main' }}
              color="success.main"
            >
              💳 Pago
            </Typography>

            {/* Total Badge Reutilizado */}
            <TotalBadge
              selectedProduct={virtualProduct}
              itemCount={transaction.itemCount}
              extraAmount={transaction.extraAmount || 0}
              total={total}
            />

            <Stack spacing={1.5}>
              <InfoItem
                icon={<CreditCard sx={{ fontSize: 16 }} />}
                label="Forma de pago"
                value={
                  getMethodPaymentOption(transaction.methodPayment)?.label ||
                  'Sin especificar'
                }
              />
              <InfoItem
                icon={<AttachMoney sx={{ fontSize: 16 }} />}
                label="Monto pagado"
                value={
                  <NumericFormat
                    value={transaction.amountPaid || 0}
                    displayType="text"
                    thousandSeparator=","
                    prefix="$"
                    decimalScale={2}
                    fixedDecimalScale
                  />
                }
                valueColor="success.main"
              />

              <Divider sx={{ my: 0.5 }} />

              <Stack direction="row" spacing={1} alignItems="center">
                <Payment sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={500}
                >
                  Estado del pago:
                </Typography>
                <Chip
                  label={
                    getPaymentStatusOption(transaction.paymentStatus)?.label ||
                    transaction.paymentStatus
                  }
                  color={getPaymentStatusColor(transaction.paymentStatus)}
                  variant="filled"
                  size="small"
                  sx={{ fontWeight: 600, fontSize: '0.7rem' }}
                />
              </Stack>
            </Stack>
          </Paper>
        </Grid>

        {/* ========== COLUMNA 3: ENTREGA ========== */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={0} sx={sectionPaper}>
            <Typography
              sx={{ ...sectionTitle, borderBottomColor: 'info.main' }}
              color="info.main"
            >
              🚚 Entrega
            </Typography>

            <Stack spacing={1.5}>
              <InfoItem
                icon={<CalendarToday sx={{ fontSize: 16 }} />}
                label="Fecha de entrega"
                value={formatDateToDisplay(transaction.operationDate)}
              />
              <InfoItem
                icon={<Receipt sx={{ fontSize: 16 }} />}
                label="Folio de factura"
                value={transaction.invoiceNumber || 'Sin folio'}
              />

              <Divider sx={{ my: 0.5 }} />

              <Stack direction="row" spacing={1} alignItems="center">
                <LocalShipping sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={500}
                >
                  Estado de entrega:
                </Typography>
                <Chip
                  label={
                    getDeliveryStatusOption(transaction.deliveryStatus)
                      ?.label || transaction.deliveryStatus
                  }
                  color={getDeliveryStatusColor(transaction.deliveryStatus)}
                  variant="outlined"
                  size="small"
                  sx={{ fontWeight: 600, fontSize: '0.7rem' }}
                />
              </Stack>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Descripción */}
      <Box mt={2.5}>
        <DescriptionSection description={transaction.description} />
      </Box>
    </Box>
  );
};

export default OrderTransactionDetail;
