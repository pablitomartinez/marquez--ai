import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

// app/layout.tsx

export const metadata = {
  title: 'Marquez & Cía | Catálogo Mayorista',
  description: 'Distribución mayorista en San Salvador de Jujuy: Alimentos, forrajes y accesorios. Contacto: Pablo - 388 454 1922.',
  openGraph: {
    title: 'Marquez & Cía | Catálogo Mayorista',
    description: 'Acceso directo a stock actualizado y precios mayoristas en Jujuy.',
    url: 'https://tu-sitio-en-vercel.app', // <-- Reemplaza con tu URL real
    siteName: 'Marquez & Cía',
    images: [
      {
        url: '/qr-foto.jpeg', // <-- Debes tener esta imagen en la carpeta 'public'
        width: 1200,
        height: 630,
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marquez & Cía | Catálogo Mayorista',
    description: 'Distribución mayorista en San Salvador de Jujuy.',
  },
};

export const viewport: Viewport = {
  themeColor: "#facc15",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR">
      <body className={GeistSans.variable}>{children}</body>
    </html>
  );
}
