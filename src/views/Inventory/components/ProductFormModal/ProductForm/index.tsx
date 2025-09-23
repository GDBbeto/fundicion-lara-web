import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Grid } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import { NumericFormat } from 'react-number-format';

import {
  CustomTextField,
  CustomSelectField,
  FormLayout,
} from 'components/shared';

import type { Product } from 'types/api';

import { CAT_UNITS } from 'commons/catalogs';

import schema from './schema';

interface Props {
  id?: string;
  product?: Product | null;
  onSubmit: (data: Product) => void;
}

const ProductForm = ({ id, product, onSubmit }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    resolver: yupResolver(schema) as any,
    defaultValues: product ?? {
      name: '',
      client: '',
      description: '',
      unidad: null,
      stock: null,
      purchasePrice: null,
      sellingPrice: null,
    },
  });

  return (
    <FormLayout id={id} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                required
                label="Nombre del producto"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
        </Grid>

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

        <Grid size={{ xs: 12 }}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label={'Descripci\u00F3n'}
                multiline
                rows={2}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="unidad"
            control={control}
            render={({ field }) => (
              <CustomSelectField
                {...field}
                required
                label="Unidad"
                options={CAT_UNITS}
                error={!!errors.unidad}
                helperText={errors.unidad?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="stock"
            control={control}
            render={({ field }) => (
              <NumericFormat
                {...field}
                required
                inputMode="decimal"
                type="text"
                customInput={CustomTextField}
                label="Stock"
                decimalScale={2}
                allowNegative={false}
                error={!!errors.stock}
                helperText={errors.stock?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="purchasePrice"
            control={control}
            render={({ field }) => (
              <NumericFormat
                required
                id="purchasePrice"
                name="purchasePrice"
                inputMode="decimal"
                type="text"
                value={field.value}
                onValueChange={({ floatValue }) => {
                  field.onChange(floatValue ?? '');
                }}
                customInput={CustomTextField}
                label="Precio de compra"
                thousandSeparator
                prefix="$"
                decimalScale={2}
                allowNegative={false}
                error={!!errors.purchasePrice}
                helperText={errors.purchasePrice?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="sellingPrice"
            control={control}
            render={({ field }) => (
              <NumericFormat
                required
                id="sellingPrice"
                name="sellingPrice"
                inputMode="decimal"
                type="text"
                value={field.value}
                onValueChange={({ floatValue }) => {
                  field.onChange(floatValue ?? '');
                }}
                customInput={CustomTextField}
                label="Precio de venta"
                thousandSeparator
                prefix="$"
                decimalScale={2}
                allowNegative={false}
                error={!!errors.sellingPrice}
                helperText={errors.sellingPrice?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </FormLayout>
  );
};

export default ProductForm;
