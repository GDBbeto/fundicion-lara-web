import { DeliveryStatus, OrderTransaction, Product } from 'types/api';

export const getProductByOrderTransaction = (
  orderTransaction: OrderTransaction | null,
) => {
  if (orderTransaction && 'purchasePrice' in orderTransaction) {
    return {
      productId: orderTransaction.productId,
      name: (orderTransaction as any).productName || '',
      purchasePrice: (orderTransaction as any).purchasePrice || 0,
      sellingPrice: (orderTransaction as any).sellingPrice || 0,
      client: orderTransaction.client,
      avatar: (orderTransaction as any).productImageUrl,
    } as Product;
  }
  return null;
};

export const getInitialValues = () => {
  return {
    orderTransactionId: null,
    client: '',
    invoiceNumber: '',
    methodPayment: null,
    paymentStatus: null,
    deliveryStatus: DeliveryStatus.PENDING,
    description: '',
    // operationDate: new Date() as any,
    registerInSales: false,
  } as any;
};
