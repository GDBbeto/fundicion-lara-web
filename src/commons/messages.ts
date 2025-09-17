export const validationMessages = {
  required: 'El campo es obligatorio',
  minZero: 'Debe ser mayor o igual a 0',
  numberType: 'Debe ser un número',
  invalidDate: 'Fecha inválida',
  startDateAfterEndDate: 'La fecha inicial no puede ser mayor que la final',
  endDateBeforeStartDate: 'La fecha final no puede ser menor que la inicial',
};

export const ERROR_MESSAGES = {
  NETWORK:
    'No se pudo conectar con el servidor. Verifica tu conexión a Internet.',
  UNKNOWN: 'Ocurrió un error inesperado. Intenta nuevamente.',
  GENERIC: 'Error desconocido.',
  DEFAULT: 'Ocurrió un error inesperado.',
  CREATE: 'Ocurrió un error al guardar.',
  UPDATE: 'Ocurrió un error al actualizar.',
  DELETE: 'Ocurrió un error al eliminar.',
  UPLOAD: 'Ocurrió un error al subir.',
  UPLOAD_IMAGE: 'Error al subir la imagen.',
};

export const SUCCESS_MESSAGES = {
  CREATED: 'Se guardó correctamente.',
  UPDATED: 'Se actualizó correctamente.',
  DELETED: 'Se eliminó correctamente.',
  IMAGE_UPLOADED: 'Imagen subida correctamente.',
};
