"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { galleryPhotos } from "@/data/gallery";
import { FoodImage } from "./FoodImage";
import { ChevronIcon, CloseIcon, ExternalIcon } from "./icons";

export function Gallery() {
  const [current, setCurrent] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Нативный <dialog>: фокус, Esc и блокировка фона работают из коробки.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (current !== null && dialog && !dialog.open) dialog.showModal();
  }, [current]);

  const step = (delta: number) =>
    setCurrent((i) => (i === null ? i : (i + delta + galleryPhotos.length) % galleryPhotos.length));

  const photo = current === null ? null : galleryPhotos[current];

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="scroll-mt-16 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-hand text-2xl text-terracotta">загляните на раздачу</p>
            <h2 id="gallery-title" className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Фотогалерея
            </h2>
          </div>
          <p className="max-w-md text-muted">
            Фото блюд — иллюстрации того, что обычно бывает на обед. Нажмите на снимок, чтобы рассмотреть.
          </p>
        </div>

        <ul className="mt-10 grid grid-flow-dense grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {galleryPhotos.map((item, index) => (
            <li key={item.src} className={`reveal ${item.wide ? "col-span-2" : ""}`}>
              <button
                type="button"
                onClick={() => setCurrent(index)}
                className="group relative block aspect-square w-full overflow-hidden rounded-2xl bg-cream sm:rounded-3xl data-[wide=true]:aspect-[2/1] lg:data-[wide=true]:aspect-auto lg:data-[wide=true]:h-full"
                data-wide={item.wide ?? false}
                aria-label={`Открыть фото: ${item.alt}`}
              >
                <FoodImage
                  src={item.src}
                  alt={item.alt}
                  sizes={item.wide ? "(min-width: 1024px) 720px, 100vw" : "(min-width: 1024px) 360px, 50vw"}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-coffee/75 to-transparent p-3 pt-10 text-left text-sm font-semibold text-milk sm:p-4 sm:pt-12">
                  {item.group}
                </span>
              </button>
            </li>
          ))}

          <li className="reveal col-span-2">
            <a
              href={site.links.yandexPhotos}
              target="_blank"
              rel="noopener"
              className="group flex h-full min-h-48 flex-col justify-between gap-6 rounded-2xl border-2 border-dashed border-line bg-cream/60 p-6 transition hover:border-terracotta-soft hover:bg-cream sm:rounded-3xl sm:p-8"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-olive">Интерьер кафе</p>
                <p className="mt-2 max-w-md font-display text-2xl font-semibold leading-snug">
                  Как выглядит зал и вход — в настоящих фото гостей на Яндекс Картах
                </p>
              </div>
              <span className="inline-flex items-center gap-2 font-semibold text-terracotta">
                Смотреть фото кафе
                <ExternalIcon width={18} height={18} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          </li>
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setCurrent(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        aria-label="Просмотр фото"
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:backdrop-blur-sm"
      >
        {photo && (
          // Клик по тёмному фону вокруг фото закрывает просмотр.
          <figure
            onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
            className="relative flex h-[100dvh] w-screen flex-col items-center justify-center gap-3 p-4 sm:p-10">
            <div className="relative h-full max-h-[78dvh] w-full max-w-5xl">
              <FoodImage
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                sizes="100vw"
                loading="eager"
                style={{ objectFit: "contain" }}
              />
            </div>
            <figcaption className="text-center text-milk">
              <span className="font-semibold">{photo.alt}</span>
              {photo.illustrative && <span className="block text-sm text-milk/70">Иллюстративное фото</span>}
            </figcaption>

            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Закрыть"
              className="absolute right-3 top-3 flex size-12 items-center justify-center rounded-full bg-milk text-coffee transition hover:bg-cream"
            >
              <CloseIcon />
            </button>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Предыдущее фото"
              className="absolute left-3 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-milk/90 text-coffee transition hover:bg-milk"
            >
              <ChevronIcon className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Следующее фото"
              className="absolute right-3 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-milk/90 text-coffee transition hover:bg-milk"
            >
              <ChevronIcon />
            </button>
          </figure>
        )}
      </dialog>
    </section>
  );
}
