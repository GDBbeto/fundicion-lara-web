import React, { useState, createContext } from 'react';

import type { Pagination, Product } from 'types/api';

import { ProductContextType } from './types';

export const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType,
);

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    pageSize: 10,
    totalElements: 5,
    totalPages: 1,
  });
  /*  React.useEffect(() => {
    setProducts([
      {
        productId: 1,
        name: 'Producto1',
        description:
          'Noise-cancelling wireless headphones with 30-hour battery life',
        unidad: 'pcs',
        stock: 3,
        purchasePrice: 10.0,
        sellingPrice: 11.0,
        avatar:
          'https://i.ibb.co/QvgD4G7N/aef7d425cbdc5f0b1d7813d7b57d412f.jpg',
      },
      {
        productId: 2,
        name: 'Producto2',
        description:
          'Noise-cancelling wireless headphones with 30-hour battery life',
        unidad: 'pcs',
        stock: 3,
        purchasePrice: 10.0,
        sellingPrice: 11.0,
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTihxmWMZ4iuFwmDMt_5cXmr3MJDXlicJgfXQ&amp;s',
      },
      {
        productId: 3,
        name: 'Producto3',
        description:
          'Noise-cancelling wireless headphones with 30-hour battery life',
        unidad: 'pcs',
        stock: 3,
        purchasePrice: 10.0,
        sellingPrice: 11.0,
        avatar:
          'https://i5.walmartimages.com/asr/1ec6edc7-dc5a-4b00-bc2e-a8ce3a62a737.de727c79f9444caa62877ccd10215e75.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF&format=avif',
      },
      {
        productId: 4,
        name: 'Producto4',
        description:
          'Noise-cancelling wireless headphones with 30-hour battery life',
        unidad: 'pcs',
        stock: 3,
        purchasePrice: 10.0,
        sellingPrice: 11.0,
        avatar:
          'https://cdn.ready-market.com.tw/f6dfea78/Templates/pic/Prod_aluninum-door-handle-HA-02.jpg?v=fb4e4683',
      },
      {
        productId: 5,
        name: 'Producto5',
        description:
          'Noise-cancelling wireless headphones with 30-hour battery life',
        unidad: 'pcs',
        stock: 3,
        purchasePrice: 10.0,
        sellingPrice: 11.0,
        avatar: null,
      },
    ]);
  }, []); */

  const setPage = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  return (
    <ProductContext.Provider
      value={{ search, products, pagination, setPage, setSearch }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
