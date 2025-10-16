import React, { useMemo, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Grid, Box, Typography, Paper } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import { NumericFormat } from 'react-number-format';

import {
  CustomTextField,
  CustomDatePicker,
  CustomSelectField,
  CustomProductSelector,
  FormLayout,
  QuantityInput,
} from 'components/shared';

import {
  DeliveryStatus,
  OrderTransaction,
  OrderTransactionRequest,
  Product,
  PaymentStatus,
} from 'types/api';

import {
  CAT_METHOD_PAYMENT,
  CAT_PAYMENT_STATUS,
  CAT_DELIVERY_STATUS,
} from 'commons/catalogs';

import TotalBadge from './TotalBadge';
import AddToSalesCheckbox from './AddToSalesCheckbox';

import schema from './schema';
import * as styles from './styles';
import { getProductByOrderTransaction, getInitialValues } from './helpers';

interface Props {
  id?: string;
  orderTransaction?: OrderTransactionRequest | OrderTransaction | null;
  onSubmit: (data: OrderTransactionRequest) => void;
}

const OrderTransactionForm = ({ id, orderTransaction, onSubmit }: Props) => {
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
    getProductByOrderTransaction(
      orderTransaction ? (orderTransaction as OrderTransaction) : null,
    ),
  );

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OrderTransactionRequest>({
    resolver: yupResolver(schema) as any,
    defaultValues: orderTransaction ?? getInitialValues(),
  });

  // Observar cambios en cantidad, monto extra y monto pagado
  const itemCount = watch('itemCount') || 0;
  const extraAmount = watch('extraAmount') || 0;
  const amountPaid = watch('amountPaid');
  const paymentStatus = watch('paymentStatus');
  const deliveryStatus = watch('deliveryStatus');
  const registerInSales = watch('registerInSales');

  // Referencias para controlar cuándo actualizar el estado de pago
  const previousTotal = useRef<number>(0);

  const total = useMemo(() => {
    if (!selectedProduct || !itemCount) return 0;
    const productTotal = (selectedProduct.sellingPrice || 0) * itemCount;
    return productTotal + extraAmount;
  }, [selectedProduct, itemCount, extraAmount]);

  useEffect(() => {
    if (amountPaid === null || !total || total <= 0) {
      setValue('paymentStatus', null);
      return;
    }

    const getPaymentStatus = () => {
      if (amountPaid === 0) return PaymentStatus.PENDING;
      if (amountPaid < total) return PaymentStatus.INCOMPLETE;
      return PaymentStatus.PAID;
    };

    setValue('paymentStatus', getPaymentStatus());
  }, [amountPaid, total, setValue]);

  // Resetear estado de pago a null cuando cambia el total
  // Solo si el estado es PAID y ahora amountPaid es menor al total
  useEffect(() => {
    if (previousTotal.current !== total && previousTotal.current !== 0) {
      // Solo resetear si el estado es PAID y el monto ya no cubre el total
      if (paymentStatus === PaymentStatus.PAID && (amountPaid || 0) < total) {
        setValue('paymentStatus', null, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    }
    previousTotal.current = total;
  }, [total, setValue, paymentStatus, amountPaid]);

  // Desactivar registerInSales si no se cumplen las condiciones
  useEffect(() => {
    const canAddToSales =
      paymentStatus === PaymentStatus.PAID &&
      deliveryStatus === DeliveryStatus.DELIVERED;

    if (!canAddToSales && registerInSales) {
      setValue('registerInSales', false);
    }
  }, [paymentStatus, deliveryStatus, registerInSales, setValue]);

  console.log({ errors });

  return (
    <FormLayout id={id} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2.5}>
        {/* ========== COLUMNA 1: PEDIDO ========== */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={0} sx={styles.sectionPaper}>
            <Typography sx={styles.sectionTitle} color="primary.main">
              📦 Pedido
            </Typography>

            <Grid container spacing={2}>
              {/* Producto */}
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="productId"
                  control={control}
                  render={({ field }) => (
                    <CustomProductSelector
                      value={field.value}
                      onChange={(productId, product) => {
                        field.onChange(productId);
                        setValue('client', product?.client || '');
                        setSelectedProduct(product);
                      }}
                      required
                      label="Producto"
                      error={!!errors.productId}
                      helperText={errors.productId?.message}
                    />
                  )}
                />
              </Grid>

              {/* Cliente */}
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="client"
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      label="Nombre del cliente"
                      error={!!errors.client}
                      helperText={errors.client?.message}
                    />
                  )}
                />
              </Grid>

              {/* Cantidad */}
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="itemCount"
                  control={control}
                  render={({ field }) => (
                    <Box display="flex" flexDirection="column" gap={0.5}>
                      <Typography
                        variant="subtitle2"
                        fontWeight={500}
                        sx={{
                          color: errors.itemCount
                            ? 'error.main'
                            : 'text.primary',
                        }}
                      >
                        Cantidad *
                      </Typography>
                      <QuantityInput
                        value={field.value || 0}
                        onChange={(val) => field.onChange(val)}
                      />
                      {errors.itemCount && (
                        <Typography color="error" variant="caption">
                          {errors.itemCount.message}
                        </Typography>
                      )}
                    </Box>
                  )}
                />
              </Grid>

              {/* Cargo adicional */}
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="extraAmount"
                  control={control}
                  render={({ field }) => (
                    <NumericFormat
                      id="extraAmount"
                      name="extraAmount"
                      inputMode="decimal"
                      type="text"
                      value={field.value}
                      onValueChange={({ floatValue }) => {
                        field.onChange(floatValue ?? 0);
                      }}
                      customInput={CustomTextField}
                      label="Cargo adicional"
                      placeholder="Envío, empaquetado, etc."
                      thousandSeparator
                      prefix="$"
                      decimalScale={2}
                      allowNegative={false}
                      error={!!errors.extraAmount}
                      helperText={errors.extraAmount?.message}
                    />
                  )}
                />
              </Grid>

              {/* Descripción */}
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      label="Notas del pedido"
                      placeholder="Instrucciones especiales..."
                      multiline
                      rows={3}
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* ========== COLUMNA 2: PAGO ========== */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={0} sx={styles.sectionPaper}>
            <Typography sx={styles.sectionTitle} color="success.main">
              💳 Pago
            </Typography>

            {/* TOTAL CALCULADO */}
            <TotalBadge
              selectedProduct={selectedProduct}
              itemCount={itemCount}
              extraAmount={extraAmount}
              total={total}
            />

            <Grid container spacing={2}>
              {/* Método de pago */}
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="methodPayment"
                  control={control}
                  render={({ field }) => (
                    <CustomSelectField
                      {...field}
                      required
                      label="Forma de pago"
                      options={CAT_METHOD_PAYMENT}
                      error={!!errors.methodPayment}
                      helperText={errors.methodPayment?.message}
                    />
                  )}
                />
              </Grid>

              {/* Monto pagado */}
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="amountPaid"
                  control={control}
                  render={({ field }) => (
                    <NumericFormat
                      required
                      id="amountPaid"
                      name="amountPaid"
                      inputMode="decimal"
                      type="text"
                      value={field.value}
                      onValueChange={({ floatValue }) => {
                        field.onChange(floatValue ?? 0);
                      }}
                      customInput={CustomTextField}
                      label="Monto pagado"
                      thousandSeparator
                      prefix="$"
                      decimalScale={2}
                      allowNegative={false}
                      error={!!errors.amountPaid}
                      helperText={errors.amountPaid?.message}
                    />
                  )}
                />
              </Grid>

              {/* Estado de pago */}
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="paymentStatus"
                  control={control}
                  render={({ field }) => (
                    <CustomSelectField
                      key={`payment-status-${paymentStatus}`}
                      {...field}
                      value={field.value || ''}
                      label="Estatus del pago"
                      options={CAT_PAYMENT_STATUS}
                      error={!!errors.paymentStatus}
                      helperText={errors.paymentStatus?.message}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* ========== COLUMNA 3: ENTREGA Y FACTURACIÓN ========== */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={0} sx={styles.sectionPaper}>
            <Typography sx={styles.sectionTitle} color="info.main">
              🚚 Entrega
            </Typography>

            <Grid container spacing={2}>
              {/* Fecha de operación */}
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="operationDate"
                  control={control}
                  render={({ field }) => (
                    <CustomDatePicker
                      {...field}
                      required
                      id="operationDate"
                      name="operationDate"
                      label="Fecha de entrega"
                      value={field.value ? new Date(field.value) : null}
                      onChange={(date) => {
                        if (date) {
                          field.onChange(date.toISOString().split('T')[0]);
                        }
                      }}
                      error={!!errors.operationDate}
                      helperText={errors.operationDate?.message}
                    />
                  )}
                />
              </Grid>

              {/* Estado de entrega */}
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="deliveryStatus"
                  control={control}
                  render={({ field }) => (
                    <CustomSelectField
                      {...field}
                      label="Estado de entrega"
                      options={CAT_DELIVERY_STATUS}
                      error={!!errors.deliveryStatus}
                      helperText={errors.deliveryStatus?.message}
                    />
                  )}
                />
              </Grid>

              {/* Folio de factura */}
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="invoiceNumber"
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      label="Folio de factura"
                      error={!!errors.invoiceNumber}
                      helperText={errors.invoiceNumber?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* ========== AGREGAR A VENTAS (INDEPENDIENTE) ========== */}
        <Grid size={{ xs: 12 }}>
          <AddToSalesCheckbox
            control={control}
            paymentStatus={paymentStatus}
            deliveryStatus={deliveryStatus}
          />
        </Grid>
      </Grid>
    </FormLayout>
  );
};

export default OrderTransactionForm;
