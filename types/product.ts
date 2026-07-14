export type Producto = {
  id: string;
  nombre: string;
  categoria: string;
  descripcion?: string;
  proveedor?: string; // Usamos proveedor en lugar de marca
  unidad?: string;
  precios?: {
    unidad: number;
    masDe2?: number;
    masDe10?: number;
  };
  imagen?: string;
  stock?: "alto" | "medio" | "bajo" | "consultar";
  destacado?: boolean;
  tags?: string[];
  nichos?: string[];
  [key: string]: unknown;
};