import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marquez & Cia | Catalogo Dinamico",
  description: "Catalogo digital mobile-first para preventa de Marquez & Cia.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Marquez Catalogo",
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
