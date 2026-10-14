"use client";

import { useRef, useState } from "react";
import { menuCategories, menuItems, type MenuCategoryId, type MenuItem } from "@/data/menu";
import { site } from "@/config/site";
import { DishDialog } from "./DishDialog";
import { GridIcon, ListIcon } from "./icons";
import { MenuCategories } from "./MenuCategories";
import { MenuGrid } from "./MenuGrid";
import { MenuList } from "./MenuList";

// Используются только категории, в которых есть блюда, — пустых вкладок не будет.
const categories = menuCategories
  .map((c) => ({ ...c, count: menuItems.filter((item) => item.category === c.id).length }))
  .filter((c) => c.count > 0);

export function Menu() {
  const [active, setActive] = useState<MenuCategoryId>(categories[0].id);
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [view, setView] = useState<"cards" | "list">("cards");
  const gridRef = useRef<HTMLDivElement>(null);

  const select = (id: string) => {
    setActive(id as MenuCategoryId);
    // Если переключили вкладку, пролистав вниз, — возвращаем к началу списка.
    const grid = gridRef.current;
    if (grid && grid.getBoundingClientRect().top < 0) {
      grid.scrollIntoView({ block: "start" });
    }
  };

  const shown = menuItems.filter((item) => item.category === active);

  return (
    <section id="menu" aria-labelledby="menu-title" className="scroll-mt-16 bg-cream/60 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-hand text-2xl text-terracotta">что сегодня на обед</p>
            <h2 id="menu-title" className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Наше{" "}
              <span className="relative inline-block text-terracotta">
                <em className="font-semibold">меню</em>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 120 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-4.5 left-0 h-2.5 w-full overflow-visible text-terracotta-soft"
                >
                  <path
                    className="scribble scribble-view"
                    pathLength="1"
                    d="M2 7 C 25 2, 45 10, 68 5 S 105 3, 118 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
          </div>
          <ul className="flex flex-wrap gap-2 text-sm font-semibold text-coffee-soft">
            <li className="rounded-full border border-line bg-milk px-3.5 py-1.5">Средний чек {site.averageCheck}</li>
            <li className="rounded-full border border-line bg-milk px-3.5 py-1.5">Еда навынос</li>
            <li className="rounded-full border border-line bg-milk px-3.5 py-1.5">Кофе с собой</li>
          </ul>
        </div>

        <div className="sticky top-16 z-20 -mx-4 mt-8 bg-cream/95 px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:backdrop-blur-none">
          <MenuCategories options={categories} active={active} onChange={select} />
        </div>

        <div className="mt-4 flex justify-end">
          <div role="group" aria-label="Вид меню" className="flex rounded-full border border-line bg-white/60 p-1">
            {(
              [
                { id: "cards", label: "Карточки", Icon: GridIcon },
                { id: "list", label: "Список", Icon: ListIcon },
              ] as const
            ).map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                aria-pressed={view === id}
                onClick={() => setView(id)}
                className={`inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors ${
                  view === id ? "bg-coffee text-milk" : "text-coffee-soft hover:bg-cream"
                }`}
              >
                <Icon width={18} height={18} />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div ref={gridRef} className="mt-6 scroll-mt-36">
          {view === "cards" ? (
            <MenuGrid key={active} items={shown} onOpen={setSelected} />
          ) : (
            <MenuList key={active} items={shown} onOpen={setSelected} />
          )}
        </div>
      </div>
      <DishDialog item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
