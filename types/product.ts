// export type Producto = {
//   id: string;
//   nombre: string;
//   categoria: string;
//   descripcion?: string;
//   proveedor?: string; // Usamos proveedor en lugar de marca
//   unidad?: string;
//   precios?: {
//     unidad: number;
//     masDe2?: number;
//     masDe10?: number;
//   };
//   imagen?: string;
//   stock?: "alto" | "medio" | "bajo" | "consultar";
//   destacado?: boolean;
//   tags?: string[];
//   nichos?: string[];
//   [key: string]: unknown;
// };

// types/product.ts
export type Producto = {
  id: string;
  nombre: string;
  categoria: string;
  proveedor?: string; // Ahora usamos proveedor en lugar de marca
  unidad?: string;
  descripcion?: string;
  imagen?: string;
  stock?: "alto" | "medio" | "bajo" | "consultar";
  destacado?: boolean;
  tags?: string[];
  // Nuevo objeto de precios estructurado
  precios?: {
    unidad: number;
    masDe2?: number;
    masDe10?: number;
  };
  [key: string]: unknown;
};