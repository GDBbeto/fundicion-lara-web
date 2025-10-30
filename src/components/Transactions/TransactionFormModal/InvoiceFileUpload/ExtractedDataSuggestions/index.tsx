import React from 'react';

import { Box, Chip, Typography, Stack, Paper } from '@mui/material';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BusinessIcon from '@mui/icons-material/Business';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TouchAppIcon from '@mui/icons-material/TouchApp';

import { NumericFormat } from 'react-number-format';

import type { InvoiceData, Transaction } from 'types/api';

import { useDevice } from 'hooks';

const config = {
  rfc: {
    icon: <BusinessIcon />,
    label: 'RFC del Emisor',
    color: '#1976d2',
    bgColor: '#e3f2fd',
  },
  folio: {
    icon: <DescriptionIcon />,
    label: 'Folio de Factura',
    color: '#9c27b0',
    bgColor: '#f3e5f5',
  },
  amount: {
    icon: <AttachMoneyIcon />,
    label: 'Total',
    color: '#2e7d32',
    bgColor: '#e8f5e9',
  },
};

interface Props {
  data: InvoiceData;
  onSelect: (field: keyof Transaction, value: string | number) => void;
}

const ExtractedDataSuggestions = ({ data, onSelect }: Props) => {
  const { isSmallScreenV2: isMobile } = useDevice();
  if (!data?.pdfInfoFallback) return null;

  const { pdfInfoFallback } = data;

  // Agrupar por tipo
  const rfcSuggestions: string[] = [];
  const folioSuggestions: string[] = [];
  const amountSuggestions: (string | number)[] = [];

  Object.entries(pdfInfoFallback).forEach(([key, value]) => {
    const lowerKey = key.toLowerCase();
    if (lowerKey.includes('rfc')) rfcSuggestions.push(value as string);
    else if (lowerKey.includes('folio') || lowerKey.includes('number'))
      folioSuggestions.push(value as string);
    else if (lowerKey.includes('amount') || lowerKey.includes('total'))
      amountSuggestions.push(value);
  });

  const hasAnySuggestions =
    rfcSuggestions.length > 0 ||
    folioSuggestions.length > 0 ||
    amountSuggestions.length > 0;

  if (!hasAnySuggestions) return null;

  const renderSuggestions = (
    items: (string | number)[],
    field: keyof Transaction,
    type: 'rfc' | 'folio' | 'amount',
  ) => {
    const configData = config[type];

    return (
      <Box mb={2}>
        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
          <Box
            sx={{
              p: 0.5,
              borderRadius: 1,
              bgcolor: configData.bgColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box sx={{ color: configData.color, fontSize: '1.1rem' }}>
              {configData.icon}
            </Box>
          </Box>
          <Typography variant="caption" fontWeight={600} color="text.primary">
            {configData.label}
          </Typography>
        </Stack>
        <Box sx={{ width: '100%' }}>
          {items.map((value, idx) => {
            const renderLabel = () => {
              if (type === 'amount' && typeof value === 'number') {
                return (
                  <NumericFormat
                    value={value}
                    displayType="text"
                    thousandSeparator={true}
                    prefix="$ "
                    fixedDecimalScale
                    decimalScale={2}
                  />
                );
              }
              return String(value);
            };

            return (
              <Chip
                key={idx}
                label={renderLabel()}
                clickable
                size="small"
                onClick={() => onSelect(field, value)}
                sx={{
                  bgcolor: 'background.paper',
                  border: '1.5px solid',
                  borderColor: configData.color,
                  color: configData.color,
                  fontSize: '0.75rem',
                  height: '28px',
                  width: { xs: '100%', sm: 'auto' },
                  mb: { xs: 1, sm: 1 },
                  mr: { xs: 0, sm: 1 },
                  justifyContent: 'flex-start',
                  '&:hover': {
                    bgcolor: configData.color,
                    color: 'white',
                    transform: 'translateY(-1px)',
                    boxShadow: 2,
                  },
                  transition: 'all 0.2s ease-in-out',
                  '& .MuiChip-label': {
                    px: 1,
                    textAlign: 'left',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start',
                  },
                }}
                icon={
                  <TouchAppIcon
                    sx={{
                      fontSize: '0.875rem',
                      color: 'inherit',
                    }}
                  />
                }
              />
            );
          })}
        </Box>
      </Box>
    );
  };

  return (
    <Box mt={2}>
      <Paper
        elevation={3}
        sx={{
          mt: 2,
          mb: 2,
          p: 2.5,
          borderRadius: 3,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <InfoOutlinedIcon color="info" />
        <Box>
          <Typography variant="body2" fontWeight={500} color="text.primary">
            {isMobile
              ? 'No pudimos extraer la información.'
              : ' No pudimos extraer automáticamente la información.'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {isMobile
              ? 'Elige una de las sugerencias disponibles.'
              : 'Aquí tienes algunas sugerencias que puedes seleccionar'}
          </Typography>
        </Box>
      </Paper>

      {rfcSuggestions.length > 0 &&
        renderSuggestions(rfcSuggestions, 'issuerRfc', 'rfc')}

      {folioSuggestions.length > 0 &&
        renderSuggestions(folioSuggestions, 'invoiceNumber', 'folio')}

      {amountSuggestions.length > 0 &&
        renderSuggestions(amountSuggestions, 'amount', 'amount')}
    </Box>
  );
};

export default ExtractedDataSuggestions;
