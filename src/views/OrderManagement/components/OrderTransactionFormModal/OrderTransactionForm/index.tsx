import React, { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';

import {
  Grid,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Paper,
} from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import { NumericFormat } from 'react-number-format';

import {
  CustomTextField,
  CustomDatePicker,
  CustomSelectField,
  CustomProductSelector,
  FormLayout,
} from 'components/shared';

import { DeliveryStatus, OrderTransactionRequest, Product } from 'types/api';

import {
  CAT_METHOD_PAYMENT,
  CAT_PAYMENT_STATUS,
  CAT_DELIVERY_STATUS,
} from 'commons/catalogs';

import SubtotalBadge from '../SubtotalBadge';

import schema from './schema';
import * as styles from './styles';

interface Props {
  id?: string;
  orderTransaction?: OrderTransactionRequest | null;
  onSubmit: (data: OrderTransactionRequest) => void;
}

const OrderTransactionForm = ({ id, orderTransaction, onSubmit }: Props) => {
  // Guardar el producto completo
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
    null,
  );

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OrderTransactionRequest>({
    resolver: yupResolver(schema) as any,
    defaultValues: orderTransaction ?? {
      orderTransactionId: null,
      client: '',
      invoiceNumber: '',
      methodPayment: null,
      paymentStatus: null,
      deliveryStatus: DeliveryStatus.PENDING,
      description: '',
      operationDate: new Date() as any,
      addTransaction: false,
    },
  });

  // Observar cambios en cantidad
  const itemCount = watch('itemCount') || 0;

  const subtotal = useMemo(() => {
    if (!selectedProduct || !itemCount) return 0;
    return (selectedProduct.purchasePrice || 0) * itemCount;
  }, [selectedProduct, itemCount]);

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
                      label="Cliente"
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
                    <NumericFormat
                      {...field}
                      required
                      type="text"
                      customInput={CustomTextField}
                      label="Cantidad"
                      allowNegative={false}
                      decimalScale={0}
                      error={!!errors.itemCount}
                      helperText={errors.itemCount?.message}
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

            {/* SUBTOTAL CALCULADO */}
            <SubtotalBadge
              selectedProduct={selectedProduct}
              itemCount={itemCount}
              subtotal={subtotal}
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
                      label="Método de pago"
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

              {/* Monto extra */}
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
                      label="Monto extra"
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

              {/* Estado de pago */}
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="paymentStatus"
                  control={control}
                  render={({ field }) => (
                    <CustomSelectField
                      {...field}
                      label="Estado de pago"
                      options={CAT_PAYMENT_STATUS}
                      error={!!errors.paymentStatus}
                      helperText={errors.paymentStatus?.message}
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
          <Paper elevation={0} sx={styles.checkboxPaper}>
            <Controller
              name="addTransaction"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      sx={styles.checkboxIcon}
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1" fontWeight={600}>
                        Agregar a ventas
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Este pedido también se registrará en el módulo de ventas
                      </Typography>
                    </Box>
                  }
                />
              )}
            />
          </Paper>
        </Grid>
      </Grid>
    </FormLayout>
  );
};

export default OrderTransactionForm;
