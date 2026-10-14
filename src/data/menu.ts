// Меню сайта: категории, блюда, цены и фото — только здесь.
//
// ВНИМАНИЕ: ниже демонстрационные позиции. Названия взяты из блюд, которые гости
// упоминают в отзывах, но цены и описания — пример оформления, а не действующее меню.
// Когда владелец пришлёт реальное меню, замените позиции и поставьте demo: false.
//
// image — ссылка на фото (Unsplash, свободная лицензия) или путь к своему файлу
// в папке public, например "/photos/borsch.jpg". Без image карточка покажет заглушку.

export type MenuCategoryId = "soups" | "hot" | "sides" | "salads" | "bakery" | "drinks";

export type MenuItem = {
  id: string;
  category: MenuCategoryId;
  name: string;
  description: string;
  price: number; // в рублях
  image?: string;
  demo: boolean;
};

export const menuCategories: { id: MenuCategoryId; label: string }[] = [
  { id: "soups", label: "Первые блюда" },
  { id: "hot", label: "Горячие блюда" },
  { id: "sides", label: "Гарниры" },
  { id: "salads", label: "Салаты и закуски" },
  { id: "bakery", label: "Выпечка и десерты" },
  { id: "drinks", label: "Напитки" },
];

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const menuItems: MenuItem[] = [
  {
    id: "borsch",
    category: "soups",
    name: "Борщ со сметаной",
    description: "Густой свекольный суп, подаётся со сметаной и зеленью.",
    price: 140,
    image: unsplash("1648726445011-9fbf3a5ddb90"),
    demo: true,
  },
  {
    id: "mushroom-soup",
    category: "soups",
    name: "Грибной суп-пюре",
    description: "Нежный крем-суп из грибов.",
    price: 150,
    image: unsplash("1659603851579-17755833517e"),
    demo: true,
  },
  {
    id: "vegetable-soup",
    category: "soups",
    name: "Овощной суп",
    description: "Лёгкий прозрачный суп с овощами.",
    price: 110,
    image: unsplash("1612966948332-81d747414a8f"),
    demo: true,
  },
  {
    id: "cutlets",
    category: "hot",
    name: "Котлета домашняя",
    description: "Румяная мясная котлета — хорошо с пюре или гречкой.",
    price: 120,
    image: unsplash("1736170379419-808d2f05b93c"),
    demo: true,
  },
  {
    id: "meatballs",
    category: "hot",
    name: "Тефтели в томатном соусе",
    description: "Мягкие тефтели, тушённые в томатном соусе.",
    price: 140,
    image: unsplash("1787261534727-b9c89aa2bb11"),
    demo: true,
  },
  {
    id: "goulash",
    category: "hot",
    name: "Гуляш с картофельным пюре",
    description: "Тушёное мясо с густой подливкой и пюре.",
    price: 210,
    image: unsplash("1723511413901-99439b957bbf"),
    demo: true,
  },
  {
    id: "baked-chicken",
    category: "hot",
    name: "Курица запечённая",
    description: "Кусочки курицы, запечённые до золотистой корочки.",
    price: 160,
    image: unsplash("1642689690500-f429a042cad1"),
    demo: true,
  },
  {
    id: "schnitzel",
    category: "hot",
    name: "Отбивная в панировке",
    description: "Тонкая отбивная в хрустящей панировке.",
    price: 180,
    image: unsplash("1775889325293-fd23980169bf"),
    demo: true,
  },
  {
    id: "mashed-potatoes",
    category: "sides",
    name: "Картофельное пюре",
    description: "Воздушное пюре, как дома.",
    price: 70,
    image: unsplash("1707616954324-99c89a78a20d"),
    demo: true,
  },
  {
    id: "buckwheat",
    category: "sides",
    name: "Гречка",
    description: "Рассыпчатая гречневая каша.",
    price: 60,
    image: unsplash("1671731478749-047201d3278e"),
    demo: true,
  },
  {
    id: "rice",
    category: "sides",
    name: "Рис с овощами",
    description: "Рис с зелёным горошком и морковью.",
    price: 70,
    image: unsplash("1664717698774-84f62382613b"),
    demo: true,
  },
  {
    id: "caesar",
    category: "salads",
    name: "Салат «Цезарь»",
    description: "Листья салата, сухарики и соус.",
    price: 180,
    image: unsplash("1746211108786-ca20c8f80ecd"),
    demo: true,
  },
  {
    id: "fresh-salad",
    category: "salads",
    name: "Салат из свежих овощей",
    description: "Сезонные овощи и зелень.",
    price: 110,
    image: unsplash("1611171711925-92171c63fc4b"),
    demo: true,
  },
  {
    id: "cabbage-salad",
    category: "salads",
    name: "Салат из свежей капусты",
    description: "Хрустящая капуста с морковью.",
    price: 70,
    image: unsplash("1654458804670-2f4f26ab3154"),
    demo: true,
  },
  {
    id: "pirozhki",
    category: "bakery",
    name: "Пирожки печёные",
    description: "Сдобные пирожки с разными начинками.",
    price: 55,
    image: unsplash("1702742136812-d6f9de6df0cf"),
    demo: true,
  },
  {
    id: "ossetian-pie",
    category: "bakery",
    name: "Осетинский пирог",
    description: "Тонкое тесто и щедрая начинка, порционный кусок.",
    price: 120,
    image: unsplash("1692780941305-b93b13fb87b4"),
    demo: true,
  },
  {
    id: "puff-pastry",
    category: "bakery",
    name: "Слойки",
    description: "Хрустящая слоёная выпечка к чаю или кофе.",
    price: 65,
    image: unsplash("1483695028939-5bb13f8648b0"),
    demo: true,
  },
  {
    id: "pancakes",
    category: "bakery",
    name: "Оладьи с ягодами",
    description: "Пышные оладьи со свежими ягодами.",
    price: 130,
    image: unsplash("1693422662014-cfd9a489e2af"),
    demo: true,
  },
  {
    id: "casserole",
    category: "bakery",
    name: "Творожная запеканка",
    description: "Нежная запеканка — на десерт или на завтрак.",
    price: 110,
    image: unsplash("1733713642547-43599b17c094"),
    demo: true,
  },
  {
    id: "compote",
    category: "drinks",
    name: "Компот",
    description: "Домашний ягодный компот.",
    price: 50,
    image: unsplash("1722239315387-5f12ffdf22c0"),
    demo: true,
  },
  {
    id: "tea",
    category: "drinks",
    name: "Чай чёрный",
    description: "Горячий чай в чашке или с собой.",
    price: 40,
    image: unsplash("1652283824336-dfcee94dd02b"),
    demo: true,
  },
  {
    id: "coffee",
    category: "drinks",
    name: "Кофе с собой",
    description: "Американо или капучино в стакане навынос.",
    price: 120,
    image: unsplash("1647972488473-ca3796499272"),
    demo: true,
  },
];
