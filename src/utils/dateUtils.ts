import { parse, format, isValid } from 'date-fns';

/**
 * Formatea una fecha al formato 'yyyy-MM-dd'.
 * Si la fecha no es valida, devuelve una cadena vacia.
 *
 * @param date - Fecha a formatear
 * @returns Fecha formateada como string (ej. "2025-09-01")
 */
export function formatDateToDefault(date: Date): string {
  if (!date || !isValid(date)) return '';
  return format(date, 'yyyy-MM-dd');
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
