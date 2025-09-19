import { ReactNode } from 'react';

export interface Column<T> {
  label: string;
  apiField: keyof T;
  sort?: boolean;
  rowSpan?: number;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  render?: (row: T) => ReactNode;
  hiddenOnMobile?: boolean;
}
