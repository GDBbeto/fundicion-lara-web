export interface Transaction {
  transactionId: number;
  orderTransactionId: number | null;
  amount: number | null;
  description: string;
  invoiceNumber: string;
  issuerRfc: string;
  type: 'SALE' | 'PURCHASE' | 'EXPENSE';
  status: 'A' | 'I' | null;
  operationDate: string;
}
