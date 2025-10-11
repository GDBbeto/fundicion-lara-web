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
  OrderTransactionRequest,
  Product,
  PaymentStatus,
} from 'types/api';

import {
  CAT_METHOD_PAYMENT,
  CAT_PAYMENT_STATUS,
  CAT_DELIVERY_STATUS,
} from 'commons/catalogs';

import SubtotalBadge from './SubtotalBadge';
import AddToSalesCheckbox from './AddToSalesCheckbox';

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

  // Observar cambios en cantidad, monto extra y monto pagado
  const itemCount = watch('itemCount') || 0;
  const extraAmount = watch('extraAmount') || 0;
  const amountPaid = watch('amountPaid');
  const paymentStatus = watch('paymentStatus');
  const deliveryStatus = watch('deliveryStatus');
  const addTransaction = watch('addTransaction');

  // Referencias para controlar cuándo actualizar el estado de pago
  const previousSubtotal = useRef<number>(0);

  const subtotal = useMemo(() => {
    if (!selectedProduct || !itemCount) return 0;
    const productTotal = (selectedProduct.purchasePrice || 0) * itemCount;
    return productTotal + extraAmount;
  }, [selectedProduct, itemCount, extraAmount]);

  useEffect(() => {
    if (amountPaid === null || !subtotal || subtotal <= 0) {
      setValue('paymentStatus', null);
      return;
    }

    const getPaymentStatus = () => {
      if (amountPaid === 0) return PaymentStatus.PENDING;
      if (amountPaid < subtotal) return PaymentStatus.INCOMPLETE;
      return PaymentStatus.PAID;
    };

    setValue('paymentStatus', getPaymentStatus());
  }, [amountPaid, subtotal, setValue]);

  // Resetear estado de pago a null cuando cambia el subtotal
  // Solo si el estado es PAID y ahora amountPaid es menor al subtotal
  useEffect(() => {
    if (
      previousSubtotal.current !== subtotal &&
      previousSubtotal.current !== 0
    ) {
      // Solo resetear si el estado es PAID y el monto ya no cubre el subtotal
      if (
        paymentStatus === PaymentStatus.PAID &&
        (amountPaid || 0) < subtotal
      ) {
        setValue('paymentStatus', null, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    }
    previousSubtotal.current = subtotal;
  }, [subtotal, setValue, paymentStatus, amountPaid]);

  // Desactivar addTransaction si no se cumplen las condiciones
  useEffect(() => {
    const canAddToSales =
      paymentStatus === PaymentStatus.PAID &&
      deliveryStatus === DeliveryStatus.DELIVERED;

    if (!canAddToSales && addTransaction) {
      setValue('addTransaction', false);
    }
  }, [paymentStatus, deliveryStatus, addTransaction, setValue]);

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

            {/* SUBTOTAL CALCULADO */}
            <SubtotalBadge
              selectedProduct={selectedProduct}
              itemCount={itemCount}
              extraAmount={extraAmount}
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
