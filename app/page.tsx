import { CatalogPage } from "@/components/features/catalog/CatalogPage";
import productos from "@/data/productos.json";
import type { Producto } from "@/types/product";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <CatalogPage productos={productos as Producto[]} />
    </Suspense>
  );
}