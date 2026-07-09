"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, PackageCheck, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Producto } from "@/types/product";
import { matchesNicho, type NichoSlug } from "./catalog-nichos";

type CatalogGridProps = {
  productos: Producto[];
  onConsultar: (producto: Producto) => void;
  nicho?: NichoSlug | null;
};

const stockLabel: Record<NonNullable<Producto["stock"]>, string> = {
  alto: "Stock alto",
  medio: "Stock medio",
  bajo: "Stock bajo",
  consultar: "Consultar",
};

export function CatalogGrid({
  productos,
  onConsultar,
  nicho = null,
}: CatalogGridProps) {
  const productosVisibles = productos.filter((producto) =>
    matchesNicho(producto, nicho),
  );

  return (
    <motion.section
      layout
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
      aria-live="polite"
    >
      <AnimatePresence mode="popLayout">
        {productosVisibles.map((producto) => (
          <motion.article
            key={producto.id}
            layout
            layoutId={`producto-${producto.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <Card className="h-full overflow-hidden border-zinc-200 bg-white shadow-industrial">
              {producto.imagen ? (
                <div className="relative aspect-[4/3] bg-muted">
                  <Image
                    src={producto.imagen}
                    alt={producto.nombre}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center bg-zinc-950 text-primary">
                  <PackageCheck className="h-12 w-12" aria-hidden="true" />
                </div>
              )}

              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2">
                    <Badge variant="muted">{producto.categoria}</Badge>
                    <CardTitle>{producto.nombre}</CardTitle>
                  </div>
                  {producto.destacado ? (
                    <Badge className="shrink-0" aria-label="Producto destacado">
                      <Star className="h-3.5 w-3.5" aria-hidden="true" />
                    </Badge>
                  ) : null}
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {producto.descripcion ? (
                  <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {producto.descripcion}
                  </p>
                ) : null}

                <div className="flex flex-wrap gap-2 text-xs">
                  {producto.marca ? (
                    <Badge variant="outline">{producto.marca}</Badge>
                  ) : null}
                  {producto.unidad ? (
                    <Badge variant="outline">{producto.unidad}</Badge>
                  ) : null}
                  {producto.stock ? (
                    <Badge variant="secondary">{stockLabel[producto.stock]}</Badge>
                  ) : null}
                  {producto.escalaPrecio ? (
                    <Badge variant="outline">{producto.escalaPrecio}</Badge>
                  ) : null}
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  type="button"
                  onClick={() => onConsultar(producto)}
                  aria-label={`Consultar stock de ${producto.nombre} por WhatsApp`}
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Consultar stock
                </Button>
              </CardFooter>
            </Card>
          </motion.article>
        ))}
      </AnimatePresence>
    </motion.section>
  );
}
