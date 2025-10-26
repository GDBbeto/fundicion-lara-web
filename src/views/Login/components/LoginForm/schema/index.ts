import * as yup from 'yup';

import { validationMessages } from 'commons/messages';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Ingresa un correo electrónico válido')
    .required(validationMessages.required),
  password: yup.string().required(validationMessages.required),
});

export default schema;
