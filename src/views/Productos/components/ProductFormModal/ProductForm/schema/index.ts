// src/validations/productSchema.ts

import * as yup from 'yup';
import { validationMessages as msg } from 'commons/messages';

const schema = yup.object().shape({
  name: yup.string().required(msg.required),
  unidad: yup.string().required(msg.required),

  stock: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === '' ? undefined : value,
    )
    .typeError(msg.numberType)
    .min(0, msg.minZero)
    .required(msg.required),

  purchasePrice: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === '' ? undefined : value,
    )
    .typeError(msg.numberType)
    .min(0, msg.minZero)
    .required(msg.required),

  sellingPrice: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === '' ? undefined : value,
    )
    .typeError(msg.numberType)
    .min(0, msg.minZero)
    .required(msg.required),

  description: yup.string().notRequired(),
  productId: yup.string().notRequired(),
  avatar: yup.string().notRequired(),
});

export default schema;
