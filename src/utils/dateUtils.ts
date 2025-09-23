import { parse, format, isValid } from 'date-fns';

/**
 * Formatea una fecha al formato 'yyyy-MM-dd'.
 * Si la fecha no es valida, devuelve una cadena vacia.
 *
 * @param date - Fecha a formatear
 * @returns Fecha formateada como string (ej. "2025-09-01")
 */
export function formatDateToDefault(date: Date, f = 'yyyy-MM-dd'): string {
  if (!date || !isValid(date)) return '';
  return format(date, f);
}

/**
 * Convierte un string con formato 'yyyy-MM-dd' a un objeto Date.
 * Si la cadena no es valida, devuelve la fecha actual.
 */
export function parseDefaultToDate(dateStr: string): Date {
  if (!dateStr) return new Date();
  const parsedDate = parse(dateStr, 'yyyy-MM-dd', new Date());
  return isValid(parsedDate) ? parsedDate : new Date();
}

/**
 * Formatea una fecha al formato 'dd-MM-yyyy' para mostrar en la UI.
 * Si la fecha no es valida, devuelve una cadena vacia.
 *
 * @param dateStr - Fecha en formato string 'yyyy-MM-dd' o Date
 * @returns Fecha formateada como string (ej. "01-09-2025")
 */
export function formatDateToDisplay(dateStr: string | Date): string {
  if (!dateStr) return '';

  let date: Date;
  if (typeof dateStr === 'string') {
    // Si es string, parsearlo desde formato 'yyyy-MM-dd'
    date = parse(dateStr, 'yyyy-MM-dd', new Date());
  } else {
    date = dateStr;
  }

  if (!isValid(date)) return '';
  return format(date, 'dd-MM-yyyy');
}
