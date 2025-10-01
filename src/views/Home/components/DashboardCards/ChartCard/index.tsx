import React from 'react';
import {
  Typography,
  Skeleton,
  Box,
  useTheme,
  Fade,
  CircularProgress,
  Chip,
} from '@mui/material';
import { TrendingUp, ErrorOutline, Timeline } from '@mui/icons-material';

import { useDevice } from 'hooks';

import { chartCardStyles as styles } from './styles';

interface ChartCardProps {
  title: string;
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  errorMessage?: string;
  emptyMessage?: string;
  onViewDetails?: () => void;
  children: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({
  isLoading = false,
  isError = false,
  isEmpty = false,
  errorMessage,
  emptyMessage = 'No hay datos para mostrar',
  children,
}) => {
  const theme = useTheme();
  const { isSmallScreen } = useDevice();

  const renderContent = () => {
    if (isLoading) {
      return (
        <Fade in={isLoading} timeout={300}>
          <Box sx={styles.chartContainer}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: 280,
                gap: 3,
                p: 2,
              }}
            >
              {/* Header skeleton */}
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 1,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Skeleton variant="circular" width={24} height={24} />
                  <Skeleton variant="text" width={120} height={24} />
                </Box>
                <Skeleton
                  variant="rectangular"
                  width={100}
                  height={32}
                  sx={{ borderRadius: 2 }}
                />
              </Box>

              {/* Chart area skeleton */}
              <Box sx={{ width: '100%', height: 200, position: 'relative' }}>
                {/* Y-axis labels skeleton */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    py: 2,
                  }}
                >
                  <Skeleton variant="text" width={40} height={16} />
                  <Skeleton variant="text" width={40} height={16} />
                  <Skeleton variant="text" width={40} height={16} />
                  <Skeleton variant="text" width={40} height={16} />
                  <Skeleton variant="text" width={40} height={16} />
                </Box>

                {/* Chart content skeleton */}
                <Box sx={{ ml: 5, height: '100%', position: 'relative' }}>
                  {/* Grid lines skeleton */}
                  {[0, 25, 50, 75, 100].map((position) => (
                    <Skeleton
                      key={position}
                      variant="rectangular"
                      width="100%"
                      height={1}
                      sx={{
                        position: 'absolute',
                        top: `${position}%`,
                        opacity: 0.3,
                      }}
                    />
                  ))}

                  {/* Data line skeleton */}
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={3}
                    sx={{
                      position: 'absolute',
                      top: '60%',
                      borderRadius: 2,
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}20 0%, ${theme.palette.primary.main}60 50%, ${theme.palette.primary.main}20 100%)`,
                      animation: 'pulse 2s ease-in-out infinite',
                    }}
                  />

                  {/* Data points skeleton */}
                  {[10, 30, 50, 70, 90].map((position, index) => (
                    <Skeleton
                      key={index}
                      variant="circular"
                      width={8}
                      height={8}
                      sx={{
                        position: 'absolute',
                        left: `${position}%`,
                        top: '58%',
                        backgroundColor: theme.palette.primary.main,
                        opacity: 0.6,
                        animation: 'pulse 2s ease-in-out infinite',
                        animationDelay: `${index * 0.2}s`,
                      }}
                    />
                  ))}
                </Box>

                {/* X-axis labels skeleton */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 5,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'space-between',
                    px: 1,
                  }}
                >
                  <Skeleton variant="text" width={30} height={16} />
                  <Skeleton variant="text" width={30} height={16} />
                  <Skeleton variant="text" width={30} height={16} />
                  <Skeleton variant="text" width={30} height={16} />
                  <Skeleton variant="text" width={30} height={16} />
                </Box>
              </Box>

              {/* Loading indicator */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mt: 1,
                }}
              >
                <CircularProgress
                  size={16}
                  thickness={4}
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 500,
                    fontSize: '0.75rem',
                  }}
                >
                  Cargando datos...
                </Typography>
              </Box>
            </Box>
          </Box>
        </Fade>
      );
    }

    if (isError) {
      return (
        <Fade in={isError} timeout={300}>
          <Box sx={styles.chartContainer}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: 280,
                gap: 2,
                p: 3,
              }}
            >
              <Box
                sx={{
                  p: 2,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.error.light + '20',
                  color: theme.palette.error.main,
                }}
              >
                <ErrorOutline sx={{ fontSize: 32 }} />
              </Box>

              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: 600,
                  textAlign: 'center',
                }}
              >
                Información no disponible.
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  textAlign: 'center',
                  maxWidth: 280,
                }}
              >
                {errorMessage}
              </Typography>
            </Box>
          </Box>
        </Fade>
      );
    }

    if (isEmpty) {
      return (
        <Fade in={isEmpty} timeout={300}>
          <Box sx={styles.chartContainer}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: 280,
                gap: 2,
                p: 3,
              }}
            >
              <Box
                sx={{
                  p: 2,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.info.light + '20',
                  color: theme.palette.info.main,
                }}
              >
                <Timeline sx={{ fontSize: 32 }} />
              </Box>

              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: 600,
                  textAlign: 'center',
                }}
              >
                {emptyMessage}
              </Typography>

              <Chip
                icon={<TrendingUp />}
                label="Selecciona otro período"
                variant="outlined"
                sx={{
                  mt: 1,
                  '& .MuiChip-icon': {
                    fontSize: 16,
                  },
                }}
              />
            </Box>
          </Box>
        </Fade>
      );
    }

    return (
      <Fade in={true} timeout={500}>
        <Box sx={styles.chartContainer}>{children}</Box>
      </Fade>
    );
  };

  if (isSmallScreen) return null;

  return <Box sx={styles.container}>{renderContent()}</Box>;
};

export default ChartCard;
