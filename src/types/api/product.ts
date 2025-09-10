export interface Product {
  productId: number;
  name: string;
  client?: string | null;
  description?: string | null;
  unidad: string | null;
  stock: number | null;
  purchasePrice: number | null;
  sellingPrice: number | null;
  avatar?: string | null;
}
