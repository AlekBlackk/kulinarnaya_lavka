import { site } from "@/config/site";
import { ClockIcon, ExternalIcon, PhoneIcon, PinIcon, RouteIcon } from "./icons";

export function Location() {
  return (
    <section id="contacts" aria-labelledby="contacts-title" className="scroll-mt-16 bg-cream/60 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
        <div className="reveal">
          <p className="font-hand text-2xl text-terracotta">заходите на обед</p>
          <h2 id="contacts-title" className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Где нас найти
          </h2>

          <div className="mt-8 rounded-3xl border border-line bg-milk p-6 sm:p-8">
            <p className="font-display text-2xl font-semibold">{site.name}</p>

            <dl className="mt-6 space-y-5">
              <div className="flex gap-4">
                <dt className="mt-0.5 text-terracotta">
                  <PinIcon />
                  <span className="sr-only">Адрес</span>
                </dt>
                <dd>
                  {site.address.city}, {site.address.street}
                  <span className="block text-muted">{site.address.details}</span>
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="mt-0.5 text-terracotta">
                  <PhoneIcon />
                  <span className="sr-only">Телефон</span>
                </dt>
                <dd>
                  <a href={site.phone.href} className="text-lg font-bold hover:text-terracotta">
                    {site.phone.display}
                  </a>
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="mt-0.5 text-terracotta">
                  <ClockIcon />
                  <span className="sr-only">Часы работы</span>
                </dt>
                <dd className="flex-1">
                  <ul className="max-w-xs space-y-1">
                    {site.hours.display.map((h) => (
                      <li key={h.days} className="flex justify-between gap-6">
                        <span>{h.days}</span>
                        <span className="font-semibold">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                  {!site.hours.confirmed && (
                    <p className="mt-2 text-sm text-muted">
                      По данным Яндекс Карт. Перед визитом лучше уточнить по телефону.
                    </p>
                  )}
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={site.links.route}
                target="_blank"
                rel="noopener"
                className="inline-flex h-13 flex-1 items-center whitespace-nowrap justify-center gap-2 rounded-full bg-terracotta px-6 font-bold text-white transition hover:bg-coffee active:scale-[0.98]"
              >
                <RouteIcon />
                Построить маршрут
              </a>
              <a
                href={site.phone.href}
                className="inline-flex h-13 flex-1 items-center whitespace-nowrap justify-center gap-2 rounded-full border-2 border-coffee/15 px-6 font-bold transition hover:border-coffee hover:bg-cream active:scale-[0.98]"
              >
                <PhoneIcon />
                Позвонить
              </a>
            </div>
            <a
              href={site.links.yandexOrg}
              target="_blank"
              rel="noopener"
              className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-olive underline-offset-4 hover:underline"
            >
              Карточка кафе на Яндекс Картах
              <ExternalIcon width={16} height={16} />
            </a>
          </div>
        </div>

        <div className="reveal relative min-h-[360px] overflow-hidden rounded-3xl border border-line bg-cream lg:min-h-full">
          <iframe
            src={site.links.mapWidget}
            title={`${site.name} на карте: ${site.address.city}, ${site.address.street}`}
            loading="lazy"
            className="absolute inset-0 size-full border-0"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
