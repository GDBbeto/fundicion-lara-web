import React, { useEffect, useState } from 'react';

import CustomTable from 'components/shared/CustomTable';

import type { Pagination, Product } from 'types/api';
import type { Column } from 'types/column';

export const mockProducts: Product[] = Array.from({ length: 50 }, (_, i) => ({
  productId: i + 1,
  name: `Producto ${i + 1}`,
  client: `Cliente ${(i % 5) + 1}`,
  description: `Este es el producto número ${i + 1}`,
  unidad: 'Unidad',
  stock: Math.floor(Math.random() * 100),
  purchasePrice: +(Math.random() * 100).toFixed(2),
  sellingPrice: +(Math.random() * 150).toFixed(2),
}));

export const productColumns: Column<Product>[] = [
  { apiField: 'productId', label: 'ID', align: 'center', sort: true },
  { apiField: 'name', label: 'Nombre', sort: true },
  { apiField: 'client', label: 'Cliente', sort: true },
  { apiField: 'description', label: 'Descripción', sort: true },
  { apiField: 'unidad', label: 'Unidad', align: 'center', sort: true },
  { apiField: 'stock', label: 'Stock', align: 'center', sort: true },
  {
    apiField: 'purchasePrice',
    label: 'Precio compra',
    align: 'right',
    render: (row) => `$${row.purchasePrice?.toFixed(2)}`,
    sort: true,
  },
  {
    apiField: 'sellingPrice',
    label: 'Precio venta',
    align: 'right',
    render: (row) => `$${row.sellingPrice?.toFixed(2)}`,
    sort: true,
  },
];

const Home = () => {
  const [rows, setRows] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    pageSize: 50,
    totalElements: mockProducts.length,
  });
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Product>('name');

  const handleSort = (property: keyof Product) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Simula carga de datos
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const start = (pagination.page - 1) * pagination.pageSize;
      const end = start + pagination.pageSize;
      setRows(mockProducts.slice(start, end));
      setIsLoading(false);
    }, 800); // Delay simulado

    return () => clearTimeout(timer);
  }, [pagination.page, pagination.pageSize]);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const handlePageChange = (_: unknown, newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage + 1 }));
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPagination({
      page: 1,
      pageSize: parseInt(event.target.value, 10),
      totalElements: mockProducts.length,
    });
  };

  return (
    <CustomTable<Product>
      columns={productColumns}
      rows={rows}
      // title="Listado de productos"
      isLoading={isLoading}
      onRefresh={handleRefresh}
      pagination={pagination}
      maxHeight={'70vh'}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      rowKey="productId"
      order={order}
      orderBy={orderBy}
      onSort={handleSort}
    />
  );
};

export default Home;
