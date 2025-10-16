import * as yup from 'yup';
import { validationMessages as msg } from 'commons/messages';

const schema = yup.object().shape({
  client: yup.string().notRequired(),

  itemCount: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === '' ? undefined : value,
    )
    .typeError(msg.numberType)
    .min(1, 'Debe ser mayor a 0')
    .required(msg.required),

  invoiceNumber: yup.string().notRequired(),

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

  paymentStatus: yup.string().nullable().notRequired(),

  deliveryStatus: yup.string().nullable().notRequired(),

  operationDate: yup.string().required(msg.required),

  registerInSales: yup.boolean().default(false).notRequired(),

  description: yup.string().notRequired(),
  orderTransactionId: yup.number().nullable().notRequired(),
});

export default schema;
