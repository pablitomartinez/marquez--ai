export type Producto = {
  id: string;
  nombre: string;
  categoria: string;
  descripcion?: string;
  marca?: string;
  unidad?: string;
  precio?: number;
  imagen?: string;
  stock?: "alto" | "medio" | "bajo" | "consultar";
  destacado?: boolean;
  escalaPrecio?: string;
  [key: string]: unknown;
};
