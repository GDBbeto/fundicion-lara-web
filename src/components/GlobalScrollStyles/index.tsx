import React from 'react';
import { GlobalStyles } from '@mui/material';
import { colors } from 'commons/colors';

interface GlobalScrollStylesProps {
  baseColor?: string;
  sizePx?: number;
}

function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.replace('#', '');
  const bigint = parseInt(
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => c + c)
          .join('')
      : normalized,
    16,
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const GlobalScrollStyles: React.FC<GlobalScrollStylesProps> = ({
  baseColor = colors.darkBlue,
  sizePx = 8,
}) => {
  const thumbColor = hexToRgba(baseColor, 0.6);
  const hoverColor = hexToRgba(baseColor, 0.75);
  const borderColor = hexToRgba(baseColor, 0.3);

  return (
    <GlobalStyles
      styles={{
        '*': {
          scrollbarWidth: 'thin',
          scrollbarColor: `${thumbColor} transparent`,
        },
        '*::-webkit-scrollbar': {
          width: `${sizePx}px`,
          height: `${sizePx}px`,
        },
        '*::-webkit-scrollbar-track': {
          background: 'transparent',
          borderRadius: 3,
        },
        '*::-webkit-scrollbar-thumb': {
          background: thumbColor,
          borderRadius: 3,
          border: `1px solid ${borderColor}`,
        },
        '*::-webkit-scrollbar-thumb:hover': {
          background: hoverColor,
        },
        '*::-webkit-scrollbar-corner': {
          background: 'transparent',
        },
      }}
    />
  );
};

export default GlobalScrollStyles;
