import React, { useState, useMemo } from 'react';
import { Box, CardMedia, Typography } from '@mui/material';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import ImageIcon from '@mui/icons-material/Image';

interface ImagePreviewProps {
  imageUrl?: string | null;
  name?: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUrl,
  name = 'Producto',
}) => {
  const [imageError, setImageError] = useState(false);

  const hasImage = useMemo(() => !!imageUrl, [imageUrl]);
  const showErrorMessage = useMemo(
    () => hasImage && imageError,
    [hasImage, imageError],
  );

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius={2}
      overflow="hidden"
      width="100%"
      minHeight={180}
      bgcolor={!hasImage || showErrorMessage ? 'grey.50' : undefined}
      border="1px solid"
      borderColor="grey.200"
    >
      {hasImage && !imageError && (
        <CardMedia
          component="img"
          image={imageUrl!}
          alt={name}
          onError={() => setImageError(true)}
          sx={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            maxHeight: 180,
          }}
        />
      )}

      {showErrorMessage && (
        <Box
          textAlign="center"
          p={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <BrokenImageIcon color="disabled" sx={{ fontSize: 48, mb: 1 }} />
          <Typography variant="body1" color="text.secondary">
            Imagen no disponible
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Puede estar en proceso de carga o no existir.
          </Typography>
        </Box>
      )}

      {!hasImage && !showErrorMessage && (
        <Box
          textAlign="center"
          p={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <ImageIcon color="disabled" sx={{ fontSize: 48, mb: 1 }} />
          <Typography variant="body1" color="text.secondary">
            Sin imagen disponible
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ImagePreview;
