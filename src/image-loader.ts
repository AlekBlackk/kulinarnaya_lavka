import type { ImageLoaderProps } from "next/image";

// Сайт собирается как статический (output: "export"), поэтому серверной оптимизации картинок нет.
// Фото с Unsplash ресайзит сам Unsplash по параметрам URL; свои файлы из public отдаются как есть.
// shortcut: свои фото не ужимаются автоматически — перед загрузкой сохраните их ~1600px в WebP/JPEG.
export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 70));
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    return url.toString();
  }
  return `${src}?w=${width}`;
}
