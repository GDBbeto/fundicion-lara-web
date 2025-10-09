import * as yup from 'yup';
import { validationMessages as msg } from 'commons/messages';

const schema = yup.object().shape({
  productId: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === '' ? undefined : value,
    )
    .typeError(msg.numberType)
    .required(msg.required),

  client: yup.string().required(msg.required),

  itemCount: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === '' ? undefined : value,
    )
    .typeError(msg.numberType)
    .min(1, 'Debe ser mayor a 0')
    .required(msg.required),

  invoiceNumber: yup.string().required(msg.required),

  methodPayment: yup.string().nullable().required(msg.required),

  amountPaid: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === '' ? undefined : value,
    )
    .typeError(msg.numberType)
    .min(0, msg.minZero)
    .required(msg.required),

  extraAmount: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === '' ? undefined : value,
    )
    .typeError(msg.numberType)
    .min(0, msg.minZero)
    .default(0),

  paymentStatus: yup.string().nullable().required(msg.required),

  deliveryStatus: yup.string().nullable().required(msg.required),

  operationDate: yup.string().required(msg.required),

  addTransaction: yup.boolean().default(false),

  description: yup.string().notRequired(),
  orderTransactionId: yup.number().nullable().notRequired(),
});

export default schema;
