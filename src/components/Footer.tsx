import { site } from "@/config/site";
import { ArrowIcon, PhoneIcon, RouteIcon } from "./icons";
import { Awning } from "./Awning";
import { Logo } from "./Logo";

// Круглая кнопка «Наверх»: надпись по кругу медленно вращается.
function BackToTop() {
  return (
    <a
      href="#top"
      aria-label="Наверх"
      className="group relative flex size-28 shrink-0 items-center justify-center rounded-full bg-terracotta text-milk transition hover:bg-terracotta-soft active:scale-95"
    >
      <svg viewBox="0 0 100 100" aria-hidden="true" className="spin-slow absolute inset-0 size-full">
        <defs>
          <path id="back-to-top-circle" d="M50 50m-37 0a37 37 0 1 1 74 0a37 37 0 1 1-74 0" />
        </defs>
        <text fontSize="10.5" fontWeight="700" fill="currentColor" letterSpacing="1">
          <textPath href="#back-to-top-circle" textLength="228" lengthAdjust="spacing">
            НАВЕРХ • НАВЕРХ • НАВЕРХ •
          </textPath>
        </text>
      </svg>
      <ArrowIcon width={28} height={28} className="-rotate-90 transition-transform duration-300 group-hover:-translate-y-1" />
    </a>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-coffee text-milk">
      <Awning />

      <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-20">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-hand text-2xl text-terracotta-soft">ждём вас</p>
            <p className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Приходите <em className="font-semibold text-terracotta-soft">на обед</em>
            </p>
            <p className="mt-4 max-w-md text-milk/70">
              {site.address.street}, {site.address.details}. Суп, горячее и выпечка — на месте или с собой.
            </p>
            <div className="mt-7 flex flex-col gap-3 min-[420px]:flex-row">
              <a
                href={site.links.route}
                target="_blank"
                rel="noopener"
                className="inline-flex h-13 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-terracotta px-6 font-bold text-white transition hover:bg-terracotta-soft active:scale-[0.98]"
              >
                <RouteIcon />
                Построить маршрут
              </a>
              <a
                href={site.phone.href}
                className="inline-flex h-13 items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-milk/25 px-6 font-bold transition hover:border-milk hover:bg-milk/10 active:scale-[0.98]"
              >
                <PhoneIcon />
                {site.phone.display}
              </a>
            </div>
          </div>
          <BackToTop />
        </div>

        <div className="mt-14 grid gap-10 border-t border-milk/10 pt-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-sm leading-relaxed text-milk/70">{site.description}</p>
          </div>

          <nav aria-label="Разделы сайта">
            <p className="text-sm font-semibold uppercase tracking-wider text-milk/50">Разделы</p>
            <ul className="mt-4 space-y-2">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="link-slide inline-block py-1">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-milk/50">Контакты</p>
            <address className="mt-4 space-y-2 not-italic">
              <a href={site.phone.href} className="link-slide inline-block py-1 text-lg font-bold">
                {site.phone.display}
              </a>
              <a href={site.links.yandexOrg} target="_blank" rel="noopener" className="link-slide block py-1">
                {site.address.city}, {site.address.street}, {site.address.details}
              </a>
              <p className="text-milk/70">
                {site.hours.display.map((h) => `${h.days} ${h.time}`).join(", ")}
              </p>
            </address>
          </div>
        </div>
      </div>

      {/* Огромная вывеска на всю ширину: при наведении буквы по очереди «зажигаются» и подпрыгивают. Чистый декор. */}
      <p
        aria-hidden="true"
        className="reveal mt-6 select-none whitespace-nowrap pb-[0.3em] text-center font-display text-[10.5vw] font-bold italic leading-[1.05]"
      >
        {[..."Кулинарная лавка"].map((char, i) => (
          <span key={i} className="wm-letter">
            {char === " " ? " " : char}
          </span>
        ))}
      </p>

      <div className="border-t border-milk/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-milk/55 sm:px-6 md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Все права защищены.
          </p>
          <p>
            Иллюстративные фото блюд —{" "}
            <a href="https://unsplash.com" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-milk">
              Unsplash
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
