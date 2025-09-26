import React from 'react';
import DashboardProvider from './context/DashboardContext';
import Filters from './components/Filters';

const Home = () => {
  return (
    <DashboardProvider>
      <Filters />
    </DashboardProvider>
  );
};

export default Home;
