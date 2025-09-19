import React, { useMemo } from 'react';

import CustomTable from 'components/shared/CustomTable';
import { useTransactions } from 'hooks';
import type { Transaction } from 'types/api';
import { createSalesColumns } from './Columns';

const SalesList = () => {
  const {
    transactions,
    isLoading,
    pagination,
    order,
    orderBy,
    handleRefresh,
    handlePageChange,
    handleRowsPerPageChange,
    handleSort,
  } = useTransactions();

  const handleEdit = (transaction: Transaction) => {
    console.log('Edit transaction:', transaction);
    // TODO: abrir modal de edición
  };

  const handleDelete = (transaction: Transaction) => {
    console.log('Delete transaction:', transaction);
    // TODO: mostrar modal de confirmación y eliminar
  };

  const columns = useMemo(
    () => createSalesColumns({ onEdit: handleEdit, onDelete: handleDelete }),
    [],
  );

  return (
    <CustomTable<Transaction>
      columns={columns}
      rows={transactions}
      isLoading={isLoading}
      onRefresh={handleRefresh}
      pagination={pagination}
      maxHeight="60vh"
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      rowKey="transactionId"
      order={order}
      orderBy={orderBy}
      onSort={handleSort}
    />
  );
};

export default SalesList;
