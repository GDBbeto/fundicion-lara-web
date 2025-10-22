import React from 'react';
import { Box, Stack, Skeleton } from '@mui/material';

import { CardLayout } from 'components/shared';

interface Props {
  length?: number;
}

const UserCardSkeleton = ({ length = 3 }: Props) => {
  return (
    <Box display="flex" flexDirection="column" gap={2} mt={2}>
      {Array.from({ length }).map((_, index) => (
        <CardLayout
          key={index}
          gradient={false}
          topBorder={false}
          hoverEffect={false}
        >
          <Stack spacing={2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Skeleton variant="text" width={120} height={20} />
              <Skeleton
                variant="rectangular"
                width={40}
                height={32}
                sx={{ borderRadius: 1 }}
              />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Skeleton variant="circular" width={56} height={56} />
              <Box flex={1}>
                <Skeleton variant="text" width="80%" height={20} />
                <Skeleton variant="text" width="60%" height={16} />
              </Box>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Skeleton variant="text" width="40%" height={16} />
              <Skeleton
                variant="rectangular"
                width={100}
                height={24}
                sx={{ borderRadius: 3 }}
              />
            </Stack>
          </Stack>
        </CardLayout>
      ))}
    </Box>
  );
};

export default UserCardSkeleton;
