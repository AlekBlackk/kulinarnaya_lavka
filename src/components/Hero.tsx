import { site } from "@/config/site";
import { FoodImage } from "./FoodImage";
import { ArrowIcon, ClockIcon, PhoneIcon, PinIcon } from "./icons";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="awning" aria-hidden="true" />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-6 sm:px-6 md:pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-32">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-olive-soft px-3.5 py-1.5 text-sm font-semibold text-olive">
            <span className="size-1.5 rounded-full bg-olive" aria-hidden="true" />
            Кафе домашней кухни в Тамбове
          </p>

          <h1 className="mt-5 font-display text-[2.6rem] font-bold leading-[1.02] tracking-tight text-coffee min-[400px]:text-5xl sm:text-6xl xl:text-[4.25rem]">
            Вкусные <em className="font-semibold text-terracotta">обеды</em>
            <br />
            на каждый день
          </h1>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted sm:mt-5 sm:text-lg">
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

          <ul className="mt-6 grid gap-x-8 gap-y-2.5 border-t border-line pt-5 sm:mt-9 sm:gap-y-3 sm:pt-6 text-[15px] sm:grid-cols-2">
            <li className="flex items-start gap-3">
              <PinIcon className="mt-0.5 shrink-0 text-terracotta" />
              <a href={site.links.yandexOrg} target="_blank" rel="noopener" className="hover:text-terracotta">
                {site.address.street}, {site.address.details}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <PhoneIcon className="mt-0.5 shrink-0 text-terracotta" />
              <a href={site.phone.href} className="font-semibold hover:text-terracotta">
                {site.phone.display}
              </a>
            </li>
            <li className="flex items-start gap-3 sm:col-span-2">
              <ClockIcon className="mt-0.5 shrink-0 text-terracotta" />
              <span>
                {site.hours.display.map((h) => `${h.days} ${h.time}`).join(", ")}
                {!site.hours.confirmed && <span className="text-muted"> · уточняйте по телефону</span>}
              </span>
            </li>
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2rem] bg-cream shadow-[0_30px_60px_-30px_rgba(47,33,27,0.45)] ring-8 ring-cream">
            <FoodImage
              src={site.heroImage.src}
              alt={site.heroImage.alt}
              sizes="(min-width: 1024px) 480px, (min-width: 448px) 448px, 100vw"
              preload
            />
            {site.heroImage.illustrative && (
              <span className="absolute bottom-3 right-4 text-xs font-medium text-white/85 drop-shadow">
                иллюстративное фото
              </span>
            )}
          </div>

          <div className="absolute -left-2 top-[12%] flex size-28 -rotate-[10deg] flex-col items-center justify-center rounded-full bg-olive text-center text-milk shadow-lg sm:-left-6 sm:size-32">
            <span className="text-[11px] font-semibold uppercase tracking-wider opacity-80">средний чек</span>
            <span className="font-display text-xl font-bold leading-tight sm:text-2xl">{site.averageCheck}</span>
            <span className="text-[10px] opacity-75">по Яндекс Картам</span>
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
