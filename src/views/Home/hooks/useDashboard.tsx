import { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext';

const useDashboard = () => {
  return useContext(DashboardContext);
};

export default useDashboard;
