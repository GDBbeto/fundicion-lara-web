import * as yup from 'yup';

import { validationMessages } from 'commons/messages';

const schema = yup.object().shape({
  name: yup.string().required(validationMessages.required),
  lastName: yup.string().required(validationMessages.required),
  motherLastName: yup.string().required(validationMessages.required),
  email: yup
    .string()
    .email('Ingresa un correo electrónico válido')
    .required(validationMessages.required),
  password: yup
    .string()
    .required(validationMessages.required)
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'La contraseña debe contener al menos una mayúscula, una minúscula y un número',
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required(validationMessages.required),
});

export default schema;
