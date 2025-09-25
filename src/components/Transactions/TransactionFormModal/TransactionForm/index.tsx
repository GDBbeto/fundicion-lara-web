import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { Grid } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  CustomTextField,
  CustomDatePicker,
  FormLayout,
} from 'components/shared';

import type { Transaction, InvoiceData } from 'types/api';

import { formatDateToDefault, parseDefaultToDate } from 'utils/dateUtils';
import { useTransactions } from 'hooks';

import InvoiceFileUpload from '../InvoiceFileUpload';
import schema from './schema';

interface Props {
  id?: string;
  transaction?: Transaction | null;
  onSubmit: (data: Transaction) => void;
}

const TransactionForm = ({ id, transaction, onSubmit }: Props) => {
  const { type } = useTransactions();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Transaction>({
    resolver: yupResolver(schema) as any,
    defaultValues: transaction ?? {
      orderTransactionId: null,
      amount: null,
      description: '',
      invoiceNumber: '',
      issuerRfc: '',
      type,
      status: null,
    },
  });

  const handleExtractedData = (data: InvoiceData) => {
    setValue('invoiceNumber', data.invoiceNumber);
    setValue('amount', data.amount);
    setValue('issuerRfc', data.issuerRfc);
  };

  const handleFormSubmit = (data: Transaction) => {
    onSubmit({
      ...data,
      operationDate: formatDateToDefault(
        typeof data.operationDate === 'string'
          ? new Date(data.operationDate)
          : data.operationDate,
      ),
    });
  };

  return (
    <FormLayout id={id} onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={2}>
        {type !== 'EXPENSE' ? (
          <Grid size={{ xs: 12 }}>
            <InvoiceFileUpload onExtract={handleExtractedData} />
          </Grid>
        ) : null}

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <NumericFormat
                required
                id="amount"
                name="amount"
                inputMode="decimal"
                type="text"
                value={field.value}
                onValueChange={({ floatValue }) =>
                  field.onChange(floatValue ?? '')
                }
                customInput={CustomTextField}
                label="Monto"
                thousandSeparator
                prefix="$"
                allowNegative={false}
                decimalScale={2}
                error={!!errors.amount}
                helperText={errors.amount?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="operationDate"
            control={control}
            render={({ field }) => (
              <CustomDatePicker
                required
                id="operationDate"
                name="operationDate"
                label={'Fecha de operaci\u00F3n'}
                value={field.value ? parseDefaultToDate(field.value) : null}
                onChange={(date: Date | null) => {
                  field.onChange(date ? formatDateToDefault(date) : '');
                }}
                error={!!errors.operationDate}
                helperText={errors.operationDate?.message}
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
                label="Folio de factura"
                error={!!errors.invoiceNumber}
                helperText={errors.invoiceNumber?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="issuerRfc"
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label="RFC del emisor"
                error={!!errors.issuerRfc}
                helperText={errors.issuerRfc?.message}
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
      </Grid>
    </FormLayout>
  );
};

export default TransactionForm;
