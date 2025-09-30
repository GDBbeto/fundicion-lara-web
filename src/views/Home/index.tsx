import React from 'react';
import DashboardProvider from './context/DashboardContext';
import Filters from './components/Filters';
import DashboardCards from './components/DashboardCards';

const Home = () => {
  return (
    <DashboardProvider>
      <Filters />
      <DashboardCards />
    </DashboardProvider>
  );
};

export default Home;
