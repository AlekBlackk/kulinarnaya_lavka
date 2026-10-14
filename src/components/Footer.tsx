import { site } from "@/config/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-coffee text-milk">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-sm leading-relaxed text-milk/70">{site.description}</p>
        </div>

        <nav aria-label="Разделы сайта">
          <p className="text-sm font-semibold uppercase tracking-wider text-milk/50">Разделы</p>
          <ul className="mt-4 space-y-2">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-terracotta-soft">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-milk/50">Контакты</p>
          <address className="mt-4 space-y-2 not-italic">
            <a href={site.phone.href} className="block text-lg font-bold hover:text-terracotta-soft">
              {site.phone.display}
            </a>
            <a href={site.links.yandexOrg} target="_blank" rel="noopener" className="block hover:text-terracotta-soft">
              {site.address.city}, {site.address.street}, {site.address.details}
            </a>
          </address>
        </div>
      </div>

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
