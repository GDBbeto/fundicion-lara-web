import React from 'react';
import { Box, Grid, Paper, Skeleton, Stack, Divider } from '@mui/material';

const sectionPaper = {
  p: 2.5,
  borderRadius: 2,
  backgroundColor: '#fff',
  border: '1px solid #e0e0e0',
  height: '100%',
};

const OrderTransactionDetailSkeleton = () => {
  return (
    <Box width="100%">
      <Grid container spacing={2.5}>
        {/* ======= COLUMNA 1: PEDIDO ======= */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={0} sx={sectionPaper}>
            <Skeleton variant="text" width="40%" height={28} sx={{ mb: 2 }} />

            <Stack spacing={1.5}>
              {/* Imagen */}
              <Skeleton
                variant="rectangular"
                width="100%"
                sx={{
                  borderRadius: 2,
                  bgcolor: 'grey.100',
                  aspectRatio: '1/1',
                }}
              />

              {[1, 2, 3, 4].map((i) => (
                <Stack key={i} direction="row" spacing={1} alignItems="center">
                  <Skeleton variant="circular" width={24} height={24} />
                  <Skeleton variant="text" width="80%" height={20} />
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* ======= COLUMNA 2: PAGO ======= */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={0} sx={sectionPaper}>
            <Skeleton variant="text" width="35%" height={28} sx={{ mb: 2 }} />

            {/* Badge total */}
            <Box
              sx={{
                bgcolor: 'grey.100',
                p: 2,
                borderRadius: 2,
                mb: 2,
                textAlign: 'center',
              }}
            >
              <Skeleton
                variant="text"
                width="60%"
                height={28}
                sx={{ mx: 'auto', mb: 1 }}
              />
              <Skeleton
                variant="text"
                width="40%"
                height={22}
                sx={{ mx: 'auto' }}
              />
            </Box>

            <Stack spacing={1.5}>
              {[1, 2].map((i) => (
                <Stack key={i} direction="row" spacing={1} alignItems="center">
                  <Skeleton variant="circular" width={20} height={20} />
                  <Skeleton variant="text" width="80%" height={20} />
                </Stack>
              ))}

              <Divider sx={{ my: 1 }} />

              <Stack direction="row" spacing={1} alignItems="center">
                <Skeleton variant="circular" width={18} height={18} />
                <Skeleton variant="text" width="50%" height={18} />
                <Skeleton
                  variant="rounded"
                  width="30%"
                  height={24}
                  sx={{ borderRadius: 1 }}
                />
              </Stack>
            </Stack>
          </Paper>
        </Grid>

        {/* ======= COLUMNA 3: ENTREGA ======= */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={0} sx={sectionPaper}>
            <Skeleton variant="text" width="40%" height={28} sx={{ mb: 2 }} />

            <Stack spacing={1.5}>
              {[1, 2].map((i) => (
                <Stack key={i} direction="row" spacing={1} alignItems="center">
                  <Skeleton variant="circular" width={20} height={20} />
                  <Skeleton variant="text" width="75%" height={20} />
                </Stack>
              ))}

              <Divider sx={{ my: 1 }} />

              <Stack direction="row" spacing={1} alignItems="center">
                <Skeleton variant="circular" width={18} height={18} />
                <Skeleton variant="text" width="60%" height={18} />
                <Skeleton
                  variant="rounded"
                  width="35%"
                  height={24}
                  sx={{ borderRadius: 1 }}
                />
              </Stack>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* ======= DESCRIPCIÓN ======= */}
      <Box mt={2.5}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            border: '1px solid #e0e0e0',
            borderRadius: 2,
            bgcolor: '#fafafa',
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="flex-start">
            <Skeleton variant="circular" width={20} height={20} />
            <Box flex={1}>
              <Skeleton
                variant="text"
                width="30%"
                height={20}
                sx={{ mb: 0.5 }}
              />
              <Skeleton variant="text" width="90%" height={18} />
              <Skeleton variant="text" width="80%" height={18} />
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default OrderTransactionDetailSkeleton;
