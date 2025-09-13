export interface Transaction {
  transactionId: number;
  orderTransactionId: number | null;
  amount: number;
  description: string;
  invoiceNumber: string;
  issuerRfc: string;
  type: 'SALE' | 'PURCHASE' | 'EXPENSE';
  status: 'A' | 'I';
  operationDate: string;
}
