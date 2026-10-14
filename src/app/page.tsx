import { Advantages } from "@/components/Advantages";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Location } from "@/components/Location";
import { Menu } from "@/components/Menu";
import { site } from "@/config/site";

// Разметка Schema.org для поиска и карт. Часы попадают сюда только после подтверждения владельцем.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.phone.href.replace("tel:", ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.street}, ${site.address.details}`,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    ...(site.address.postalCode ? { postalCode: site.address.postalCode } : {}),
    addressCountry: "RU",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.coordinates.lat, longitude: site.coordinates.lon },
  hasMap: site.links.yandexOrg,
  sameAs: [site.links.yandexOrg],
  ...(site.hours.confirmed ? { openingHours: site.hours.schemaOrg } : {}),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <a
        href="#menu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-coffee focus:px-5 focus:py-3 focus:text-milk"
      >
        Перейти к меню
      </a>
      <Header />
      <main>
        <Hero />
        <Menu />
        <Advantages />
        <Gallery />
        <Location />
      </main>
      <Footer />
    </>
  );
}
