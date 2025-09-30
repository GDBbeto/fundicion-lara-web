import React from 'react';
import { Typography, Skeleton, Box } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { colors } from 'commons/colors';

interface SummaryCardProps {
  title: string;
  subtitle: string;
  value: number | null;
  icon: React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  iconColor?: string;
  valueColor?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  isLoading = false,
  isError = false,
  errorMessage = 'Error al cargar datos',
  iconColor = colors.darkBlue,
  valueColor = colors.darkBlue,
}) => {
  if (isLoading) {
    return (
      <Box sx={{ height: '100%', minHeight: 80 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            height: '100%',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="text" width={80} height={24} />
          </Box>
          <Skeleton variant="text" width="60%" height={16} />
        </Box>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ height: '100%', minHeight: 80 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            height: '100%',
            justifyContent: 'center',
            color: colors.darkText,
            opacity: 0.6,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.75rem',
              fontWeight: 500,
              mb: 0.5,
              opacity: 0.8,
            }}
          >
            {`${title}`}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.7rem' }}>
            {errorMessage}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', minHeight: 80 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        {/* Título */}
        <Typography
          variant="body2"
          sx={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: colors.darkText,
            mb: 0.5,
            opacity: 0.9,
          }}
        >
          {`${title}`}
        </Typography>

        {/* Icono y valor en una línea */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            justifyContent: 'center',
            mb: 0.5,
          }}
        >
          <Box
            sx={{
              p: 0.5,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              backgroundColor: `${iconColor}20`,
              color: iconColor,
            }}
          >
            {icon}
          </Box>

          <NumericFormat
            value={value || 0}
            displayType="text"
            thousandSeparator
            prefix="$"
            decimalScale={0}
            fixedDecimalScale
            renderText={(formattedValue) => (
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: valueColor,
                }}
              >
                {formattedValue}
              </Typography>
            )}
          />
        </Box>
        {/* Subtítulo */}
        <Typography
          variant="caption"
          sx={{
            color: colors.darkText,
            opacity: 0.8,
            textAlign: 'center',
            lineHeight: 1.2,
            fontWeight: 500,
          }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default SummaryCard;
