import { SxProps, Theme } from '@mui/material';

// Animaciones CSS personalizadas para el skeleton
const skeletonAnimations = `
  @keyframes pulse {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }
`;

// Inyectar animaciones si no existen
if (
  typeof document !== 'undefined' &&
  !document.getElementById('skeleton-animations')
) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'skeleton-animations';
  styleSheet.textContent = skeletonAnimations;
  document.head.appendChild(styleSheet);
}

/**
 * Estilos para las tarjetas de gráficas
 */
export const chartCardStyles = {
  container: {
    height: '100%',
    minHeight: 280,
    display: 'flex',
    flexDirection: 'column',
  } as SxProps<Theme>,

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2,
    px: 2,
    pt: 2,
  } as SxProps<Theme>,

  title: {
    fontSize: '1rem',
    fontWeight: 600,
    color: 'text.primary',
  } as SxProps<Theme>,

  button: {
    textTransform: 'none',
    fontSize: '0.75rem',
    px: 1.5,
    py: 0.5,
    minWidth: 'auto',
  } as SxProps<Theme>,

  chartContainer: {
    flex: 1,
    px: 2,
    pb: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as SxProps<Theme>,

  skeleton: {
    width: '100%',
    height: 200,
    borderRadius: 1,
  } as SxProps<Theme>,

  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    color: 'text.secondary',
    textAlign: 'center',
  } as SxProps<Theme>,

  emptyStateIcon: {
    fontSize: 48,
    mb: 1,
    opacity: 0.5,
  } as SxProps<Theme>,

  emptyStateText: {
    fontSize: '0.875rem',
    opacity: 0.7,
  } as SxProps<Theme>,

  errorState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    color: 'error.main',
    textAlign: 'center',
  } as SxProps<Theme>,

  errorStateIcon: {
    fontSize: 48,
    mb: 1,
  } as SxProps<Theme>,

  errorStateText: {
    fontSize: '0.875rem',
  } as SxProps<Theme>,
};

/**
 * Colores para las gráficas
 */
export const chartColors = {
  sales: '#2E7D32', // Verde para ventas
  purchases: '#1976D2', // Azul para compras
  balance: {
    positive: '#FF9800', // Naranja para diferencia positiva
    negative: '#D32F2F', // Rojo para diferencia negativa
    neutral: '#2E7D32', // Verde para equilibrio
  },
  grid: '#E0E0E0',
  text: '#666666',
  tooltipBg: 'white',
  tooltipBorder: '#ccc',
};

/**
 * Estilos responsive para móviles
 */
export const mobileChartStyles = {
  container: {
    minHeight: 240,
    padding: 0,
  } as SxProps<Theme>,

  header: {
    mb: 1.5,
    px: 1.5,
    pt: 1.5,
  } as SxProps<Theme>,

  title: {
    fontSize: '0.875rem',
  } as SxProps<Theme>,

  button: {
    fontSize: '0.7rem',
    px: 1,
    py: 0.25,
  } as SxProps<Theme>,

  chartContainer: {
    px: 0,
    pb: 1.5,
  } as SxProps<Theme>,

  skeleton: {
    height: 160,
  } as SxProps<Theme>,

  emptyState: {
    height: 160,
  } as SxProps<Theme>,

  errorState: {
    height: 160,
  } as SxProps<Theme>,
};
