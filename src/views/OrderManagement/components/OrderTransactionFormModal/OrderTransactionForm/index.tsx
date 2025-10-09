import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Grid, FormControlLabel, Checkbox } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import { NumericFormat } from 'react-number-format';

import {
  CustomTextField,
  CustomSelectField,
  CustomDatePicker,
  FormLayout,
} from 'components/shared';

import type { OrderTransactionRequest } from 'types/api';

import {
  CAT_METHOD_PAYMENT,
  CAT_PAYMENT_STATUS,
  CAT_DELIVERY_STATUS,
} from 'commons/catalogs';

import type Option from 'types/option';

import schema from './schema';

interface Props {
  id?: string;
  orderTransaction?: OrderTransactionRequest | null;
  onSubmit: (data: OrderTransactionRequest) => void;
}

const OrderTransactionForm = ({ id, orderTransaction, onSubmit }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderTransactionRequest>({
    resolver: yupResolver(schema) as any,
    defaultValues: orderTransaction ?? {
      orderTransactionId: null,
      client: '',
      invoiceNumber: '',
      methodPayment: null,
      paymentStatus: null,
      deliveryStatus: null,
      description: '',
      addTransaction: false,
    },
  });

  // TODO: Obtener productos del backend
  const productOptions: Option[] = [
    { label: 'Producto 1', value: '1' },
    { label: 'Producto 2', value: '2' },
    { label: 'Producto 3', value: '3' },
  ];

  return (
    <FormLayout id={id} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} style={{ marginTop: 8 }}>
        {/* Producto */}
        <Grid size={{ xs: 12 }}>
          <Controller
            name="productId"
            control={control}
            render={({ field }) => (
              <CustomSelectField
                {...field}
                required
                label="Producto"
                options={productOptions}
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
                required
                label="Cliente"
                error={!!errors.client}
                helperText={errors.client?.message}
              />
            )}
          />
        </Grid>

        {/* Cantidad y Número de factura */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="itemCount"
            control={control}
            render={({ field }) => (
              <NumericFormat
                {...field}
                required
                inputMode="decimal"
                type="text"
                customInput={CustomTextField}
                label="Cantidad"
                decimalScale={2}
                allowNegative={false}
                error={!!errors.itemCount}
                helperText={errors.itemCount?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="invoiceNumber"
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                required
                label="Número de factura"
                error={!!errors.invoiceNumber}
                helperText={errors.invoiceNumber?.message}
              />
            )}
          />
        </Grid>

        {/* Método de pago */}
        <Grid size={{ xs: 12, sm: 6 }}>
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
        <Grid size={{ xs: 12, sm: 6 }}>
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
        <Grid size={{ xs: 12, sm: 6 }}>
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

        {/* Fecha de operación */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="operationDate"
            control={control}
            render={({ field }) => (
              <CustomDatePicker
                {...field}
                required
                id="operationDate"
                name="operationDate"
                label="Fecha de operación"
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

        {/* Estado de pago */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="paymentStatus"
            control={control}
            render={({ field }) => (
              <CustomSelectField
                {...field}
                required
                label="Estado de pago"
                options={CAT_PAYMENT_STATUS}
                error={!!errors.paymentStatus}
                helperText={errors.paymentStatus?.message}
              />
            )}
          />
        </Grid>

        {/* Estado de entrega */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="deliveryStatus"
            control={control}
            render={({ field }) => (
              <CustomSelectField
                {...field}
                required
                label="Estado de entrega"
                options={CAT_DELIVERY_STATUS}
                error={!!errors.deliveryStatus}
                helperText={errors.deliveryStatus?.message}
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
                label="Descripción"
                multiline
                rows={3}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
        </Grid>

        {/* Agregar transacción */}
        <Grid size={{ xs: 12 }} sx={{ mt: 1, mb: 1 }}>
          <Controller
            name="addTransaction"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
                label="Agregar a transacciones"
              />
            )}
          />
        </Grid>
      </Grid>
    </FormLayout>
  );
};

export default OrderTransactionForm;
