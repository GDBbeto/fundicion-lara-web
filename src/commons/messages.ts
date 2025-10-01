export const validationMessages = {
  required: 'El campo es obligatorio',
  minZero: 'Debe ser mayor o igual a 0',
  numberType: 'Debe ser un n\u00FAmero',
  invalidDate: 'Fecha inv\u00E1lida',
  startDateAfterEndDate: 'La fecha inicial no puede ser mayor que la final',
  endDateBeforeStartDate: 'La fecha final no puede ser menor que la inicial',
  positive: '',
  dateType: '',
};

export const ERROR_MESSAGES = {
  NETWORK: 'No se pudo conectar con el servidor.',
  UNKNOWN: 'Ocurri\u00F3 un error inesperado. Intenta nuevamente.',
  GENERIC: 'Error desconocido.',
  DEFAULT: 'Ocurri\u00F3 un error inesperado.',
  CREATE: 'Ocurri\u00F3 un error al guardar.',
  UPDATE: 'Ocurri\u00F3 un error al actualizar.',
  DELETE: 'Ocurri\u00F3 un error al eliminar.',
  UPLOAD: 'Ocurri\u00F3 un error al subir.',
  UPLOAD_IMAGE: 'Error al subir la imagen.',
  UPLOAD_IMAGE_MAX_SIZE:
    'El archivo excede el tamaño máximo permitido (100 KB).',
  DISPLAY:
    'Ups... no pudimos mostrar la información. Por favor, inténtalo de nuevo más tarde.',
};

export const SUCCESS_MESSAGES = {
  CREATED: 'Se guard\u00F3 correctamente.',
  UPDATED: 'Se actualiz\u00F3 correctamente.',
  DELETED: 'Se elimin\u00F3 correctamente.',
  IMAGE_UPLOADED: 'Imagen subida correctamente.',
};
