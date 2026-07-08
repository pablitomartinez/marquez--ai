"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Search, X } from "lucide-react";
import { CatalogGrid } from "@/components/features/catalog/CatalogGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Producto } from "@/types/product";

type CatalogPageProps = {
  productos: Producto[];
};

const whatsappNumber = "";

function buildWhatsAppUrl(producto?: Producto) {
  const text = producto
    ? `Hola, vi el catalogo digital y necesito consultar por: ${producto.nombre}`
    : "Hola, vi el catalogo digital y necesito hacer una consulta.";
  const baseUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}`
    : "https://wa.me/";

  return `${baseUrl}?text=${encodeURIComponent(text)}`;
}

export function CatalogPage({ productos }: CatalogPageProps) {
  const [query, setQuery] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [productoSeleccionado, setProductoSeleccionado] = useState<
    Producto | undefined
  >();

  const categorias = useMemo(() => {
    const unique = new Set(productos.map((producto) => producto.categoria));
    return ["Todos", ...Array.from(unique).sort((a, b) => a.localeCompare(b))];
  }, [productos]);

  const productosFiltrados = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("es-AR");

    return productos.filter((producto) => {
      const matchesCategoria =
        categoriaActiva === "Todos" || producto.categoria === categoriaActiva;
      const searchableText = [
        producto.nombre,
        producto.categoria,
        producto.descripcion,
        producto.marca,
        producto.unidad,
        producto.escalaPrecio,
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("es-AR");

      return matchesCategoria && searchableText.includes(normalizedQuery);
    });
  }, [categoriaActiva, productos, query]);

  const whatsappUrl = buildWhatsAppUrl(productoSeleccionado);

  return (
    <main className="min-h-screen pb-28">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Marquez & Cia
              </p>
              <h1 className="text-xl font-black text-zinc-950">
                Catalogo dinamico de ventas
              </h1>
            </div>
            <Button asChild size="sm" variant="secondary">
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </a>
            </Button>
          </div>

          <label className="relative block" htmlFor="catalog-search">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="catalog-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar producto, marca o rubro"
              className="pl-9 pr-10"
              type="search"
            />
            {query ? (
              <button
                className="absolute right-2 top-1/2 rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                type="button"
                onClick={() => setQuery("")}
                aria-label="Limpiar busqueda"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : null}
          </label>

          <nav
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1"
            aria-label="Categorias de productos"
          >
            {categorias.map((categoria) => {
              const isActive = categoria === categoriaActiva;

              return (
                <button
                  key={categoria}
                  type="button"
                  onClick={() => setCategoriaActiva(categoria)}
                  className={cn(
                    "relative shrink-0 rounded-md border px-3 py-2 text-sm font-semibold transition-colors",
                    isActive
                      ? "border-zinc-950 bg-zinc-950 text-primary"
                      : "bg-white text-zinc-700 hover:border-zinc-950",
                  )}
                  aria-pressed={isActive}
                >
                  {categoria}
                  {isActive ? (
                    <motion.span
                      layoutId="categoria-activa"
                      className="absolute inset-x-3 -bottom-1 h-1 rounded-full bg-primary"
                    />
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 py-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-muted-foreground">
            {productosFiltrados.length} productos encontrados
          </p>
          {productoSeleccionado ? (
            <p className="truncate text-right text-xs text-muted-foreground">
              Consulta lista: {productoSeleccionado.nombre}
            </p>
          ) : null}
        </div>

        <CatalogGrid
          productos={productosFiltrados}
          onConsultar={(producto) => {
            setProductoSeleccionado(producto);
            window.open(buildWhatsAppUrl(producto), "_blank", "noreferrer");
          }}
        />

        {productosFiltrados.length === 0 ? (
          <div className="mt-12 rounded-lg border border-dashed bg-white p-8 text-center">
            <p className="font-semibold">No hay productos para este filtro.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Proba con otra categoria o ajusta la busqueda.
            </p>
          </div>
        ) : null}
      </section>

      <Button
        asChild
        className="fixed bottom-5 right-4 z-30 h-12 rounded-full px-5 shadow-lg"
      >
        <a href={whatsappUrl} target="_blank" rel="noreferrer">
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          WhatsApp
        </a>
      </Button>
    </main>
  );
}
