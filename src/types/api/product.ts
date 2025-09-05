export interface Product {
  productId: number;
  name: string;
  description?: string | null;
  unidad: string;
  stock: number;
  purchasePrice: number;
  sellingPrice: number;
  avatar?: string | null;
}
