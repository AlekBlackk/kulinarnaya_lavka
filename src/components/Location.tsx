import { site } from "@/config/site";
import { CopyButton } from "./CopyButton";
import { ExternalIcon, PhoneIcon, PinIcon, RouteIcon } from "./icons";
import { OpenNow } from "./OpenNow";
import { WeekStrip } from "./WeekStrip";

// Одна строка «чека»: подпись, пунктирный выравниватель и значение.
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-3">
      <dt className="shrink-0 font-mono text-xs font-bold uppercase tracking-wider text-muted">{label}</dt>
      <span aria-hidden="true" className="min-w-4 flex-1 border-b-2 border-dotted border-coffee/25" />
      <dd className="text-right font-semibold">{children}</dd>
    </div>
  );
}

export function Location() {
  return (
    <section id="contacts" aria-labelledby="contacts-title" className="scroll-mt-16 bg-cream/60 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:gap-8 lg:gap-14">
        <div>
          <div className="reveal">
            <p className="font-hand text-2xl text-terracotta">заходите на обед</p>
            <h2 id="contacts-title" className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Где{" "}
              <span className="relative inline-block text-terracotta">
                <em className="font-semibold">нас найти</em>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-4.5 left-0 h-2.5 w-full overflow-visible text-terracotta-soft"
                >
                  <path
                    className="scribble scribble-view"
                    pathLength="1"
                    d="M2 7C40 2 70 11 105 6S170 3 198 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
          </div>

          {/* Контакты оформлены как кассовый чек: «печатается» при прокрутке, снизу зубчатый край. */}
          <div className="mt-8 drop-shadow-[0_18px_24px_rgb(47_33_27/0.18)]">
            <div className="receipt print rounded-t-2xl bg-white px-6 pb-10 pt-7 text-coffee sm:px-8">
              <p className="text-center font-display text-2xl font-bold">{site.name}</p>
              <p className="mt-1 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted">
                чек гостя · {site.address.city}
              </p>
              <div className="mt-4">
                <OpenNow />
              </div>

              <div className="my-5 border-t-2 border-dashed border-coffee/20" />

              <dl className="space-y-4">
                <Row label="Адрес">
                  {site.address.street}
                  <span className="block text-sm font-normal text-muted">{site.address.details}</span>
                  <CopyButton text={`${site.address.city}, ${site.address.street}`} label="Скопировать адрес" />
                </Row>
                <Row label="Телефон">
                  <a href={site.phone.href} className="text-lg font-bold hover:text-terracotta">
                    {site.phone.display}
                  </a>
                </Row>
                <Row label="Часы">
                  {site.hours.display.map((h) => (
                    <span key={h.days} className="block">
                      {h.days} <span className="font-bold">{h.time}</span>
                    </span>
                  ))}
                </Row>
              </dl>

              <div className="mt-5">
                <WeekStrip />
                {!site.hours.confirmed && (
                  <p className="mt-3 text-sm text-muted">
                    По данным Яндекс Карт. Перед визитом лучше уточнить по телефону.
                  </p>
                )}
              </div>

              <div className="my-5 border-t-2 border-dashed border-coffee/20" />

              <dl>
                <Row label="Средний чек">
                  <span className="font-display text-xl font-bold text-terracotta">{site.averageCheck}</span>
                </Row>
              </dl>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row md:flex-col xl:flex-row">
                <a
                  href={site.links.route}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex h-13 items-center sm:flex-1 md:flex-none xl:flex-1 justify-center gap-2 whitespace-nowrap rounded-full bg-terracotta px-6 font-bold text-white transition hover:bg-coffee active:scale-[0.98]"
                >
                  <RouteIcon />
                  Построить маршрут
                </a>
                <a
                  href={site.phone.href}
                  className="inline-flex h-13 items-center sm:flex-1 md:flex-none xl:flex-1 justify-center gap-2 whitespace-nowrap rounded-full border-2 border-coffee/15 px-6 font-bold transition hover:border-coffee hover:bg-cream active:scale-[0.98]"
                >
                  <PhoneIcon />
                  Позвонить
                </a>
              </div>

              <ul className="mt-3 flex flex-wrap gap-2" aria-label="Маршрут по способу передвижения">
                {site.links.routeModes.map((mode) => (
                  <li key={mode.label}>
                    <a
                      href={mode.href}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex min-h-11 items-center rounded-full bg-cream px-4 text-sm font-semibold text-coffee-soft transition hover:bg-cream-deep"
                    >
                      {mode.label}
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href={site.links.yandexOrg}
                target="_blank"
                rel="noopener"
                className="mt-4 inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-olive underline-offset-4 hover:underline"
              >
                Карточка кафе на Яндекс Картах
                <ExternalIcon width={16} height={16} />
              </a>

              <div aria-hidden="true" className="barcode mt-4 h-12" />
              <p className="mt-3 text-center font-hand text-2xl text-terracotta">Спасибо, что заглянули!</p>
            </div>
          </div>
        </div>

        {/* Карта в рамке-открытке: чуть наклонена, «приклеена» скотчем. */}
        <div className="reveal relative md:pt-16">
          {/* Пунктирный путь «к нам» над картой — декор, только на широком экране. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 400 60"
            fill="none"
            className="absolute -left-10 top-0 hidden h-16 w-[calc(100%+2.5rem)] text-terracotta-soft md:block"
          >
            <path
              pathLength="1"
              d="M4 50C70 8 140 58 210 30S330 6 392 40"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="0.012 0.018"
            />
          </svg>
          <div className="relative h-full min-h-[380px] rotate-1 rounded-3xl bg-white p-3 shadow-[0_24px_40px_-24px_rgb(47_33_27/0.5)]">
            <span aria-hidden="true" className="absolute -top-3 left-1/2 z-10 h-6 w-24 -translate-x-1/2 -rotate-2 bg-cream-deep/90 shadow-sm" />
            <iframe
              src={site.links.mapWidget}
              title={`${site.name} на карте: ${site.address.city}, ${site.address.street}`}
              loading="lazy"
              className="size-full min-h-[356px] rounded-2xl border-0"
              allowFullScreen
            />
            <p
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-5 right-6 flex rotate-3 items-center gap-1.5 rounded-full bg-terracotta py-1.5 pl-3 pr-4 font-hand text-2xl text-white shadow-lg"
            >
              <PinIcon width={20} height={20} className="pin-bounce" />
              мы здесь!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
