import type { Metadata, Viewport } from "next";
import { Caveat, Lora, Manrope } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin", "cyrillic"],
  weight: ["600"],
});

const title = `${site.name} — домашние обеды в Тамбове`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: site.name,
    title,
    description: site.description,
    images: [
      {
        // shortcut: параметры размера понимает только Unsplash; для своего фото подготовьте файл 1200×630
        url: `${site.heroImage.src}?w=1200&h=630&fit=crop&auto=format&q=75`,
        width: 1200,
        height: 630,
        alt: site.heroImage.alt,
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#fbf6ee",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${lora.variable} ${manrope.variable} ${caveat.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
