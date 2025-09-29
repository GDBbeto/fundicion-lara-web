import React from 'react';
import DashboardProvider from './context/DashboardContext';
import Filters from './components/Filters';
import SummaryCards from './components/SummaryCards';

const Home = () => {
  return (
    <DashboardProvider>
      <Filters />
      <SummaryCards />
    </DashboardProvider>
  );
};

export default Home;
