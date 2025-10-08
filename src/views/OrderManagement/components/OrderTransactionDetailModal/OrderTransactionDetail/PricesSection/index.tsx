import React from 'react';
import { Paper, Typography, Stack, Grid, Box } from '@mui/material';
import { AttachMoney, Payment, TrendingUp } from '@mui/icons-material';
import { NumericFormat } from 'react-number-format';

import type { OrderTransaction } from 'types/api';
import { colors } from 'commons/colors';
import InfoItem from '../InfoItem';

interface PricesSectionProps {
  transaction: OrderTransaction;
}

const PricesSection = ({ transaction }: PricesSectionProps) => (
  <Paper
    elevation={0}
    sx={{
      p: { xs: 1.5, sm: 1.5 },
      border: `1px solid ${colors.lightBlue}30`,
      borderRadius: 2,
      height: '100%',
    }}
  >
    <Typography
      variant="caption"
      fontWeight={700}
      sx={{
        mb: { xs: 1, sm: 1 },
        color: colors.darkBlue,
        display: 'block',
        fontSize: { xs: '0.7rem', sm: '0.75rem' },
      }}
    >
      Montos y Precios
    </Typography>

    {/* Versión móvil: Grid compacto */}
    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 6 }}>
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'block', fontSize: '0.65rem', mb: 0.3 }}
            >
              P. Compra
            </Typography>
            <NumericFormat
              value={transaction.purchasePrice || 0}
              displayType="text"
              thousandSeparator=","
              prefix="$"
              decimalScale={2}
              fixedDecimalScale
              renderText={(value) => (
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{ fontSize: '0.75rem', color: colors.darkText }}
                >
                  {value}
                </Typography>
              )}
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'block', fontSize: '0.65rem', mb: 0.3 }}
            >
              P. Venta
            </Typography>
            <NumericFormat
              value={transaction.sellingPrice || 0}
              displayType="text"
              thousandSeparator=","
              prefix="$"
              decimalScale={2}
              fixedDecimalScale
              renderText={(value) => (
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{ fontSize: '0.75rem', color: colors.darkText }}
                >
                  {value}
                </Typography>
              )}
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'block', fontSize: '0.65rem', mb: 0.3 }}
            >
              Ganancia
            </Typography>
            <NumericFormat
              value={transaction.profit || 0}
              displayType="text"
              thousandSeparator=","
              prefix="$"
              decimalScale={2}
              fixedDecimalScale
              renderText={(value) => (
                <Typography
                  variant="body2"
                  fontWeight={700}
                  sx={{
                    fontSize: '0.75rem',
                    color: transaction.profit > 0 ? colors.green : colors.red,
                  }}
                >
                  {value}
                </Typography>
              )}
            />
          </Box>
        </Grid>
        {transaction.extraAmount > 0 && (
          <Grid size={{ xs: 6 }}>
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', fontSize: '0.65rem', mb: 0.3 }}
              >
                Monto Extra
              </Typography>
              <NumericFormat
                value={transaction.extraAmount}
                displayType="text"
                thousandSeparator=","
                prefix="$"
                decimalScale={2}
                fixedDecimalScale
                renderText={(value) => (
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{ fontSize: '0.75rem', color: colors.darkText }}
                  >
                    {value}
                  </Typography>
                )}
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>

    {/* Versión desktop: Stack vertical */}
    <Stack spacing={1} sx={{ display: { xs: 'none', sm: 'flex' } }}>
      <InfoItem
        icon={<AttachMoney sx={{ fontSize: 16 }} />}
        label="Precio Compra"
        value={
          <NumericFormat
            value={transaction.purchasePrice || 0}
            displayType="text"
            thousandSeparator=","
            prefix="$"
            decimalScale={2}
            fixedDecimalScale
          />
        }
      />
      <InfoItem
        icon={<Payment sx={{ fontSize: 16 }} />}
        label="Precio Venta"
        value={
          <NumericFormat
            value={transaction.sellingPrice || 0}
            displayType="text"
            thousandSeparator=","
            prefix="$"
            decimalScale={2}
            fixedDecimalScale
          />
        }
      />
      <InfoItem
        icon={<TrendingUp sx={{ fontSize: 16 }} />}
        label="Ganancia"
        value={
          <NumericFormat
            value={transaction.profit || 0}
            displayType="text"
            thousandSeparator=","
            prefix="$"
            decimalScale={2}
            fixedDecimalScale
          />
        }
        valueColor={transaction.profit > 0 ? colors.green : colors.red}
      />
      {transaction.extraAmount > 0 && (
        <InfoItem
          icon={<AttachMoney sx={{ fontSize: 16 }} />}
          label="Monto Extra"
          value={
            <NumericFormat
              value={transaction.extraAmount}
              displayType="text"
              thousandSeparator=","
              prefix="$"
              decimalScale={2}
              fixedDecimalScale
            />
          }
        />
      )}
    </Stack>
  </Paper>
);

export default PricesSection;
