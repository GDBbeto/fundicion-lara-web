import React from 'react';
import ProductProvider from './context';
import ProductList from './components/ProductList';
import ProductToolbar from './components/ProductToolbar';

const ProductPage = () => {
  return (
    <ProductProvider>
      <ProductToolbar />
      <ProductList />
    </ProductProvider>
  );
};

export default ProductPage;
