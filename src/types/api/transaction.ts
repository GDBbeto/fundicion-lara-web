export interface Transaction {
  transactionId: number;
  orderTransactionId: number | null;
  amount: number | null;
  description: string | null;
  invoiceNumber: string | null;
  issuerRfc: string | null;
  type: 'SALE' | 'PURCHASE' | 'EXPENSE';
  status: 'A' | 'I' | null;
  operationDate: string;
}
