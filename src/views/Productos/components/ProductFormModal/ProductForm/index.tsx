import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Box, Grid, Button } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import { NumericFormat } from 'react-number-format';

import { CustomTextField, CustomSelectField } from 'components/ui';

import type { Product } from 'types/api';

import { CAT_UNITS } from 'commons/catalogs';

import schema from './schema';

interface Props {
  product?: Product | null;
  onSubmit: (data: Product) => void;
  onCancel: () => void;
}

const ProductForm = ({ product, onSubmit, onCancel }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    resolver: yupResolver(schema) as any,
    defaultValues: product ?? {
      name: '',
      description: '',
      unidad: '',
      stock: 0,
      purchasePrice: 0,
      sellingPrice: 0,
    },
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
            name="description"
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label="Descripción"
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
                customInput={CustomTextField}
                label="Stock"
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
                {...field}
                required
                customInput={CustomTextField}
                label="Precio de compra"
                thousandSeparator
                prefix="$"
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
                {...field}
                required
                customInput={CustomTextField}
                label="Precio de venta"
                thousandSeparator
                prefix="$"
                allowNegative={false}
                error={!!errors.sellingPrice}
                helperText={errors.sellingPrice?.message}
              />
            )}
          />
        </Grid>

        <Grid
          size={{ xs: 12 }}
          display="flex"
          justifyContent="flex-end"
          gap={2}
        >
          <Button variant="outlined" onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant="contained" type="submit">
            Guardar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductForm;
