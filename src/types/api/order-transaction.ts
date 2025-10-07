export enum MethodPayment {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  PAYPAL = 'PAYPAL',
  BANK_TRANSFER = 'BANK_TRANSFER',
  CASH = 'CASH',
}

export enum PaymentStatus {
  PAID = 'PAID',
  PENDING = 'PENDING',
  INCOMPLETE = 'INCOMPLETE',
}

export enum DeliveryStatus {
  PENDING = 'PENDING',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  ON_HOLD = 'ON_HOLD',
}

export interface OrderTransaction {
  orderTransactionId: number | null;
  extraAmount: number;
  description: string;
  productId: number;
  productName: string;
  productImageUrl?: string | null;
  itemCount: number;
  methodPayment: MethodPayment;
  invoiceNumber: string;
  client: string;
  amountPaid: number;
  paymentStatus: PaymentStatus;
  deliveryStatus: DeliveryStatus;
  purchasePrice: number;
  sellingPrice: number;
  profit: number;
  operationDate: string;
  addTransaction: boolean;
}

export interface OrderTransactionRequest {
  orderTransactionId: number | null;
  extraAmount: number;
  description: string;
  productId: number;
  itemCount: number;
  methodPayment: MethodPayment | null;
  invoiceNumber: string;
  client: string;
  amountPaid: number;
  paymentStatus: PaymentStatus | null;
  deliveryStatus: DeliveryStatus | null;
  operationDate: string;
  addTransaction: boolean;
}
