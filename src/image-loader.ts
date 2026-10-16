import type { ImageLoaderProps } from "next/image";

// Сайт собирается как статический (output: "export"), поэтому серверной оптимизации картинок нет:
// файлы из public/photos отдаются как есть, параметр ?w только отличает размеры для браузерного кэша.
// basePath нужен на GitHub Pages: с кастомным загрузчиком Next не добавляет его сам.
// shortcut: свои фото не ужимаются автоматически — перед загрузкой сохраните их ~1600px в WebP/JPEG.
export default function imageLoader({ src, width }: ImageLoaderProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${basePath}${src}?w=${width}`;
}
