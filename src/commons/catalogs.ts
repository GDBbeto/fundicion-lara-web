import { DeliveryStatus, MethodPayment, PaymentStatus, Role } from 'types/api';

export const CAT_UNITS = [
  { label: 'Piezas', value: 'Pzas' },
  { label: 'Kilos', value: 'Kg' },
  { label: 'Litro', value: 'L' },
];

export const CAT_METHOD_PAYMENT = [
  { label: 'Tarjeta de crédito', value: MethodPayment.CREDIT_CARD },
  { label: 'Tarjeta de débito', value: MethodPayment.DEBIT_CARD },
  { label: 'PayPal', value: MethodPayment.PAYPAL },
  { label: 'Transferencia', value: MethodPayment.BANK_TRANSFER },
  { label: 'Efectivo', value: MethodPayment.CASH },
];

export const CAT_PAYMENT_STATUS = [
  { label: 'Pagado', value: PaymentStatus.PAID },
  { label: 'Pendiente', value: PaymentStatus.PENDING },
  { label: 'Incompleto', value: PaymentStatus.INCOMPLETE },
];

export const CAT_DELIVERY_STATUS = [
  { label: 'Pendiente', value: DeliveryStatus.PENDING },
  { label: 'En tránsito', value: DeliveryStatus.IN_TRANSIT },
  { label: 'Entregado', value: DeliveryStatus.DELIVERED },
  { label: 'Cancelado', value: DeliveryStatus.CANCELLED },
  { label: 'En espera', value: DeliveryStatus.ON_HOLD },
];

export const CAT_USER_ROLES = [
  { label: 'Administrador', value: Role.ADMIN },
  { label: 'Operador', value: Role.OPERATOR },
  { label: 'Solo consulta', value: Role.VIEWER },
  { label: 'Pendiente', value: Role.PENDING },
];
