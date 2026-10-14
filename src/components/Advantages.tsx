import { site } from "@/config/site";

export function Advantages() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-16 bg-coffee py-16 text-milk sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="reveal max-w-2xl">
          <p className="font-hand text-2xl text-terracotta-soft">почему к нам заходят</p>
          <h2 id="about-title" className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Обед, который не нужно планировать
          </h2>
        </div>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-milk/10 sm:grid-cols-2 lg:grid-cols-4">
          {site.advantages.map((item, index) => (
            <li key={item.title} className="reveal bg-coffee p-6 transition-colors hover:bg-coffee-soft sm:p-8">
              <span className="font-display text-5xl font-bold italic text-terracotta-soft/80">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-milk/75">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
