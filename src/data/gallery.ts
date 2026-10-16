// Фотогалерея. Сейчас здесь иллюстративные фото блюд (Unsplash, свободная лицензия):
// на сайте они подписаны как иллюстрации, а не как съёмка в кафе.
// Когда появятся собственные фото, положите файлы в public/photos и укажите src: "/photos/....jpg",
// а illustrative: false уберёт пометку.

export type GalleryPhoto = {
  src: string;
  alt: string;
  caption: string; // короткая рукописная подпись под фото
  group: "Готовые блюда" | "Супы и горячее" | "Салаты и закуски" | "Выпечка и десерты";
  illustrative: boolean;
};

const photo = (id: string) => `/photos/${id}.jpg`;

export const galleryPhotos: GalleryPhoto[] = [
  {
    src: photo("1599118732532-f1cdb1ae7389"),
    alt: "Тарелка с горячим: мясо, рыба, стручковая фасоль и овощи",
    caption: "Тарелка с горячим",
    group: "Готовые блюда",
    illustrative: true,
  },
  {
    src: photo("1659603851579-17755833517e"),
    alt: "Грибной суп-пюре с жареными грибами и зеленью",
    caption: "Грибной суп-пюре",
    group: "Супы и горячее",
    illustrative: true,
  },
  {
    src: photo("1723511413901-99439b957bbf"),
    alt: "Тушёное мясо с подливкой и картофельным пюре",
    caption: "Мясо с пюре",
    group: "Супы и горячее",
    illustrative: true,
  },
  {
    src: photo("1736170379419-808d2f05b93c"),
    alt: "Румяные котлеты на сковороде",
    caption: "Котлеты",
    group: "Супы и горячее",
    illustrative: true,
  },
  {
    src: photo("1746211108786-ca20c8f80ecd"),
    alt: "Салат «Цезарь» с сухариками",
    caption: "Салат «Цезарь»",
    group: "Салаты и закуски",
    illustrative: true,
  },
  {
    src: photo("1702742136812-d6f9de6df0cf"),
    alt: "Корзинка с печёными пирожками",
    caption: "Печёные пирожки",
    group: "Выпечка и десерты",
    illustrative: true,
  },
  {
    src: photo("1692780941305-b93b13fb87b4"),
    alt: "Круглый пирог с начинкой на столе",
    caption: "Пирог с начинкой",
    group: "Выпечка и десерты",
    illustrative: true,
  },
  {
    src: photo("1693422662014-cfd9a489e2af"),
    alt: "Оладьи с клубникой и ягодами",
    caption: "Оладьи с ягодами",
    group: "Выпечка и десерты",
    illustrative: true,
  },
];
