import React from 'react';
import ProductProvider from './context';
import ProductList from './components/ProductList';
import ProductToolbar from './components/ProductToolbar';

const InventoryPage = () => {
  return (
    <ProductProvider>
      <ProductToolbar />
      <ProductList />
    </ProductProvider>
  );
};

export default InventoryPage;
