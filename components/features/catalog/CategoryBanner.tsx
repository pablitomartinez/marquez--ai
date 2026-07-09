"use client";

import { cn } from "@/lib/utils";
import { NICHOS, type NichoSlug } from "./catalog-nichos";

type CategoryBannerProps = {
  activeNicho: NichoSlug | null;
  onChange: (nicho: NichoSlug | null) => void;
};

export function CategoryBanner({
  activeNicho,
  onChange,
}: CategoryBannerProps) {
  return (
    <section
      className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-white via-white to-zinc-50 p-3 shadow-sm sm:p-4"
      aria-label="Filtrar por nicho"
    >
      <div className="flex items-center justify-between gap-3 pb-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">
            Catalogos por nicho
          </p>
          <h2 className="text-sm font-semibold text-zinc-950 sm:text-base">
            Elige el sector que quieres mostrar
          </h2>
        </div>
        <button
          className={cn(
            "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
            activeNicho === null
              ? "border-zinc-950 bg-zinc-950 text-white"
              : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-950 hover:text-zinc-950",
          )}
          type="button"
          onClick={() => onChange(null)}
          aria-pressed={activeNicho === null}
        >
          Todos
        </button>
      </div>

      <div className="-mx-1 overflow-x-auto px-1">
        <div className="flex gap-2 pb-1">
          {NICHOS.map((nicho) => {
            const isActive = activeNicho === nicho.slug;

            return (
              <button
                key={nicho.slug}
                type="button"
                onClick={() => onChange(nicho.slug)}
                className={cn(
                  "relative shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all",
                  isActive
                    ? "border-zinc-950 bg-zinc-950 text-white shadow-md shadow-zinc-950/10"
                    : "border-zinc-200 bg-white text-zinc-700 hover:-translate-y-0.5 hover:border-zinc-950 hover:text-zinc-950",
                )}
                aria-pressed={isActive}
              >
                {nicho.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
