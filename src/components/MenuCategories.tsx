"use client";

import { useEffect, useRef, useState } from "react";

type Option = { id: string; label: string; count: number };

type Props = {
  options: Option[];
  active: string;
  onChange: (id: string) => void;
};

// Переключатель категорий: тёмная плашка скользит к выбранной вкладке.
// Список всегда в одну строку и листается по горизонтали, поэтому плашке хватает left/width.
export function MenuCategories({ options, active, onChange }: Props) {
  const listRef = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const tab = list.querySelector<HTMLElement>(`[data-id="${active}"]`);
      if (tab) setPill({ left: tab.offsetLeft, width: tab.offsetWidth });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [active]);

  // На телефоне подкручиваем список, чтобы выбранная вкладка была по центру.
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const list = listRef.current;
    const tab = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (list && tab) list.scrollTo({ left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  return (
    <div ref={listRef} className="no-scrollbar relative -mx-4 flex gap-1.5 overflow-x-auto px-4 pb-2.5 pt-1 sm:mx-0 sm:px-0">
      {pill && (
        <span
          aria-hidden="true"
          className="absolute top-1 h-11 rounded-full bg-coffee shadow-[0_5px_9px_-6px_rgb(47_33_27/0.4)] transition-[left,width] duration-300 ease-[cubic-bezier(0.34,1.3,0.64,1)] motion-reduce:transition-none"
          style={{ left: pill.left, width: pill.width }}
        />
      )}
      {options.map((option) => {
        const isActive = option.id === active;
        return (
          <button
            key={option.id}
            data-id={option.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.id)}
            className={`relative flex h-11 shrink-0 items-center gap-1.5 rounded-full border px-4 text-[15px] font-semibold transition-colors duration-200 active:scale-[0.97] ${
              isActive
                ? "border-transparent text-milk"
                : "border-line bg-white/60 text-coffee-soft hover:border-coffee/40 hover:bg-white"
            }`}
          >
            {option.label}
            <span
              className={`rounded-full px-1.5 text-xs font-bold tabular-nums transition-colors duration-200 ${
                isActive ? "bg-milk/20 text-milk" : "bg-cream text-muted"
              }`}
            >
              {option.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
