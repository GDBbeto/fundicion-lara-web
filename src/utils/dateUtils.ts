// src/utils/dateUtils.ts
import { format, isValid } from 'date-fns';

/**
 * Formatea una fecha al formato 'yyyy-MM-dd'.
 * Si la fecha no es válida, devuelve una cadena vacía.
 *
 * @param date - Fecha a formatear
 * @returns Fecha formateada como string (ej. "2025-09-01")
 */
export function formatDateToDefault(date: Date): string {
  if (!date || !isValid(date)) return '';
  return format(date, 'yyyy-MM-dd');
}
