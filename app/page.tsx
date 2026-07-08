import { CatalogPage } from "@/components/features/catalog/CatalogPage";
import productos from "@/data/productos.json";
import type { Producto } from "@/types/product";

export default function Home() {
  return <CatalogPage productos={productos as Producto[]} />;
}
