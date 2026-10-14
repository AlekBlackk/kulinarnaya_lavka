"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { CloseIcon, MenuIcon, PhoneIcon } from "./icons";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-milk/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6">
        <Logo />

        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="whitespace-nowrap rounded-full px-4 py-2 text-[15px] font-semibold text-coffee-soft transition-colors hover:bg-cream hover:text-coffee"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 min-[360px]:gap-2">
          <a
            href={site.phone.href}
            aria-label={`Позвонить: ${site.phone.display}`}
            className="flex h-11 items-center gap-2 rounded-full bg-terracotta px-3.5 min-[380px]:px-4 text-sm font-bold text-white transition hover:bg-coffee active:scale-[0.97]"
          >
            <PhoneIcon width={18} height={18} />
            <span className="hidden whitespace-nowrap lg:inline">{site.phone.display}</span>
            <span className="hidden min-[380px]:inline lg:hidden">Позвонить</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            className="flex size-11 items-center justify-center rounded-full border border-line text-coffee transition hover:bg-cream lg:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Мобильная навигация"
        hidden={!open}
        className="border-t border-line bg-milk lg:hidden"
      >
        <ul className="mx-auto max-w-6xl px-4 py-3">
          {site.nav.map((item) => (
            <li key={item.href} className="border-b border-line/70 last:border-0">
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-4 font-display text-xl font-semibold"
              >
                {item.label}
                <span aria-hidden="true" className="text-terracotta">→</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
