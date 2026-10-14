import type { MenuItem } from "@/data/menu";
import { formatPrice } from "@/lib/format";
import { FoodImage } from "./FoodImage";

// Режим «Список»: как в печатном меню — название, пунктир, цена. Все цены категории видны за один взгляд.
export function MenuList({ items, onOpen }: { items: MenuItem[]; onOpen: (item: MenuItem) => void }) {
  return (
    <ul className="divide-y divide-line/70 overflow-hidden rounded-3xl border border-line bg-white/70">
      {items.map((item, index) => (
        <li key={item.id} className="pop" style={{ "--i": index } as React.CSSProperties}>
          <button
            type="button"
            onClick={() => onOpen(item)}
            aria-haspopup="dialog"
            className="group flex w-full cursor-pointer items-center gap-4 p-3 text-left transition-colors hover:bg-cream/70 sm:p-4"
          >
            <span className="relative size-14 shrink-0 overflow-hidden rounded-full bg-cream sm:size-16">
              <FoodImage
                src={item.image}
                alt=""
                sizes="64px"
                className="transition-transform duration-500 group-hover:scale-110"
              />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline gap-2">
                <span className="min-w-0 font-display text-lg font-semibold leading-snug">{item.name}</span>
                {item.demo && <span className="shrink-0 text-xs font-semibold text-muted">пример</span>}
                <span aria-hidden="true" className="min-w-4 flex-1 border-b-2 border-dotted border-coffee/20" />
                <span className="shrink-0 whitespace-nowrap font-display text-lg font-bold text-terracotta">
                  {formatPrice(item.price)}
                </span>
              </span>
              <span className="mt-0.5 block text-sm text-muted">{item.description}</span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
