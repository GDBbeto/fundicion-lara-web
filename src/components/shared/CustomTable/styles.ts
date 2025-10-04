import { SxProps } from '@mui/material';
import { Column } from 'types/column';

export const getTableBodySectionStyles = (col: Column<any>): SxProps => {
  if (col.sticky) {
    return {
      position: col.sticky ? 'sticky' : 'relative',
      [col.sticky === 'left' ? 'left' : col.sticky === 'right' ? 'right' : '']:
        0,
      width: col.width,
      minWidth: col.width,
      maxWidth: col.width,
      backgroundColor: col.sticky ? 'background.paper' : 'transparent',
      borderLeft: col.sticky === 'right' ? '1px solid' : 'none',
      borderLeftColor: 'divider',
      boxShadow: col.sticky === 'right' ? '-2px 0 4px rgba(0,0,0,0.1)' : 'none',
      zIndex: col.sticky ? 1 : 0,
    };
  }
  return {};
};

export const getTableCellStyles = (col: Column<any>): SxProps => {
  if (col.sticky) {
    return {
      zIndex: 3,
      position: col.sticky ? 'sticky' : 'relative',
      [col.sticky === 'left' ? 'left' : col.sticky === 'right' ? 'right' : '']:
        0,
      width: col.width,
      minWidth: col.width,
      maxWidth: col.width,
      borderLeft: col.sticky === 'right' ? '1px solid' : 'none',
      borderLeftColor: 'divider',
      boxShadow: col.sticky === 'right' ? '-2px 0 4px rgba(0,0,0,0.1)' : 'none',
    };
  }
  return {};
};

export const shadowStyles: SxProps = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '28px',
  background: `
      linear-gradient(
        to top,
        rgba(0, 0, 0, 0.18) 0%,
        rgba(0, 0, 0, 0.12) 25%,
        rgba(0, 0, 0, 0.06) 50%,
        rgba(0, 0, 0, 0.02) 75%,
        transparent 100%
      )
    `,
  pointerEvents: 'none',
  zIndex: 3,
  borderRadius: '0 0 8px 8px',
  boxShadow: 'inset 0 -2px 4px rgba(0, 0, 0, 0.08)',
  backdropFilter: 'blur(1px)',
};
