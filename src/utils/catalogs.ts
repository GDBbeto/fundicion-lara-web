import Option from 'types/option';
import { DeliveryStatus, MethodPayment, PaymentStatus } from 'types/api';
import {
  CAT_DELIVERY_STATUS,
  CAT_METHOD_PAYMENT,
  CAT_PAYMENT_STATUS,
} from 'commons/catalogs';

export const getPaymentStatusOption = (
  status: PaymentStatus,
): Option | null => {
  const paymentStatus = CAT_PAYMENT_STATUS.find((cat) => cat.value === status);

  return paymentStatus || null;
};

export const getPaymentStatusColor = (status: PaymentStatus) => {
  switch (status) {
    case 'PAID':
      return 'success';
    case 'PENDING':
      return 'warning';
    case 'INCOMPLETE':
      return 'error';
    default:
      return 'default';
  }
};

export const getDeliveryStatusOption = (
  status: DeliveryStatus,
): Option | null => {
  const deliveryStatus = CAT_DELIVERY_STATUS.find(
    (cat) => cat.value === status,
  );

  return deliveryStatus || null;
};

export const getDeliveryStatusColor = (status: DeliveryStatus) => {
  switch (status) {
    case 'DELIVERED':
      return 'success';
    case 'IN_TRANSIT':
      return 'info';
    case 'PENDING':
      return 'warning';
    case 'ON_HOLD':
      return 'secondary';
    case 'CANCELLED':
      return 'error';
    default:
      return 'default';
  }
};

export const getMethodPaymentOption = (
  method: MethodPayment,
): Option | null => {
  const methodPayment = CAT_METHOD_PAYMENT.find((cat) => cat.value === method);

  return methodPayment || null;
};
