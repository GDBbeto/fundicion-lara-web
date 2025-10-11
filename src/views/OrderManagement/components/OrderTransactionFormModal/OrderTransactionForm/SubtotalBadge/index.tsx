import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import type { Product } from 'types/api';

interface SubtotalBadgeProps {
  selectedProduct: Product | null;
  itemCount: number;
  extraAmount: number;
  subtotal: number;
}

const SubtotalBadge: React.FC<SubtotalBadgeProps> = ({
  selectedProduct,
  itemCount,
  extraAmount,
  subtotal,
}) => {
  // Calcular subtotal del producto (sin cargo adicional)
  const productSubtotal =
    selectedProduct && itemCount
      ? (selectedProduct.purchasePrice || 0) * itemCount
      : 0;
  return (
    <Box
      sx={{
        mb: 2,
        p: 2,
        borderRadius: 2,
        background:
          subtotal > 0
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
        color: 'white',
        textAlign: 'center',
        boxShadow:
          subtotal > 0
            ? '0 4px 12px rgba(102, 126, 234, 0.3)'
            : '0 2px 8px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={1}
        mb={0.5}
      >
        <Typography variant="caption" sx={{ opacity: 0.9 }}>
          Subtotal estimado
        </Typography>
        {selectedProduct && itemCount > 0 && (
          <Tooltip
            title={
              <Box sx={{ p: 1 }}>
                <Typography variant="subtitle2" fontWeight={600} mb={1}>
                  📊 Cálculo del subtotal
                </Typography>
                <Typography variant="body2" mb={1}>
                  El subtotal se calcula de la siguiente manera:
                </Typography>

                {/* Subtotal del producto */}
                <Box
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.1)',
                    p: 1.5,
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    textAlign="center"
                    mb={0.5}
                  >
                    1️⃣ Precio × Cantidad
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    textAlign="center"
                    color="primary.light"
                  >
                    $
                    {(selectedProduct.purchasePrice || 0).toLocaleString(
                      'es-MX',
                      { minimumFractionDigits: 2 },
                    )}{' '}
                    × {itemCount}
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    textAlign="center"
                    mt={0.5}
                  >
                    = $
                    {productSubtotal.toLocaleString('es-MX', {
                      minimumFractionDigits: 2,
                    })}
                  </Typography>
                </Box>

                {/* Cargo adicional */}
                {extraAmount > 0 && (
                  <Box
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.1)',
                      p: 1.5,
                      borderRadius: 1,
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      textAlign="center"
                      mb={0.5}
                    >
                      2️⃣ Cargo adicional
                    </Typography>
                    <Typography
                      variant="body2"
                      textAlign="center"
                      color="text.secondary"
                      fontSize="0.75rem"
                    >
                      (envío, empaquetado, etc.)
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      textAlign="center"
                      color="warning.light"
                      mt={0.5}
                    >
                      + $
                      {extraAmount.toLocaleString('es-MX', {
                        minimumFractionDigits: 2,
                      })}
                    </Typography>
                  </Box>
                )}

                {/* Total final */}
                <Box
                  sx={{
                    borderTop: '2px solid rgba(255,255,255,0.3)',
                    pt: 1.5,
                    mt: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    fontWeight={700}
                    textAlign="center"
                  >
                    SUBTOTAL TOTAL
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    textAlign="center"
                    color="success.light"
                    mt={0.5}
                  >
                    $
                    {subtotal.toLocaleString('es-MX', {
                      minimumFractionDigits: 2,
                    })}
                  </Typography>
                </Box>
              </Box>
            }
            arrow
            placement="top"
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: 'rgba(0, 0, 0, 0.9)',
                  '& .MuiTooltip-arrow': {
                    color: 'rgba(0, 0, 0, 0.9)',
                  },
                  maxWidth: 320,
                },
              },
            }}
          >
            <Box
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
                width: 28,
                height: 28,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                border: '2px solid rgba(255, 255, 255, 0.5)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.5)',
                  transform: 'scale(1.15)',
                  borderColor: 'rgba(255, 255, 255, 0.8)',
                },
              }}
            >
              <InfoOutlinedIcon sx={{ fontSize: 20, color: 'white' }} />
            </Box>
          </Tooltip>
        )}
      </Box>
      <Typography variant="h4" fontWeight={700}>
        $
        {subtotal.toLocaleString('es-MX', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </Typography>
      {subtotal === 0 && (
        <Typography variant="caption" sx={{ opacity: 0.8, mt: 0.5 }}>
          Selecciona producto y cantidad
        </Typography>
      )}
    </Box>
  );
};

export default SubtotalBadge;
