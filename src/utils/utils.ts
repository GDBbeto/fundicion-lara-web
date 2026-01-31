import type { User } from 'types/api';

export const getInitials = (user: User) => {
  const firstInitial = user.name.charAt(0).toUpperCase();
  const lastInitial = user.lastName.charAt(0).toUpperCase();
  return `${firstInitial}${lastInitial}`;
};

interface DownloadFileParams {
  data: ArrayBuffer | Blob;
  headers?: any; // Acepta headers de axios o cualquier objeto
  defaultFileName?: string;
  mimeType?: string;
}

/**
 * Descarga un archivo desde un blob o arraybuffer
 * @param params - Parámetros de descarga
 * @param params.data - Datos del archivo (ArrayBuffer o Blob)
 * @param params.headers - Headers de la respuesta HTTP (opcional, acepta headers de axios)
 * @param params.defaultFileName - Nombre por defecto si no se encuentra en headers (opcional)
 * @param params.mimeType - Tipo MIME del archivo (por defecto: application/octet-stream)
 */
export const downloadFile = ({
  data,
  headers,
  defaultFileName,
  mimeType = 'application/octet-stream',
}: DownloadFileParams): void => {
  // Convertir headers de axios a objeto simple si es necesario
  const headersObj: Record<string, string> = {};
  if (headers) {
    if (typeof headers === 'object') {
      Object.keys(headers).forEach((key) => {
        const value = headers[key];
        if (value !== null && value !== undefined) {
          headersObj[key] = typeof value === 'string' ? value : String(value);
        }
      });
    }
  }

  // Obtener el nombre del archivo del header
  let fileName = defaultFileName;

  if (Object.keys(headersObj).length > 0) {
    const getHeaderValue = (key: string): string | undefined => {
      const value = headersObj[key] || headersObj[key.toLowerCase()];
      return typeof value === 'string' ? value : undefined;
    };

    fileName = getHeaderValue('file_name') || defaultFileName;
  }

  // Si no hay nombre, usar fallback genérico
  if (!fileName) {
    fileName = `download_${new Date().getTime()}`;
  }

  // Crear blob desde el arraybuffer o usar el blob directamente
  const blob =
    data instanceof Blob ? data : new Blob([data], { type: mimeType });

  // Crear URL del blob y descargar
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
