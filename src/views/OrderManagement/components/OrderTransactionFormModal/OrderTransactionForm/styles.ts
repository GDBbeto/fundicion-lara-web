import { SxProps, Theme } from '@mui/material';

// Estilos de Papers (Cards de secciones)
export const sectionPaper: SxProps<Theme> = {
  p: { xs: 1, sm: 2.5 },
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: 2,
  height: '100%',
};

// Estilos de títulos de sección
export const sectionTitle: SxProps<Theme> = {
  variant: 'subtitle1',
  fontWeight: 700,
  mb: 2,
  display: 'flex',
  alignItems: 'center',
  gap: 1,
};

// Paper del checkbox "Agregar a ventas"
export const checkboxPaper: SxProps<Theme> = {
  p: { xs: 1, sm: 2 },
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: 2,
  backgroundColor: 'action.hover',
};

// Checkbox más grande
export const checkboxIcon: SxProps<Theme> = {
  '& .MuiSvgIcon-root': { fontSize: 28 },
};
