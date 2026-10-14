import type { MenuItem } from "@/data/menu";
import { formatPrice } from "@/lib/format";
import { FoodImage } from "./FoodImage";

// На телефоне карточка горизонтальная (фото слева), чтобы меню листалось быстро;
// с 640px — вертикальная с крупным фото.
export function MenuCard({ item, onOpen }: { item: MenuItem; onOpen: (item: MenuItem) => void }) {
  return (
    <article className="group relative flex has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-olive h-full overflow-hidden rounded-3xl border border-line bg-white/70 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(47,33,27,0.45)] sm:flex-col">
      <div className="relative min-h-32 w-28 shrink-0 overflow-hidden bg-cream min-[400px]:w-32 sm:aspect-[4/3] sm:min-h-0 sm:w-auto">
        <FoodImage
          src={item.image}
          alt={item.name}
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 128px"
          className="transition-transform duration-500 group-hover:scale-105"
        />
        {item.demo && (
          <span className="absolute left-2 top-2 rounded-full bg-milk/90 px-2 py-0.5 text-[11px] font-semibold text-muted backdrop-blur sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-xs">
            пример
          </span>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-display text-lg font-semibold leading-snug text-coffee sm:text-xl">
          {/* Растянутая кнопка: вся карточка кликабельна, а для скринридера это обычная кнопка с названием блюда. */}
          <button
            type="button"
            onClick={() => onOpen(item)}
            aria-haspopup="dialog"
            className="cursor-pointer text-left outline-none after:absolute after:inset-0"
          >
            {item.name}
          </button>
        </h3>
        <p className="mt-1 flex-1 text-sm leading-relaxed text-muted sm:mt-1.5 sm:text-[15px]">{item.description}</p>
        <p className="price-tag mt-3 origin-left self-start transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105 bg-cream py-1 pl-7 pr-4 font-display text-lg font-bold text-terracotta sm:mt-4 sm:py-1.5">
          {formatPrice(item.price)}
        </p>
      </div>
    </article>
  );
}
