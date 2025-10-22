import * as yup from 'yup';

import { validationMessages } from 'commons/messages';

const schema = yup.object().shape({
  role: yup.string().required(validationMessages.required),
});

export default schema;
