import type { MenuItem } from "@/data/menu";
import { formatPrice } from "@/lib/format";
import { FoodImage } from "./FoodImage";

// На телефоне карточка горизонтальная (фото слева), чтобы меню листалось быстро;
// с 640px — вертикальная с крупным фото.
export function MenuCard({ item }: { item: MenuItem }) {
  return (
    <article className="group flex h-full overflow-hidden rounded-3xl border border-line bg-white/70 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(47,33,27,0.45)] sm:flex-col">
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
        <h3 className="font-display text-lg font-semibold leading-snug text-coffee sm:text-xl">{item.name}</h3>
        <p className="mt-1 flex-1 text-sm leading-relaxed text-muted sm:mt-1.5 sm:text-[15px]">{item.description}</p>
        <p className="mt-3 self-start rounded-full bg-cream px-3.5 py-1 font-display text-lg font-bold text-terracotta sm:mt-4 sm:px-4 sm:py-1.5">
          {formatPrice(item.price)}
        </p>
      </div>
    </article>
  );
}
