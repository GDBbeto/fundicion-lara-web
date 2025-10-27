import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useAuth } from 'hooks';

import {
  containerStyles,
  cardStyles,
  iconStyles,
  titleStyles,
  descriptionStyles,
  stackStyles,
  buttonStyles,
  captionStyles,
  infoBoxStyles,
  infoTitleStyles,
  infoTextStyles,
} from './styles';

const PendingRoleNotice = () => {
  const { logout } = useAuth();

  return (
    <Box sx={containerStyles}>
      <Box sx={cardStyles}>
        <HourglassEmptyIcon sx={iconStyles} />

        <Typography sx={titleStyles}>
          Tu cuenta está pendiente de aprobación
        </Typography>

        <Typography sx={descriptionStyles}></Typography>

        <Box sx={infoBoxStyles}>
          <Typography sx={infoTitleStyles}>
            <InfoOutlinedIcon
              sx={{ fontSize: '1rem', mr: 0.5, verticalAlign: 'middle' }}
            />
            Información importante
          </Typography>
          <Typography sx={infoTextStyles}>
            Tu registro se ha completado correctamente, pero aún no tienes
            permisos para acceder al sistema. Un administrador revisará tu
            solicitud y te asignará un rol próximamente.{' '}
          </Typography>
        </Box>

        <Stack sx={stackStyles}>
          <Button
            variant="contained"
            color="primary"
            onClick={logout}
            sx={buttonStyles}
          >
            Cerrar sesión
          </Button>

          <Typography sx={captionStyles}>
            Si crees que esto es un error, contacta al administrador.
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default PendingRoleNotice;
