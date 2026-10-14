"use client";

import { useRef, useState } from "react";
import { menuCategories, menuItems, type MenuCategoryId, type MenuItem } from "@/data/menu";
import { DishDialog } from "./DishDialog";
import { MenuCategories } from "./MenuCategories";
import { MenuGrid } from "./MenuGrid";

// Используются только категории, в которых есть блюда, — пустых вкладок не будет.
const categories = menuCategories.filter((c) => menuItems.some((item) => item.category === c.id));

export function Menu() {
  const [active, setActive] = useState<MenuCategoryId>(categories[0].id);
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const select = (id: string) => {
    setActive(id as MenuCategoryId);
    // Если переключили вкладку, пролистав вниз, — возвращаем к началу списка.
    const grid = gridRef.current;
    if (grid && grid.getBoundingClientRect().top < 0) {
      grid.scrollIntoView({ block: "start" });
    }
  };

  return (
    <section id="menu" aria-labelledby="menu-title" className="scroll-mt-16 bg-cream/60 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-hand text-2xl text-terracotta">что сегодня на обед</p>
            <h2 id="menu-title" className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Наше меню
            </h2>
          </div>
          <p className="max-w-md text-muted">
            Выбирайте по категориям: первое, горячее, гарнир — и что-нибудь к чаю.
          </p>
        </div>

        <div className="sticky top-16 z-20 -mx-4 mt-8 bg-cream/95 px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:backdrop-blur-none">
          <MenuCategories options={categories} active={active} onChange={select} />
        </div>

        <div ref={gridRef} className="mt-6 scroll-mt-36">
          <MenuGrid key={active} items={menuItems.filter((item) => item.category === active)} onOpen={setSelected} />
        </div>
      </div>
      <DishDialog item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
