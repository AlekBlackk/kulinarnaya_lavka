"use client";

import { useRef, useState } from "react";
import { menuCategories, menuItems, type MenuItem } from "@/data/menu";
import { DishDialog } from "./DishDialog";
import { GridIcon, ListIcon } from "./icons";
import { MenuCategories } from "./MenuCategories";
import { MenuGrid } from "./MenuGrid";
import { MenuList } from "./MenuList";

const ALL = "all";

// Используются только категории, в которых есть блюда, — пустых вкладок не будет.
const categories = [
  { id: ALL, label: "Все", count: menuItems.length },
  ...menuCategories
    .map((c) => ({ ...c, count: menuItems.filter((item) => item.category === c.id).length }))
    .filter((c) => c.count > 0),
];

export function Menu() {
  const [active, setActive] = useState(ALL);
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [view, setView] = useState<"cards" | "list">("cards");
  const gridRef = useRef<HTMLDivElement>(null);

  const select = (id: string) => {
    setActive(id);
    // Если переключили вкладку, пролистав вниз, — возвращаем к началу списка.
    const grid = gridRef.current;
    if (grid && grid.getBoundingClientRect().top < 0) {
      grid.scrollIntoView({ block: "start" });
    }
  };

  const shown = active === ALL ? menuItems : menuItems.filter((item) => item.category === active);

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

          {/* В шапке переключатель занимает пустое место справа и не съедает отдельную строку. */}
          <div role="group" aria-label="Вид меню" className="flex self-start rounded-full border border-line bg-white/60 p-1 md:self-auto">
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

        <div className="sticky top-16 z-20 -mx-4 mt-6 bg-cream/95 px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:backdrop-blur-none">
          <MenuCategories options={categories} active={active} onChange={select} />
        </div>

        <div ref={gridRef} className="mt-4 scroll-mt-36">
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
