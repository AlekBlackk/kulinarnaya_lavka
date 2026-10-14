import { site } from "@/config/site";
import { Awning } from "./Awning";
import { HeroSlides } from "./HeroSlides";
import { OpenNow } from "./OpenNow";
import { ArrowIcon, ClockIcon, PhoneIcon, PinIcon } from "./icons";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <Awning />
      <div aria-hidden="true" className="blob pointer-events-none absolute -right-24 top-24 size-[26rem] rounded-full bg-terracotta-soft/25 blur-3xl" />
      <div aria-hidden="true" className="blob pointer-events-none absolute -left-28 bottom-0 size-80 rounded-full bg-olive-soft/70 blur-3xl [animation-delay:-6s]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-6 sm:px-6 md:pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-32">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-olive-soft px-3.5 py-1.5 text-sm font-semibold text-olive">
            <span className="size-1.5 rounded-full bg-olive" aria-hidden="true" />
            Кафе домашней кухни в Тамбове
          </p>

          <h1 className="mt-4 font-display text-[clamp(2.1rem,10.5vw,3rem)] font-bold leading-[1.02] tracking-tight text-coffee sm:text-6xl lg:text-[3.4rem] xl:text-[4.25rem]">
            <span className="word" style={{ "--i": 0 } as React.CSSProperties}>Вкусные</span>{" "}
            <span className="word relative" style={{ "--i": 1 } as React.CSSProperties}>
              <em className="font-semibold text-terracotta">обеды</em>
              {/* Подчёркивание «рисуется» от руки; без анимации просто остаётся линией. */}
              <svg
                aria-hidden="true"
                viewBox="0 0 200 14"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 h-3 w-full overflow-visible text-terracotta-soft"
              >
                <path
                  className="scribble"
                  pathLength="1"
                  d="M3 9 C 38 2, 70 12, 104 6 S 168 3, 197 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br />
            <span className="word" style={{ "--i": 2 } as React.CSSProperties}>на</span>{" "}
            <span className="word" style={{ "--i": 3 } as React.CSSProperties}>каждый</span>{" "}
            <span className="word" style={{ "--i": 4 } as React.CSSProperties}>день</span>
          </h1>

          <p className="mt-3 flex flex-wrap items-center gap-x-2 font-hand text-2xl leading-tight text-terracotta sm:text-[1.7rem]">
            <svg aria-hidden="true" viewBox="0 0 40 24" width="36" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 4c10 0 18 6 20 14M22 18l-7-3M22 18l2-8" />
            </svg>
            <span>Заходите</span>
            {/* Три подписи сменяют друг друга; при reduced motion остаётся первая. */}
            <span className="rotator">
              <span style={{ "--i": 0 } as React.CSSProperties}>в обеденный перерыв</span>
              <span style={{ "--i": 1 } as React.CSSProperties}>пообедать на месте</span>
              <span style={{ "--i": 2 } as React.CSSProperties}>за едой с собой</span>
            </span>
          </p>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            Супы, горячее, гарниры, салаты и выпечка — как дома. Пообедайте у нас или возьмите еду с собой.
          </p>

          <div className="mt-6 grid gap-2.5 min-[360px]:grid-cols-[1.1fr_1fr] sm:mt-8 sm:flex sm:gap-3">
            <a
              href="#menu"
              className="group inline-flex h-13 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-terracotta px-3 text-[15px] min-[400px]:px-4 sm:px-7 sm:text-base font-bold text-white shadow-[0_8px_24px_-10px] shadow-terracotta transition hover:bg-coffee active:scale-[0.98]"
            >
              Посмотреть меню
              <ArrowIcon className="hidden transition-transform group-hover:translate-x-1 min-[400px]:block" />
            </a>
            <a
              href="#contacts"
              className="inline-flex h-13 items-center justify-center whitespace-nowrap rounded-full border-2 border-coffee/15 px-3 text-[15px] min-[400px]:px-4 sm:px-7 sm:text-base font-bold text-coffee transition hover:border-coffee hover:bg-cream active:scale-[0.98]"
            >
              Как нас найти
            </a>
          </div>

          {/* На телефоне контакты уже есть в шапке и в «Где нас найти»; здесь они уводят фото ниже первого экрана. */}
          <ul className="mt-9 hidden gap-x-8 gap-y-3 border-t border-line pt-6 text-[15px] sm:grid sm:grid-cols-2">
            <li className="flex items-start gap-3">
              <PinIcon className="mt-0.5 shrink-0 text-terracotta" />
              <a href={site.links.yandexOrg} target="_blank" rel="noopener" className="relative hover:text-terracotta before:absolute before:-inset-y-2.5 before:inset-x-0">
                {site.address.street}, {site.address.details}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <PhoneIcon className="mt-0.5 shrink-0 text-terracotta" />
              <a href={site.phone.href} className="relative font-semibold hover:text-terracotta before:absolute before:-inset-y-2.5 before:inset-x-0">
                {site.phone.display}
              </a>
            </li>
            <li className="flex items-start gap-3 sm:col-span-2">
              <ClockIcon className="mt-0.5 shrink-0 text-terracotta" />
              <div>
                <p>
                  {site.hours.display.map((h) => `${h.days} ${h.time}`).join(", ")}
                  {!site.hours.confirmed && <span className="text-muted"> · уточняйте по телефону</span>}
                </p>
                {/* Место под статус занято заранее, чтобы блок не прыгал, когда статус посчитается в браузере. */}
                <OpenNow className="mt-2 justify-start" />
              </div>
            </li>
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2rem] bg-cream shadow-[0_30px_60px_-30px_rgba(47,33,27,0.45)] ring-8 ring-cream">
            <HeroSlides />
          </div>

          <div className="sticker absolute -left-2 top-[12%] flex size-28 -rotate-[10deg] flex-col items-center justify-center rounded-full bg-olive text-center text-milk shadow-lg sm:-left-6 sm:size-32">
            <span className="text-[11px] font-semibold uppercase tracking-wider opacity-80">средний чек</span>
            <span className="font-display text-xl font-bold leading-tight sm:text-2xl">{site.averageCheck}</span>
            <span className="text-[10px] opacity-75">по Яндекс Картам</span>
          </div>

          <div className="float absolute -right-2 top-[58%] flex rotate-3 items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-coffee shadow-lg sm:-right-5">
            <span className="size-2.5 rounded-full bg-olive" aria-hidden="true" />
            Можно с собой
          </div>

          <p className="absolute left-6 top-full mt-4 hidden rotate-[-3deg] font-hand text-[1.7rem] leading-tight text-coffee-soft lg:block">
            суп, горячее, выпечка —
            <br />
            всё на виду
          </p>
        </div>
      </div>
    </section>
  );
}
