import * as yup from 'yup';
import { validationMessages as msg } from 'commons/messages';

const schema = yup.object().shape({
  amount: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === '' ? undefined : value,
    )
    .typeError(msg.numberType)
    .positive(msg.positive)
    .required(msg.required),

  description: yup.string().notRequired().default(''),

  invoiceNumber: yup.string().notRequired().default(''),

  issuerRfc: yup.string().notRequired().default(''),

  operationDate: yup.date().typeError(msg.dateType).required(msg.required),
});

export default schema;
