import * as yup from 'yup';

import { validationMessages } from 'commons/messages';

const schema = yup.object().shape({
  name: yup.string().required(validationMessages.required),
  lastName: yup.string().required(validationMessages.required),
  motherLastName: yup.string().required(validationMessages.required),
});

export default schema;
