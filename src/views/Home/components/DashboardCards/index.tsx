import React from 'react';
import { Box } from '@mui/material';

import SalesCard from './SalesCard';
import PurchaseCard from './PurchaseCard';
import BalanceCard from './BalanceCard';

const DashboardCards = () => {
  return (
    <Box sx={{ my: 2 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <SalesCard />
        </Box>
        <Box sx={{ flex: 1 }}>
          <PurchaseCard />
        </Box>
        <Box sx={{ flex: 1 }}>
          <BalanceCard />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardCards;
