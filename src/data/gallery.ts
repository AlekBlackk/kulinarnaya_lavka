// Фотогалерея. Сейчас здесь иллюстративные фото блюд (Unsplash, свободная лицензия):
// на сайте они подписаны как иллюстрации, а не как съёмка в кафе.
// Когда появятся собственные фото, положите файлы в public/photos и укажите src: "/photos/....jpg",
// а illustrative: false уберёт пометку.

export type GalleryPhoto = {
  src: string;
  alt: string;
  group: "Готовые блюда" | "Супы и горячее" | "Салаты и закуски" | "Выпечка и десерты";
  illustrative: boolean;
  wide?: boolean; // занимает две колонки на широких экранах
};

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const galleryPhotos: GalleryPhoto[] = [
  {
    src: unsplash("1599118732532-f1cdb1ae7389"),
    alt: "Тарелка с горячим: мясо, рыба, стручковая фасоль и овощи",
    group: "Готовые блюда",
    illustrative: true,
    wide: true,
  },
  {
    src: unsplash("1659603851579-17755833517e"),
    alt: "Грибной суп-пюре с жареными грибами и зеленью",
    group: "Супы и горячее",
    illustrative: true,
  },
  {
    src: unsplash("1723511413901-99439b957bbf"),
    alt: "Тушёное мясо с подливкой и картофельным пюре",
    group: "Супы и горячее",
    illustrative: true,
  },
  {
    src: unsplash("1736170379419-808d2f05b93c"),
    alt: "Румяные котлеты на сковороде",
    group: "Супы и горячее",
    illustrative: true,
  },
  {
    src: unsplash("1746211108786-ca20c8f80ecd"),
    alt: "Салат «Цезарь» с сухариками",
    group: "Салаты и закуски",
    illustrative: true,
  },
  {
    src: unsplash("1702742136812-d6f9de6df0cf"),
    alt: "Корзинка с печёными пирожками",
    group: "Выпечка и десерты",
    illustrative: true,
    wide: true,
  },
  {
    src: unsplash("1692780941305-b93b13fb87b4"),
    alt: "Круглый пирог с начинкой на столе",
    group: "Выпечка и десерты",
    illustrative: true,
  },
  {
    src: unsplash("1693422662014-cfd9a489e2af"),
    alt: "Оладьи с клубникой и ягодами",
    group: "Выпечка и десерты",
    illustrative: true,
  },
];
