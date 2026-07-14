  import type { Producto } from "@/types/product";

export type NichoSlug =
  | "veterinaria"
  | "petshop"
  | "granja"
  | "ferreteria"
  | "almacen"
  | "forrajeria";

export type NichoOption = {
  slug: NichoSlug;
  label: string;
  aliases: string[];
  tags: string[];
};

export const NICHOS: NichoOption[] = [
  {
    slug: "veterinaria",
    label: "Veterinarias",
    aliases: ["veterinaria", "veterinarias"],
    tags: ["veterinaria", "pipeta", "farmacia", "salud", "medicamento"], // Añadimos tags de farmacia
  },
  {
    slug: "petshop",
    label: "Pet Shops",
    aliases: ["petshop", "pet shop", "pet shops", "mascotas", "pet"],
    tags: ["petshop", "mascotas", "perros", "gatos", "estetica", "shampoo", "accesorios"],
  },
  {
    slug: "granja",
    label: "Granja",
    aliases: ["granja", "granja rural", "campo"],
    tags: ["granja", "aves", "cerdos", "bovinos", "equinos", "balanceado"],
  },
  {
    slug: "ferreteria",
    label: "Ferreteria",
    aliases: ["ferreteria", "ferreteria rural"],
    tags: ["ferreteria", "veneno", "insecticida", "ratas", "alambre"], // Aquí incluimos lo que te dijo tu amigo
  },
  {
    "slug": "almacen",
    "label": "Almacen",
    "aliases": ["almacen", "despensa", "kiosco"],
    "tags": ["almacen", "consumohumano", "cereales", "frutossecos", "legumbres", "semillas"],
  },
  {
    "slug": "forrajeria",
    "label": "Forrajeria",
    "aliases": ["forrajeria", "forraje", "forrajerias"],
    "tags": ["forrajeria", "campo", "forrajes", "maiz", "avena"],
  }
];

const NICHOS_SOPORTADOS: NichoOption[] = [
  ...NICHOS,
  {
    slug: "forrajeria",
    label: "Forrajeria",
    aliases: ["forrajeria", "forraje", "forrajerias"],
    tags: ["forrajeria"],
  },
];

const nicheLookup = new Map(NICHOS_SOPORTADOS.map((nicho) => [nicho.slug, nicho]));

function normalizeText(value: string) {
  return value
    .toLocaleLowerCase("es-AR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function getNichoBySlug(slug?: string | null) {
  if (!slug) {
    return undefined;
  }

  return nicheLookup.get(slug as NichoSlug);
}

export function getNichoLabel(slug?: string | null) {
  return getNichoBySlug(slug)?.label;
}

export function parseNichoSlug(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const normalized = normalizeText(value);
  return nicheLookup.has(normalized as NichoSlug)
    ? (normalized as NichoSlug)
    : null;
}

function getProductKeywords(producto: Producto) {
  const rawValues: string[] = [];

  if (Array.isArray(producto.tags)) {
    rawValues.push(
      ...producto.tags.filter((tag): tag is string => typeof tag === "string"),
    );
  }

  if (Array.isArray(producto.nichos)) {
    rawValues.push(
      ...producto.nichos.filter((nicho): nicho is string => typeof nicho === "string"),
    );
  }

  return rawValues.filter((value): value is string => Boolean(value)).map(normalizeText);
}

export function matchesNicho(producto: Producto, nichoSlug?: NichoSlug | null) {
  if (!nichoSlug) {
    return true;
  }

  const nicho = nicheLookup.get(nichoSlug);
  if (!nicho) {
    return true;
  }

  const keywords = getProductKeywords(producto);
  const allowedTags = [nicho.slug, ...nicho.tags].map(normalizeText);

  return keywords.some((keyword) => allowedTags.includes(keyword));
}

export function getNichoWhatsAppMessage(nichoSlug?: NichoSlug | null) {
  const label = getNichoLabel(nichoSlug);

  if (!label) {
    return "Hola, estoy viendo el catalogo y necesito consultar stock.";
  }

  return `Hola, estoy viendo el catalogo de ${label} y necesito consultar stock.`;
}
