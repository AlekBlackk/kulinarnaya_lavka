"use client";

import { useRef, useState } from "react";
import { site } from "@/config/site";
import { menuCategories, menuItems, type MenuCategoryId } from "@/data/menu";
import { MenuCategories } from "./MenuCategories";
import { MenuGrid } from "./MenuGrid";

// Используются только категории, в которых есть блюда, — пустых вкладок не будет.
const categories = menuCategories.filter((c) => menuItems.some((item) => item.category === c.id));
const hasDemoItems = menuItems.some((item) => item.demo);

export function Menu() {
  const [active, setActive] = useState<MenuCategoryId>(categories[0].id);
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

        {hasDemoItems && (
          <div className="mt-8 rounded-2xl border-2 border-dashed border-terracotta-soft/60 bg-milk px-5 py-4 text-[15px] leading-relaxed">
            <strong className="font-semibold text-terracotta">Демонстрационное меню.</strong>{" "}
            Блюда, описания и цены ниже — пример оформления, а не действующий прайс. Что есть на раздаче сегодня,
            подскажут по телефону{" "}
            <a href={site.phone.href} className="whitespace-nowrap font-semibold underline underline-offset-4">
              {site.phone.display}
            </a>
            .
          </div>
        )}

        <div className="sticky top-16 z-20 -mx-4 mt-8 bg-cream/95 px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:backdrop-blur-none">
          <MenuCategories options={categories} active={active} onChange={select} />
        </div>

        <div ref={gridRef} className="mt-6 scroll-mt-36">
          <MenuGrid items={menuItems.filter((item) => item.category === active)} />
        </div>
      </div>
    </section>
  );
}
