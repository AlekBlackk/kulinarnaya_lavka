import { site } from "@/config/site";
import { CountUp } from "./CountUp";
import { ExternalIcon } from "./icons";

type IconName = (typeof site.advantages)[number]["icon"];

// Контурные иконки: каждый штрих помечен .draw и «дорисовывается» при прокрутке (см. globals.css).
const icons: Record<IconName, React.ReactNode> = {
  eye: (
    <>
      <path className="draw" pathLength="1" d="M4 24C12 12 36 12 44 24C36 36 12 36 4 24Z" />
      <circle className="draw" pathLength="1" cx="24" cy="24" r="6" />
    </>
  ),
  plate: (
    <>
      <circle className="draw" pathLength="1" cx="24" cy="26" r="17" />
      <circle className="draw" pathLength="1" cx="24" cy="26" r="10" />
      <path className="draw" pathLength="1" d="M18 8c-2-2 2-3 0-6M26 8c-2-2 2-3 0-6" />
    </>
  ),
  bag: (
    <>
      <path className="draw" pathLength="1" d="M10 16H38L40 43H8Z" />
      <path className="draw" pathLength="1" d="M18 16V12a6 6 0 0 1 12 0V16" />
    </>
  ),
  clock: (
    <>
      <circle className="draw" pathLength="1" cx="24" cy="24" r="18" />
      <path className="draw" pathLength="1" d="M24 13V24L31 28" />
    </>
  ),
};

// Смещения и наклоны карточек-«записок»: на широком экране они лежат вразнобой, как бумажки на доске.
const notePose = [
  "rotate-[-2deg] lg:mt-0",
  "rotate-[1.5deg] lg:mt-10",
  "rotate-[-1deg] lg:mt-4",
  "rotate-[2deg] lg:mt-14",
];

const starPath = "M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z";

// Пять звёзд; закрашенная часть обрезается по рейтингу (4,3 из 5 → 86% ширины).
function Stars({ rating }: { rating: number }) {
  const row = (className: string) => (
    <span className={`flex w-max gap-0.5 ${className}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" className="shrink-0">
          <path d={starPath} />
        </svg>
      ))}
    </span>
  );
  return (
    <span className="relative inline-block" role="img" aria-label={`Рейтинг ${rating} из 5`}>
      {row("text-milk/20")}
      <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${(rating / 5) * 100}%` }}>
        {row("text-terracotta-soft")}
      </span>
    </span>
  );
}

const marquee = ["домашняя кухня", "супы", "горячее", "гарниры", "салаты", "выпечка", "еда с собой", "кофе с собой"];

export function Advantages() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-16 overflow-hidden bg-coffee pt-16 text-milk sm:pt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="reveal flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="font-hand text-2xl text-terracotta-soft">почему к нам заходят</p>
          <h2 id="about-title" className="font-display text-4xl font-bold tracking-tight max-sm:leading-[1.5] sm:text-5xl">
            Обед, который{" "}
            <span className="relative inline-block">
              <em className="font-semibold text-terracotta-soft">не нужно</em>
              <svg
                aria-hidden="true"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                className="absolute -bottom-3 left-0 h-2.5 w-full overflow-visible text-milk/70"
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
            </span>{" "}
            планировать
          </h2>
        </div>

        <div className="shrink-0">
          <dl className="grid grid-cols-3 gap-2 text-center sm:gap-3">
            <div className="rounded-2xl border border-milk/10 bg-milk/5 px-3 py-4 sm:px-5">
              <dd className="font-display text-3xl font-bold leading-none text-terracotta-soft sm:text-4xl">
                <CountUp to={site.yandexStats.rating} decimals={1} />
              </dd>
              <div className="mt-2 flex justify-center">
                <Stars rating={site.yandexStats.rating} />
              </div>
              <dt className="mt-1 text-xs text-milk/70">рейтинг</dt>
            </div>
            <div className="rounded-2xl border border-milk/10 bg-milk/5 px-3 py-4 sm:px-5">
              <dd className="font-display text-3xl font-bold leading-none text-terracotta-soft sm:text-4xl">
                <CountUp to={site.yandexStats.ratings} />
              </dd>
              <dt className="mt-3 text-xs text-milk/70">оценок гостей</dt>
            </div>
            <div className="rounded-2xl border border-milk/10 bg-milk/5 px-3 py-4 sm:px-5">
              <dd className="font-display text-3xl font-bold leading-none text-terracotta-soft sm:text-4xl">
                <CountUp to={site.yandexStats.reviews} />
              </dd>
              <dt className="mt-3 text-xs text-milk/70">отзывов</dt>
            </div>
          </dl>
          <a
            href={site.links.yandexReviews}
            target="_blank"
            rel="noopener"
            className="mt-1 inline-flex min-h-11 items-center gap-1.5 text-xs text-milk/60 underline decoration-dotted underline-offset-4 transition-colors hover:text-milk"
          >
            По данным Яндекс Карт на {site.yandexStats.checkedOn} — читать отзывы
            <ExternalIcon width={14} height={14} />
          </a>
        </div>
        </div>

        <ol className="mt-14 grid gap-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4">
          {site.advantages.map((item, index) => (
            <li
              key={item.title}
              style={{ "--i": index } as React.CSSProperties}
              className={`note slap relative rounded-2xl bg-milk p-6 pt-8 text-coffee shadow-[0_18px_30px_-18px_rgb(0_0_0/0.7)] transition-[rotate,translate,box-shadow] duration-300 hover:-translate-y-2 hover:rotate-0 hover:shadow-[0_26px_36px_-18px_rgb(0_0_0/0.8)] ${notePose[index % notePose.length]}`}
            >
              <span aria-hidden="true" className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-3 bg-cream-deep/90 shadow-sm" />
              <div className="flex items-start justify-between">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 48 48"
                  width="56"
                  height="56"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-terracotta"
                >
                  {icons[item.icon]}
                </svg>
                <span aria-hidden="true" className="font-hand text-5xl leading-none text-terracotta-soft">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold leading-snug">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Бегущая лента вдоль низа секции; для скринридеров скрыта — это декор. */}
      <div aria-hidden="true" className="mt-20 border-y border-milk/10 py-4 sm:mt-28">
        <div className="marquee-track flex w-max items-center font-display text-2xl italic text-milk/35 sm:text-3xl">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {marquee.map((word) => (
                <span key={word} className="flex items-center">
                  {word}
                  <span className="mx-6 inline-block size-2 rotate-45 bg-terracotta-soft/70" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
