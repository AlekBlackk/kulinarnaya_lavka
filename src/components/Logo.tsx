import { BowlIcon } from "./icons";

// Текстовый знак: «Кулинарная лавка» строгим шрифтом + рукописное «& bistro».
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="group flex min-w-0 items-center gap-2 min-[360px]:gap-2.5" aria-label="Кулинарная лавка & bistro — наверх">
      <span
        className={`hidden size-9 shrink-0 items-center min-[340px]:flex min-[360px]:size-10 justify-center rounded-full transition-transform group-hover:-rotate-12 ${
          light ? "bg-cream text-terracotta" : "bg-terracotta text-milk"
        }`}
      >
        <BowlIcon width={22} height={22} />
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span className={`truncate font-display text-[15px] font-bold min-[360px]:text-[17px] sm:text-lg ${light ? "text-milk" : "text-coffee"}`}>
          Кулинарная лавка
        </span>
        <span className={`-mt-0.5 font-hand text-xl ${light ? "text-terracotta-soft" : "text-terracotta"}`}>
          &amp; bistro
        </span>
      </span>
    </a>
  );
}
