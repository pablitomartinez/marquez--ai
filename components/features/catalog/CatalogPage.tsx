"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MessageCircle, Search, X } from "lucide-react";
import { CategoryBanner } from "@/components/features/catalog/CategoryBanner";
import { CatalogGrid } from "@/components/features/catalog/CatalogGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getNichoWhatsAppMessage,
  matchesNicho,
  parseNichoSlug,
  type NichoSlug,
} from "./catalog-nichos";
import type { Producto } from "@/types/product";

type CatalogPageProps = {
  productos: Producto[];
};

const whatsappNumber = "";

function buildWhatsAppUrl(text: string) {
  const baseUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}`
    : "https://wa.me/";

  return `${baseUrl}?text=${encodeURIComponent(text)}`;
}

function buildProductWhatsAppMessage(producto?: Producto) {
  return producto
    ? `Hola, vi el catalogo digital y necesito consultar por: ${producto.nombre}`
    : "Hola, vi el catalogo digital y necesito hacer una consulta.";
}

export function CatalogPage({ productos }: CatalogPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();
  const [query, setQuery] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState<
    Producto | undefined
  >();

  const nichoActivo = useMemo(
    () => parseNichoSlug(new URLSearchParams(searchParamsString).get("nicho")),
    [searchParamsString],
  );

  const productosBuscados = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("es-AR");

    return productos.filter((producto) => {
      // ACTUALIZADO: Buscamos por proveedor en vez de marca y sacamos escalaPrecio
      const searchableText = [
        producto.nombre,
        producto.categoria,
        producto.descripcion,
        producto.proveedor,
        producto.unidad,
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("es-AR");

      return searchableText.includes(normalizedQuery);
    });
  }, [productos, query]);

  const productosFiltrados = useMemo(
    () =>
      productosBuscados.filter((producto) => matchesNicho(producto, nichoActivo)),
    [nichoActivo, productosBuscados],
  );

  const handleNichoChange = (nextNicho: NichoSlug | null) => {
    const nextParams = new URLSearchParams(searchParamsString);

    if (nextNicho) {
      nextParams.set("nicho", nextNicho);
    } else {
      nextParams.delete("nicho");
    }

    const nextQuery = nextParams.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
      scroll: false,
    });
  };

  const whatsappUrl = buildWhatsAppUrl(getNichoWhatsAppMessage(nichoActivo));

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
              placeholder="Buscar producto, proveedor o rubro"
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

          <CategoryBanner
            activeNicho={nichoActivo}
            onChange={handleNichoChange}
          />
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
          productos={productosBuscados}
          nicho={nichoActivo}
          onConsultar={(producto) => {
            setProductoSeleccionado(producto);
            window.open(
              buildWhatsAppUrl(buildProductWhatsAppMessage(producto)),
              "_blank",
              "noreferrer",
            );
          }}
        />

        {productosFiltrados.length === 0 ? (
          <div className="mt-12 rounded-lg border border-dashed bg-white p-8 text-center">
            <p className="font-semibold">No hay productos para este filtro.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Proba con otro nicho o ajusta la busqueda.
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