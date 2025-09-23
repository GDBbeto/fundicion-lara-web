import React from 'react';
import { Card, CardContent, Fade, SxProps, Theme } from '@mui/material';
import { colors } from 'commons/colors';

export interface CardLayoutProps {
  children: React.ReactNode;
  variant?: 'outlined' | 'elevation';
  padding?: number | string;
  borderRadius?: number;
  elevation?: number;
  gradient?: boolean;
  topBorder?: boolean;
  hoverEffect?: boolean;
  fadeIn?: boolean;
  fadeDelay?: number;
  sx?: SxProps<Theme>;
  className?: string;
}

const CardLayout: React.FC<CardLayoutProps> = ({
  children,
  variant = 'outlined',
  padding = 2,
  borderRadius = 3,
  elevation = 0,
  gradient = true,
  topBorder = true,
  hoverEffect = true,
  fadeIn = false,
  fadeDelay = 0,
  sx = {},
  className,
}) => {
  const cardStyles: SxProps<Theme> = {
    borderRadius,
    background: gradient
      ? `linear-gradient(135deg, ${colors.white} 0%, ${colors.veryLightGray} 100%)`
      : colors.white,
    border:
      variant === 'outlined' ? `1px solid ${colors.lightSurface}` : undefined,
    position: 'relative',
    overflow: 'hidden',
    transition: hoverEffect
      ? 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      : undefined,
    '&::before': topBorder
      ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${colors.darkBlue} 0%, ${colors.lightBlue} 100%)`,
        }
      : undefined,
    '&:hover': hoverEffect
      ? {
          transform: 'translateY(-4px)',
          boxShadow: `0 8px 25px rgba(0,0,0,0.15)`,
        }
      : undefined,
    ...sx,
  };

  const cardContent = (
    <Card
      variant={variant}
      elevation={elevation}
      sx={cardStyles}
      className={className}
    >
      <CardContent sx={{ p: padding }}>{children}</CardContent>
    </Card>
  );

  if (fadeIn) {
    return (
      <Fade in timeout={300 + fadeDelay}>
        {cardContent}
      </Fade>
    );
  }

  return cardContent;
};

export default CardLayout;
