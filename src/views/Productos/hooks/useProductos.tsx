import { useContext } from 'react';
import { ProductContext } from '../context';

const useProductos = () => {
  const context = useContext(ProductContext);

  return context;
};

export default useProductos;
