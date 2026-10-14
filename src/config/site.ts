// Единое место для контактов и сведений о заведении.
// Всё, что видит посетитель (шапка, первый экран, контакты, подвал, SEO), берётся отсюда.

const coordinates = { lat: 52.727143, lon: 41.448511 };
const yandexOrgId = "1315990496";

export const site = {
  name: "Кулинарная лавка & bistro",
  shortName: "Кулинарная лавка",
  description:
    "Кафе с домашней кухней на Студенецкой, 14 в Тамбове: супы, горячее, гарниры, салаты и выпечка. Можно пообедать на месте или взять еду с собой.",
  // Задайте NEXT_PUBLIC_SITE_URL при сборке, например https://kulinarnaya-lavka.ru
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  phone: {
    display: "+7 (920) 237-25-26",
    href: "tel:+79202372526",
  },

  address: {
    city: "Тамбов",
    street: "ул. Студенецкая, 14",
    details: "первый этаж",
    postalCode: "", // уточнить у владельца
    region: "Тамбовская область",
  },

  coordinates,

  // Источник: карточка организации в Яндекс Картах (проверено 14.10.2026).
  // Пока владелец не подтвердил график, на сайте выводится пометка «уточняйте по телефону»,
  // а в разметку Schema.org часы не попадают. После подтверждения поставьте confirmed: true.
  hours: {
    confirmed: false,
    display: [
      { days: "Пн–Пт", time: "10:00–16:00" },
      { days: "Сб–Вс", time: "выходной" },
    ],
    schemaOrg: ["Mo-Fr 10:00-16:00"],
    // Рабочие дни для полоски недели в «Где нас найти»: 0 = понедельник. Держать в согласии с display.
    openDays: [0, 1, 2, 3, 4],
    timeZone: "Europe/Moscow", // Тамбов живёт по московскому времени
  },

  // Слайды первого экрана; первый также служит превью ссылки в соцсетях. Иллюстративные фото (Unsplash):
  // замените на собственные, когда появятся. steam: true — показывать пар над горячим блюдом.
  heroSlides: [
    {
      src: "https://images.unsplash.com/photo-1648726445011-9fbf3a5ddb90",
      alt: "Тарелка борща со сметаной и зеленью",
      label: "Борщ со сметаной",
      steam: true,
    },
    {
      src: "https://images.unsplash.com/photo-1723511413901-99439b957bbf",
      alt: "Тушёное мясо с подливкой и картофельным пюре",
      label: "Горячее с пюре",
      steam: true,
    },
    {
      src: "https://images.unsplash.com/photo-1746211108786-ca20c8f80ecd",
      alt: "Салат «Цезарь» с сухариками",
      label: "Салат «Цезарь»",
      steam: false,
    },
    {
      src: "https://images.unsplash.com/photo-1702742136812-d6f9de6df0cf",
      alt: "Корзинка с печёными пирожками",
      label: "Печёные пирожки",
      steam: false,
    },
  ],

  // Из карточки в Яндекс Картах; показывается с указанием источника.
  averageCheck: "150–300 ₽",

  // Рейтинг и число отзывов из той же карточки (проверено 14.10.2026). Обновлять вручную.
  yandexStats: { rating: 4.3, ratings: 113, reviews: 52, checkedOn: "14.10.2026" },

  links: {
    yandexOrg: `https://yandex.ru/maps/org/kulinarnaya_lavka_bistro/${yandexOrgId}/`,
    yandexReviews: `https://yandex.ru/maps/org/kulinarnaya_lavka_bistro/${yandexOrgId}/reviews/`,
    yandexPhotos: `https://yandex.ru/maps/org/kulinarnaya_lavka_bistro/${yandexOrgId}/gallery/`,
    // На телефоне откроет приложение Яндекс Карт/Навигатора, если оно установлено.
    route: `https://yandex.ru/maps/?rtext=~${coordinates.lat}%2C${coordinates.lon}&rtt=auto`,
    routeModes: [
      { label: "На машине", href: `https://yandex.ru/maps/?rtext=~${coordinates.lat}%2C${coordinates.lon}&rtt=auto` },
      { label: "Пешком", href: `https://yandex.ru/maps/?rtext=~${coordinates.lat}%2C${coordinates.lon}&rtt=pd` },
      { label: "На транспорте", href: `https://yandex.ru/maps/?rtext=~${coordinates.lat}%2C${coordinates.lon}&rtt=mt` },
    ],
    mapWidget: `https://yandex.ru/map-widget/v1/?ll=${coordinates.lon}%2C${coordinates.lat}&mode=search&oid=${yandexOrgId}&ol=biz&z=16`,
  },

  nav: [
    { href: "#menu", label: "Меню" },
    { href: "#about", label: "Почему к нам" },
    { href: "#gallery", label: "Фото" },
    { href: "#contacts", label: "Контакты" },
  ],

  // Формулировки опираются на карточку в Яндекс Картах (еда и кофе навынос)
  // и отзывы гостей (линия раздачи). Перед запуском сверить с владельцем.
  advantages: [
    {
      title: "Выбираете глазами",
      icon: "eye",
      text: "Блюда стоят на линии раздачи — видно, что берёте, ещё до того, как подошли к кассе.",
    },
    {
      title: "Обед под свой аппетит",
      icon: "plate",
      text: "Суп, горячее, гарнир, салат, выпечка — собираете из того, что хочется сегодня, и не переплачиваете за комплекс.",
    },
    {
      title: "Можно с собой",
      icon: "bag",
      text: "Еду и кофе упакуют навынос — удобно, если обедаете в офисе или торопитесь.",
    },
    {
      title: "Рядом с работой",
      icon: "clock",
      text: "Студенецкая, 14, первый этаж — успеваете поесть и вернуться за обеденный перерыв.",
    },
  ],
} as const;
