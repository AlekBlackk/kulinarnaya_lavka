"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { galleryPhotos } from "@/data/gallery";
import { FoodImage } from "./FoodImage";
import { ChevronIcon, CloseIcon, ExternalIcon, ZoomIcon } from "./icons";

const ALL = "Все";
// Наклоны полароидов: чередуются, чтобы фото лежали «вразброс», как на столе.
const poses = ["rotate-[-2.5deg]", "rotate-[1.8deg]", "rotate-[-1deg]", "rotate-[2.4deg]", "rotate-[-1.8deg]", "rotate-[1.2deg]"];
const groups = [ALL, ...new Set(galleryPhotos.map((photo) => photo.group))];

export function Gallery() {
  const [filter, setFilter] = useState(ALL);
  const [current, setCurrent] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);
  const visible = filter === ALL ? galleryPhotos : galleryPhotos.filter((photo) => photo.group === filter);

  // Нативный <dialog>: фокус, Esc и блокировка фона работают из коробки.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (current !== null && dialog && !dialog.open) dialog.showModal();
  }, [current]);

  const step = (delta: number) =>
    setCurrent((i) => (i === null ? i : (i + delta + visible.length) % visible.length));

  const photo = current === null ? null : visible[current];

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="scroll-mt-16 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-hand text-2xl text-terracotta">загляните на раздачу</p>
            <h2 id="gallery-title" className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Фото
              <span className="relative inline-block text-terracotta">
                <em className="font-semibold">галерея</em>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 160 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-3.5 left-0 h-2.5 w-full overflow-visible text-terracotta-soft"
                >
                  <path
                    className="scribble scribble-view"
                    pathLength="1"
                    d="M2 7C30 2 58 11 88 6S140 3 158 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
          </div>
        </div>

        <div className="no-scrollbar -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
          {groups.map((group) => (
            <button
              key={group}
              type="button"
              aria-pressed={group === filter}
              onClick={() => setFilter(group)}
              className={`h-11 shrink-0 rounded-full border px-5 text-[15px] font-semibold transition active:scale-[0.97] ${
                group === filter
                  ? "border-coffee bg-coffee text-milk"
                  : "border-line bg-white/60 text-coffee-soft hover:border-coffee/40 hover:bg-white"
              }`}
            >
              {group}
            </button>
          ))}
        </div>

        <ul key={filter} className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10">
          {visible.map((item, index) => (
            <li key={item.src} className="pop" style={{ "--i": index } as React.CSSProperties}>
              {/* Фото-«полароид»: рамка, подпись от руки, наклон; при наведении выпрямляется и приподнимается. */}
              <button
                type="button"
                onClick={() => setCurrent(index)}
                className={`group relative block w-full cursor-zoom-in bg-white p-2.5 pb-4 shadow-[0_14px_24px_-14px_rgb(47_33_27/0.55)] transition-[rotate,translate,scale,box-shadow] duration-300 hover:z-10 hover:-translate-y-1.5 hover:rotate-0 hover:scale-[1.04] hover:shadow-[0_24px_34px_-16px_rgb(47_33_27/0.6)] sm:p-3 sm:pb-5 ${poses[index % poses.length]}`}
                aria-label={`Открыть фото: ${item.alt}`}
              >
                <span aria-hidden="true" className="absolute -top-2.5 left-1/2 z-10 h-5 w-14 -translate-x-1/2 -rotate-2 bg-cream-deep/90 shadow-sm" />
                {/* Фото «проявляется»: из блёклого и размытого в чёткое, пока снимок въезжает в экран (см. globals.css). */}
                <span className="develop relative block aspect-square overflow-hidden bg-cream">
                  <FoodImage
                    src={item.src}
                    alt={item.alt}
                    sizes="(min-width: 1024px) 340px, (min-width: 640px) 30vw, 50vw"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute right-2 top-2 flex size-9 scale-75 items-center justify-center rounded-full bg-milk/95 text-coffee opacity-0 shadow transition duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
                  >
                    <ZoomIcon width={18} height={18} />
                  </span>
                </span>
                <span className="mt-3 block text-center font-hand text-2xl leading-none text-coffee-soft sm:text-[1.7rem]">
                  {item.caption}
                </span>
              </button>
            </li>
          ))}

          {filter === ALL && (
            <li className="pop col-span-2 sm:col-span-1" style={{ "--i": visible.length } as React.CSSProperties}>
              <a
                href={site.links.yandexPhotos}
                target="_blank"
                rel="noopener"
                className="group flex h-full min-h-48 rotate-1 flex-col justify-between gap-6 border-2 border-dashed border-line bg-cream/60 p-5 transition hover:rotate-0 hover:border-terracotta-soft hover:bg-cream sm:p-6"
              >
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-olive">Интерьер кафе</p>
                  <p className="mt-2 font-display text-xl font-semibold leading-snug">
                    Зал и вход — на настоящих фото гостей на Яндекс Картах
                  </p>
                </div>
                <span className="inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta">
                  Смотреть фото кафе
                  <ExternalIcon width={18} height={18} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            </li>
          )}
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
          // Клик по тёмному фону вокруг фото закрывает просмотр; свайп влево/вправо листает.
          <figure
            onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              const start = touchStartX.current;
              touchStartX.current = null;
              if (start === null) return;
              const dx = e.changedTouches[0].clientX - start;
              if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            }}
            className="relative flex h-[100dvh] w-screen flex-col items-center justify-center gap-3 p-4 sm:p-10"
          >
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
              <span className="block text-sm text-milk/70">
                {current !== null && `${current + 1} / ${visible.length}`}
                {photo.illustrative && " · иллюстративное фото"}
              </span>
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
