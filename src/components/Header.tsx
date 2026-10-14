"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { CloseIcon, MenuIcon, PhoneIcon } from "./icons";
import { Logo } from "./Logo";

// Раздел, который сейчас в центре экрана; на первом экране (его нет в навигации) — null.
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        setActive(site.nav.find((item) => visible.has(item.href.slice(1)))?.href ?? null);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const item of site.nav) {
      const section = document.getElementById(item.href.slice(1));
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  return active;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [pill, setPill] = useState({ left: 0, width: 0 });
  const listRef = useRef<HTMLUListElement>(null);
  const active = useActiveSection();
  const target = hovered ?? active;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Бегунок в навигации скользит к наведённому или текущему разделу.
  useEffect(() => {
    const list = listRef.current;
    if (!list || !target) return;
    const measure = () => {
      // Меряем <li>: он позиционирован, поэтому у ссылки offsetParent — не список.
      const item = list.querySelector<HTMLElement>(`a[href="${target}"]`)?.parentElement;
      if (item?.offsetWidth) setPill({ left: item.offsetLeft, width: item.offsetWidth });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [target]);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-milk/90 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "border-line shadow-[0_10px_30px_-18px_rgb(47_33_27/0.55)]" : "border-line/80"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6">
        <Logo />

        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul
            ref={listRef}
            onMouseLeave={() => setHovered(null)}
            className="relative flex items-center gap-0.5 rounded-full bg-cream/70 p-1 ring-1 ring-line"
          >
            <li
              aria-hidden="true"
              className={`absolute inset-y-1 rounded-full bg-terracotta shadow-[0_6px_14px_-6px_var(--color-terracotta)] transition-[left,width,opacity] duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)] motion-reduce:transition-none ${
                target ? "opacity-100" : "opacity-0"
              }`}
              style={{ left: pill.left, width: pill.width }}
            />
            {site.nav.map((item) => (
              <li key={item.href} className="relative">
                <a
                  href={item.href}
                  aria-current={active === item.href ? "location" : undefined}
                  onMouseEnter={() => setHovered(item.href)}
                  onFocus={() => setHovered(item.href)}
                  onBlur={() => setHovered(null)}
                  className={`block whitespace-nowrap rounded-full px-4 py-2 text-[15px] font-semibold transition-colors duration-200 ${
                    target === item.href ? "text-white" : "text-coffee-soft"
                  }`}
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
            className="call-btn group flex h-11 items-center gap-2 rounded-full bg-terracotta px-3.5 sm:px-4 text-sm font-bold text-white transition hover:bg-coffee active:scale-[0.97]"
          >
            <PhoneIcon width={18} height={18} className="group-hover:animate-[ring_0.6s_ease-in-out]" />
            <span className="hidden whitespace-nowrap lg:inline">{site.phone.display}</span>
            <span className="hidden sm:inline lg:hidden">Позвонить</span>
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
                aria-current={active === item.href ? "location" : undefined}
                className={`flex items-center justify-between py-4 font-display text-xl font-semibold ${
                  active === item.href ? "text-terracotta" : ""
                }`}
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
