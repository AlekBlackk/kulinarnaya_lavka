"use client";

import { useEffect, useRef } from "react";
import { site } from "@/config/site";
import type { MenuItem } from "@/data/menu";
import { formatPrice } from "@/lib/format";
import { FoodImage } from "./FoodImage";
import { CloseIcon, PhoneIcon } from "./icons";

type Props = { item: MenuItem | null; onClose: () => void };

// Увеличенная карточка блюда в нативном <dialog>: фокус, Esc и затемнение фона работают из коробки.
export function DishDialog({ item, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (item && dialog && !dialog.open) dialog.showModal();
  }, [item]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
      aria-label={item?.name ?? "Блюдо"}
      className="m-auto w-[min(32rem,calc(100vw-2rem))] overflow-hidden rounded-3xl bg-milk p-0 text-coffee shadow-2xl backdrop:backdrop-blur-sm"
    >
      {item && (
        <div className="relative">
          <div className="relative aspect-[4/3] bg-cream">
            <FoodImage key={item.id} src={item.image} alt={item.name} sizes="512px" loading="eager" />
          </div>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label="Закрыть"
            className="absolute right-3 top-3 flex size-11 items-center justify-center rounded-full bg-milk/95 text-coffee shadow transition hover:bg-cream"
          >
            <CloseIcon />
          </button>

          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-2xl font-bold leading-snug">{item.name}</h3>
              <p className="whitespace-nowrap rounded-full bg-cream px-4 py-1.5 font-display text-xl font-bold text-terracotta">
                {formatPrice(item.price)}
              </p>
            </div>
            <p className="mt-3 leading-relaxed text-muted">{item.description}</p>

            {item.demo && (
              <p className="mt-4 rounded-2xl border border-dashed border-terracotta-soft/60 px-4 py-3 text-sm text-muted">
                Пример блюда: описание и цена демонстрационные.
              </p>
            )}

            <a
              href={site.phone.href}
              className="mt-5 inline-flex h-12 items-center gap-2 rounded-full bg-terracotta px-6 font-bold text-white transition hover:bg-coffee active:scale-[0.98]"
            >
              <PhoneIcon width={18} height={18} />
              Уточнить наличие
            </a>
          </div>
        </div>
      )}
    </dialog>
  );
}
