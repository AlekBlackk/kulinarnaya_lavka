"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { BowlIcon } from "./icons";

type Props = Omit<ImageProps, "src" | "fill"> & { src?: string };

// Фото блюда, заполняющее родителя (родитель задаёт размер и position: relative).
// Если файла нет или он не загрузился — тёплая заглушка вместо «битой» картинки.
export function FoodImage({ src, alt, className = "", ...props }: Props) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-cream text-terracotta-soft"
      >
        <BowlIcon width={44} height={44} strokeWidth={1.4} />
        <span className="font-hand text-xl text-muted">фото скоро будет</span>
      </div>
    );
  }

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      fill
      className={`object-cover ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
