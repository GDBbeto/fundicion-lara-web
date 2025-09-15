import React, { useMemo, useState } from 'react';
import { Box, CardMedia, Typography } from '@mui/material';

import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { CustomModal } from 'components/shared';

import { useDevice } from 'hooks';

import { DesktopUploader, MobileUploader } from '../../AvatarUploader';

import { cardMediaStyles } from '../styles';

interface Props {
  imageUrl?: string | null;
  name: string;
  onUpload: (file: File) => void;
  loading?: boolean;
}

const ProductCardImage = ({
  imageUrl,
  name,
  onUpload,
  loading = false,
}: Props) => {
  const { isMobile } = useDevice();
  const [imageError, setImageError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const hasImage = useMemo(() => !!imageUrl, [imageUrl]);
  const showErrorMessage = useMemo(
    () => hasImage && imageError,
    [hasImage, imageError],
  );

  const handleUpload = async (file: File) => {
    await onUpload(file);
    setModalOpen(false);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  return (
    <Box
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight={!hasImage || showErrorMessage ? 200 : 'auto'}
      bgcolor={!hasImage || showErrorMessage ? 'grey.50' : undefined}
      overflow="hidden"
    >
      {imageUrl && hasImage && !imageError && (
        <CardMedia
          component="img"
          image={imageUrl}
          alt={name}
          onError={() => setImageError(true)}
          sx={cardMediaStyles}
        />
      )}

      {showErrorMessage && (
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          zIndex={1}
          textAlign="center"
        >
          <BrokenImageIcon color="disabled" sx={{ fontSize: 48, mb: 1 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Imagen en proceso de carga
          </Typography>
          <Typography variant="body2" color="text.secondary">
            La imagen puede tardar unos minutos en mostrarse. Se está cargando
            desde la nube.
          </Typography>
        </Box>
      )}

      {!hasImage && (
        <Box
          width="100%"
          height="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <CloudUploadIcon color="disabled" sx={{ fontSize: 48, mb: 1 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Sin imagen.
          </Typography>
          <Typography variant="body2" color="text.secondary" px={2}>
            Sube una desde el botón de imagen.
          </Typography>
        </Box>
      )}

      <MobileUploader
        onUpload={onUpload}
        loading={loading}
        handleOpenModal={isMobile ? undefined : handleOpenModal}
      />

      {modalOpen && (
        <CustomModal
          open={modalOpen}
          title="Actualizar imagen del producto"
          handleClose={() => setModalOpen(false)}
        >
          <DesktopUploader onUpload={handleUpload} loading={loading} />
        </CustomModal>
      )}
    </Box>
  );
};

export default ProductCardImage;
